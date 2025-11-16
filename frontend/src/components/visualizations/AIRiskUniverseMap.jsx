import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip, ResponsiveContainer, Cell, ReferenceLine, Label } from 'recharts';

/**
 * AI Risk Universe Map - Interactive bubble chart showing AI portfolio
 * X-axis: Control Maturity (0-100)
 * Y-axis: Risk Impact (0-100)
 * Size: Business Impact
 * Color: Risk Level
 */
const AIRiskUniverseMap = ({ data }) => {
  const navigate = useNavigate();
  const [hoveredAsset, setHoveredAsset] = useState(null);

  // Color mapping based on risk tier
  // Uses design-system colors: error (Red-500), warning (Orange-300/Yellow), success (Green-2-500)
  const getColor = (tier) => {
    const colors = {
      critical: '#EB491F', // Red-500
      high: '#FF9900',     // Orange-300
      medium: '#FBBC09',   // Orange-200 / Yellow
      low: '#0DC783',      // Green-2-500 (success)
    };
    return colors[tier] || colors.medium;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const asset = payload[0].payload;
      return (
        <div className="bg-white p-[16px] rounded-[12px] shadow-lg border border-[rgb(220,229,242)] min-w-[250px]">
          <div className="font-[600] text-[14px] text-[rgb(26,32,44)] mb-[8px]">
            {asset.name}
          </div>
          <div className="space-y-[6px] text-[12px]">
            <div className="flex justify-between">
              <span className="text-[rgb(74,85,104)]">Risk Score:</span>
              <span className="font-[600] text-[rgb(26,32,44)]">{asset.riskScore}/100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[rgb(74,85,104)]">Control Maturity:</span>
              <span className="font-[600] text-[rgb(26,32,44)]">{asset.controlMaturity}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[rgb(74,85,104)]">Business Impact:</span>
              <span className="font-[600] text-[rgb(26,32,44)]">{asset.businessImpact}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[rgb(74,85,104)]">Status:</span>
              <span className={`inline-flex items-center gap-[4px] px-[6px] py-[2px] rounded-[4px] text-[11px] font-[600] ${asset.tier === 'critical' ? 'bg-[rgba(235,73,31,0.1)] text-[rgb(235,73,31)]' :
                  asset.tier === 'high' ? 'bg-[rgba(255,153,0,0.1)] text-[rgb(255,153,0)]' :
                    asset.tier === 'medium' ? 'bg-[rgba(251,188,9,0.1)] text-[rgb(159,60,0)]' :
                      'bg-[rgba(13,199,131,0.1)] text-[rgb(13,199,131)]'
                }`}>
                {asset.tier.toUpperCase()}
              </span>
            </div>
          </div>
          <div className="mt-[12px] pt-[8px] border-t border-[rgb(220,229,242)] text-[11px] text-[rgb(85,81,247)]">
            Click to view details →
          </div>
        </div>
      );
    }
    return null;
  };

  // Custom dot with gradient and animation
  const CustomDot = (props) => {
    const { cx, cy, payload } = props;
    const color = getColor(payload.tier);
    const isHovered = hoveredAsset?.id === payload.id;
    const scale = isHovered ? 1.2 : 1;

    return (
      <g>
        <defs>
          <radialGradient id={`gradient-${payload.id}`}>
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.7" />
          </radialGradient>
        </defs>
        <circle
          cx={cx}
          cy={cy}
          r={payload.size * scale}
          fill={`url(#gradient-${payload.id})`}
          stroke="white"
          strokeWidth="2"
          style={{
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            filter: isHovered ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
          }}
          onClick={() => navigate(`/assets/${payload.id}`)}
          onMouseEnter={() => setHoveredAsset(payload)}
          onMouseLeave={() => setHoveredAsset(null)}
        />
      </g>
    );
  };

  return (
    <div className="relative w-full h-full">
      {/* Quadrant Labels */}
      <div className="absolute top-[40px] left-[80px] text-[11px] font-[600] text-[rgb(255,35,35)] opacity-40 pointer-events-none z-10">
        🚨 High Risk, Low Control
      </div>
      <div className="absolute top-[40px] right-[40px] text-[11px] font-[600] text-[rgb(255,153,0)] opacity-40 pointer-events-none z-10">
        ⚠️ High Risk, High Control
      </div>
      <div className="absolute bottom-[60px] left-[80px] text-[11px] font-[600] text-[rgb(74,85,104)] opacity-40 pointer-events-none z-10">
        🔄 Low Risk, Low Control
      </div>
      <div className="absolute bottom-[60px] right-[40px] text-[11px] font-[600] text-text-information-success opacity-40 pointer-events-none z-10">
        ✅ Low Risk, High Control
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <XAxis
            type="number"
            dataKey="controlMaturity"
            name="Control Maturity"
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tick={{ fill: 'rgb(74,85,104)', fontSize: 10 }}
            stroke="rgb(220,229,242)"
          >
            <Label
              value="Control Maturity →"
              position="insideBottom"
              offset={-10}
              style={{ fill: 'rgb(74,85,104)', fontSize: 11, fontWeight: 600 }}
            />
          </XAxis>
          <YAxis
            type="number"
            dataKey="riskScore"
            name="Risk Impact"
            domain={[0, 100]}
            ticks={[0, 25, 50, 75, 100]}
            tick={{ fill: 'rgb(74,85,104)', fontSize: 10 }}
            stroke="rgb(220,229,242)"
          >
            <Label
              value="Risk Impact ↑"
              angle={-90}
              position="insideLeft"
              style={{ fill: 'rgb(74,85,104)', fontSize: 11, fontWeight: 600 }}
            />
          </YAxis>
          <ZAxis type="number" dataKey="size" range={[200, 2000]} />

          {/* Quadrant dividers */}
          <ReferenceLine x={50} stroke="rgb(220,229,242)" strokeDasharray="3 3" strokeWidth={1} />
          <ReferenceLine y={50} stroke="rgb(220,229,242)" strokeDasharray="3 3" strokeWidth={1} />

          <Tooltip content={<CustomTooltip />} cursor={false} />

          <Scatter
            data={data}
            shape={<CustomDot />}
            animationBegin={0}
            animationDuration={800}
            animationEasing="ease-out"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AIRiskUniverseMap;
