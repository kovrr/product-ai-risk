import React from 'react';
import { cn } from '../../lib/utils';
import type { RiskCategory } from '../../data/mock-risks';

interface CategoryBadgeProps {
  category: RiskCategory;
  className?: string;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, className }) => {
  const getCategoryStyles = (cat: RiskCategory) => {
    const styles: Record<RiskCategory, string> = {
      'Privacy Risk': 'bg-purple-100 text-purple-700 border-purple-200',
      'Security Risk': 'bg-red-100 text-red-700 border-red-200',
      'Bias/Fairness Risk': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Safety Risk': 'bg-orange-100 text-orange-700 border-orange-200',
      'Legal/Compliance Risk': 'bg-blue-100 text-blue-700 border-blue-200',
    };
    return styles[cat];
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-[8px] py-[4px] rounded-[6px]',
        'text-[12px] font-[600] border',
        getCategoryStyles(category),
        className
      )}
    >
      {category}
    </span>
  );
};
