import React from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '../../lib/utils';
import { getTacticByName, getTechniquesByTactic } from '../../data/mitre-atlas';

interface MitreBadgeProps {
  tactic: string;
  className?: string;
  showLink?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const MitreBadge: React.FC<MitreBadgeProps> = ({ 
  tactic, 
  className = '', 
  showLink = true,
  size = 'md',
}) => {
  const tacticData = getTacticByName(tactic);
  
  if (!tacticData) {
    return (
      <span className={cn(
        'inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700',
        className
      )}>
        {tactic}
      </span>
    );
  }

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  const getTacticColor = (tacticName: string): string => {
    const colors: Record<string, string> = {
      'Reconnaissance': 'bg-blue-100 text-blue-800 border-blue-300',
      'Resource Development': 'bg-cyan-100 text-cyan-800 border-cyan-300',
      'Initial Access': 'bg-green-100 text-green-800 border-green-300',
      'ML Model Access': 'bg-teal-100 text-teal-800 border-teal-300',
      'Execution': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'Persistence': 'bg-orange-100 text-orange-800 border-orange-300',
      'Defense Evasion': 'bg-red-100 text-red-800 border-red-300',
      'Discovery': 'bg-purple-100 text-purple-800 border-purple-300',
      'Collection': 'bg-pink-100 text-pink-800 border-pink-300',
      'ML Attack Staging': 'bg-indigo-100 text-indigo-800 border-indigo-300',
      'Exfiltration': 'bg-rose-100 text-rose-800 border-rose-300',
      'Impact': 'bg-red-200 text-red-900 border-red-400',
    };
    return colors[tacticName] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const handleClick = (e: React.MouseEvent) => {
    if (showLink) {
      e.stopPropagation();
      // Open MITRE ATLAS documentation
      window.open(`https://atlas.mitre.org/tactics/${tacticData.id}`, '_blank');
    }
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-md font-semibold border',
        getTacticColor(tacticData.name),
        sizeClasses[size],
        showLink && 'cursor-pointer hover:opacity-80 transition-opacity',
        className
      )}
      onClick={handleClick}
      title={tacticData.description}
    >
      <span>{tacticData.name}</span>
      {showLink && <ExternalLink size={12} />}
    </span>
  );
};
