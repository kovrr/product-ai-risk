import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

/**
 * DotMatrixChart - Risk-Control Coverage Matrix
 * Matches hero-dashboard-final.html visualization
 */
const DotMatrixChart = ({ data }) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });

  useEffect(() => {
    if (!data || !svgRef.current) return;

    const { risks, controls, coverage } = data;
    
    const width = 550;
    const height = 370;
    const margin = { top: 20, right: 80, bottom: 20, left: 100 };
    const gridWidth = width - margin.left - margin.right;
    const gridHeight = height - margin.top - margin.bottom;
    const cellWidth = gridWidth / controls.length;
    const cellHeight = gridHeight / risks.length;
    const dotRadius = Math.min(cellWidth, cellHeight) * 0.35;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('width', '100%')
      .attr('height', '100%')
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Control labels (rotated)
    svg.selectAll('.control-label')
      .data(controls)
      .join('text')
      .attr('class', 'text-[10px] font-[600] fill-[rgb(74,85,104)]')
      .attr('x', (d, i) => i * cellWidth + cellWidth / 2)
      .attr('y', -5)
      .attr('text-anchor', 'end')
      .attr('transform', (d, i) => `rotate(-45, ${i * cellWidth + cellWidth / 2}, -5)`)
      .text(d => d.id);

    // Risk labels
    svg.selectAll('.risk-label')
      .data(risks)
      .join('text')
      .attr('class', 'text-[10px] font-[600] fill-[rgb(74,85,104)] text-end')
      .attr('x', -10)
      .attr('y', (d, i) => i * cellHeight + cellHeight / 2 + 4)
      .text(d => d.id);

    // Dots
    risks.forEach((risk, i) => {
      controls.forEach((control, j) => {
        const hasCoverage = coverage[risk.id] && coverage[risk.id].includes(control.id);
        let fillColor, strokeColor;

        if (!hasCoverage) {
          fillColor = 'rgb(237, 242, 247)';
          strokeColor = 'rgb(220, 229, 242)';
        } else if (control.gap === 0) {
          fillColor = 'rgb(160, 190, 170)';
          strokeColor = 'rgb(140, 170, 150)';
        } else if (control.gap >= 2.5) {
          fillColor = 'rgba(255, 35, 35, 0.6)';
          strokeColor = 'rgb(255, 35, 35)';
        } else {
          fillColor = 'rgba(255, 153, 0, 0.6)';
          strokeColor = 'rgb(255, 153, 0)';
        }

        const circle = svg.append('circle')
          .attr('cx', j * cellWidth + cellWidth / 2)
          .attr('cy', i * cellHeight + cellHeight / 2)
          .attr('r', hasCoverage ? dotRadius : dotRadius * 0.5)
          .attr('fill', fillColor)
          .attr('stroke', strokeColor)
          .attr('stroke-width', hasCoverage ? 2 : 1)
          .attr('class', 'cursor-pointer transition-all duration-200')
          .on('mouseover', function(event) {
            d3.select(this)
              .transition()
              .duration(200)
              .attr('r', hasCoverage ? dotRadius * 1.3 : dotRadius * 0.7);

            let content = '';
            if (hasCoverage) {
              let status = 'At Target';
              if (control.gap >= 2.5) status = 'Critical Gap';
              else if (control.gap > 0) status = 'Has Gap';
              content = `<strong>${risk.id}</strong> → <strong>${control.id}</strong><br/>${risk.name}<br/>Status: ${status}<br/>Gap: ${control.gap}`;
            } else {
              content = `<strong>${risk.id}</strong> → <strong>${control.id}</strong><br/>No Coverage`;
            }

            setTooltip({
              visible: true,
              content,
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
            d3.select(this)
              .transition()
              .duration(200)
              .attr('r', hasCoverage ? dotRadius : dotRadius * 0.5);

            setTooltip({ visible: false, content: '', x: 0, y: 0 });
          });
      });
    });
  }, [data]);

  return (
    <div className="relative w-full h-[400px]">
      <div className="w-full h-full flex flex-col">
        <svg ref={svgRef} className="flex-1" />
        
        {/* Legend */}
        <div className="flex gap-[16px] p-[12px] bg-[rgb(245,247,255)] rounded-[8px] mt-[12px] flex-wrap justify-center">
          <div className="flex items-center gap-[6px] text-[11px]">
            <div className="w-[14px] h-[14px] rounded-full border-2 border-[rgb(163,173,181)] bg-[rgb(160,190,170)]" />
            <span>At Target (Gap 0)</span>
          </div>
          <div className="flex items-center gap-[6px] text-[11px]">
            <div className="w-[14px] h-[14px] rounded-full border-2 border-[rgb(163,173,181)] bg-[rgba(255,153,0,0.6)]" />
            <span>Has Gap (1-2)</span>
          </div>
          <div className="flex items-center gap-[6px] text-[11px]">
            <div className="w-[14px] h-[14px] rounded-full border-2 border-[rgb(163,173,181)] bg-[rgba(255,35,35,0.6)]" />
            <span>Critical Gap (2.5+)</span>
          </div>
          <div className="flex items-center gap-[6px] text-[11px]">
            <div className="w-[14px] h-[14px] rounded-full border-2 border-[rgb(163,173,181)] bg-[rgb(237,242,247)]" />
            <span>No Coverage</span>
          </div>
        </div>
      </div>

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

export default DotMatrixChart;
