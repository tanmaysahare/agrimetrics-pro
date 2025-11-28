import React from 'react';
import { Card, CardContent } from './Card';
import { ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    unit?: string;
    icon: React.ReactNode;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color?: 'emerald' | 'blue' | 'amber' | 'rose';
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, unit, icon, trend, color = 'emerald' }) => {
    const colorStyles = {
        emerald: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        blue: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
        amber: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
        rose: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    };

    return (
        <Card hoverEffect className="group">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-lg border ${colorStyles[color]} transition-colors`}>
                        {icon}
                    </div>
                    {trend && (
                        <div className={`flex items-center space-x-1 text-xs font-medium px-2 py-1 rounded-full ${trend.isPositive ? 'text-emerald-400 bg-emerald-500/10' : 'text-rose-400 bg-rose-500/10'
                            }`}>
                            {trend.isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                            <span>{Math.abs(trend.value)}%</span>
                        </div>
                    )}
                </div>

                <div>
                    <p className="text-sm font-medium text-slate-400 mb-1">{title}</p>
                    <div className="flex items-baseline space-x-2">
                        <h2 className="text-3xl font-bold text-slate-100 tracking-tight">
                            {value}
                        </h2>
                        {unit && <span className="text-sm text-slate-500 font-medium">{unit}</span>}
                    </div>
                </div>

                {/* Decorative Sparkline Background */}
                <div className="absolute bottom-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Activity size={100} strokeWidth={1} />
                </div>
            </CardContent>
        </Card>
    );
};
