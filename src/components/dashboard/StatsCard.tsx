import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  valueColor?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export function StatsCard({ title, value, valueColor = 'text-gray-900', icon: Icon, trend }: StatsCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white p-6 shadow transition-all hover:shadow-lg">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gray-50 opacity-20"></div>
      <div className="relative">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
          <Icon className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-600">{title}</h3>
        <div className="mt-2 flex items-baseline">
          <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
          {trend && (
            <span className={`ml-2 text-sm ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '+' : '-'}{trend.value}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}