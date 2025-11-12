import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';

/**
 * SankeyDiagram - Asset Risk Flow
 * Shows how assets contribute to risk scenarios
 */
const SankeyDiagram = ({ data }) => {
  const svgRef = useRef(null);
  const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const width = 550;
    const height = 400;
    const margin = { top: 10, right: 10, bottom: 10, left: 10 };

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%');

    const sankeyGenerator = sankey()
      .nodeWidth(15)
      .nodePadding(10)
      .extent([[margin.left, margin.top], [width - margin.right, height - margin.bottom]]);

    const { nodes, links } = sankeyGenerator({
      nodes: data.nodes.map(d => ({ ...d })),
      links: data.links.map(d => ({ ...d }))
    });

    const statusColor = (status) => {
      if (status === 'Sanctioned') return 'rgb(160, 190, 170)';
      if (status === 'Shadow IT') return 'rgb(220, 180, 150)';
      return 'rgb(190, 195, 200)';
    };

    const priorityColor = (priority) => {
      if (priority === 'Critical') return 'rgb(210, 140, 140)';
      if (priority === 'High') return 'rgb(220, 180, 150)';
      return 'rgb(170, 180, 190)';
    };

    // Links
    svg.append('g')
      .selectAll('path')
      .data(links)
      .join('path')
      .attr('d', sankeyLinkHorizontal())
      .attr('stroke', d => {
        const sourceNode = nodes[d.source.index];
        return sourceNode.status ? statusColor(sourceNode.status) : 'rgb(190, 195, 200)';
      })
      .attr('stroke-width', d => Math.max(1, d.width))
      .attr('stroke-opacity', 0.3)
      .attr('fill', 'none')
      .attr('class', 'cursor-pointer transition-all duration-200')
      .on('mouseover', function(event, d) {
        d3.select(this).attr('stroke-opacity', 0.55);
        setTooltip({
          visible: true,
          content: `<strong>${d.source.name}</strong> → <strong>${d.target.name}</strong><br/>Flow Value: ${d.value}`,
          x: event.clientX + 15,
          y: event.clientY + 15
        });
      })
      .on('mousemove', function(event) {
        setTooltip(prev => ({
          ...prev,
          x: event.clientX + 15,
          y: event.clientY + 15
        }));
      })
      .on('mouseout', function() {
        d3.select(this).attr('stroke-opacity', 0.3);
        setTooltip({ visible: false, content: '', x: 0, y: 0 });
      });

    // Nodes
    const node = svg.append('g').selectAll('g').data(nodes).join('g');

    node.append('rect')
      .attr('x', d => d.x0)
      .attr('y', d => d.y0)
      .attr('height', d => d.y1 - d.y0)
      .attr('width', d => d.x1 - d.x0)
      .attr('fill', d => {
        if (d.status) return statusColor(d.status);
        if (d.layer === 1) return 'rgb(150, 160, 180)';
        if (d.priority) return priorityColor(d.priority);
        return 'rgb(190, 195, 200)';
      })
      .attr('class', 'cursor-pointer')
      .attr('fill-opacity', 0.9)
      .attr('stroke', 'white')
      .attr('stroke-width', 1);

    node.append('text')
      .attr('x', d => d.x0 < width / 2 ? d.x1 + 6 : d.x0 - 6)
      .attr('y', d => (d.y1 + d.y0) / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', d => d.x0 < width / 2 ? 'start' : 'end')
      .text(d => d.name)
      .attr('class', 'text-[10px] font-[600] fill-[rgb(74,85,104)] pointer-events-none');

  }, [data]);

  return (
    <div className="relative w-full h-full">
      <svg ref={svgRef} />
      
      {/* Tooltip */}
      {tooltip.visible && (
        <div
          className="fixed bg-[rgb(26,32,44)] text-white p-[10px_14px] rounded-[6px] text-[12px] pointer-events-none z-[10000] shadow-[rgba(0,0,0,0.1)_0px_4px_20px_0px] max-w-[320px] leading-[1.5]"
          style={{ left: tooltip.x, top: tooltip.y }}
          dangerouslySetInnerHTML={{ __html: tooltip.content }}
        />
      )}
    </div>
  );
};

export default SankeyDiagram;
