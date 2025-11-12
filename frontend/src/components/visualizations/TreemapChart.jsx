import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

/**
 * TreemapChart - GenAI Module Exposure
 * AAL breakdown by AI model/asset
 */
const TreemapChart = ({ data }) => {
  const svgRef = useRef(null);
  const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const width = 550;
    const height = 400;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%');

    // Create hierarchy
    const root = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);

    // Create treemap layout
    d3.treemap()
      .size([width, height])
      .padding(2)
      .round(true)(root);

    // Color scale based on status
    const statusColor = (status) => {
      if (status === 'Sanctioned') return 'rgb(160, 190, 170)';
      if (status === 'Shadow IT') return 'rgb(220, 180, 150)';
      return 'rgb(170, 180, 190)';
    };

    // Create cells
    const cell = svg.selectAll('g')
      .data(root.leaves())
      .join('g')
      .attr('transform', d => `translate(${d.x0},${d.y0})`);

    cell.append('rect')
      .attr('width', d => d.x1 - d.x0)
      .attr('height', d => d.y1 - d.y0)
      .attr('fill', d => statusColor(d.data.status))
      .attr('fill-opacity', 0.8)
      .attr('stroke', 'white')
      .attr('stroke-width', 2)
      .attr('class', 'cursor-pointer transition-opacity duration-200')
      .on('mouseover', function(event, d) {
        d3.select(this).attr('fill-opacity', 0.65);
        setTooltip({
          visible: true,
          content: `
            <strong>${d.data.fullName}</strong><br/>
            AAL: $${d.data.aal}M (${d.data.percentage}%)<br/>
            Status: ${d.data.status}<br/>
            Risk Score: ${d.data.riskScore}/100<br/>
            Coverage: ${d.data.coverage}
          `,
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
        d3.select(this).attr('fill-opacity', 0.8);
        setTooltip({ visible: false, content: '', x: 0, y: 0 });
      });

    // Add text labels
    cell.append('text')
      .attr('x', 4)
      .attr('y', 16)
      .attr('class', 'text-[11px] font-[600] fill-[rgb(26,32,44)] pointer-events-none')
      .text(d => d.data.name);

    cell.append('text')
      .attr('x', 4)
      .attr('y', 30)
      .attr('class', 'text-[10px] font-[400] fill-[rgb(74,85,104)] pointer-events-none')
      .text(d => `$${d.data.aal}M`);

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

export default TreemapChart;
