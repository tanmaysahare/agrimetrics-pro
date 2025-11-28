import React from 'react';
import { Card, CardContent } from './Card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { clsx } from 'clsx';

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
    // Generate mock sparkline data based on trend
    const data = Array.from({ length: 20 }, (_, i) => ({
        value: Math.random() * 40 + 30 + (trend?.isPositive ? i : -i)
    }));

    const colorStyles = {
        emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', stroke: '#34d399' },
        blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', stroke: '#60a5fa' },
        amber: { text: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', stroke: '#fbbf24' },
        rose: { text: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/20', stroke: '#fb7185' },
    };

    const styles = colorStyles[color];

    return (
        <Card hoverEffect className="group relative overflow-hidden">
            <CardContent className="p-6 relative z-10">
                <div className="flex justify-between items-start mb-2">
                    <div className={clsx("p-2.5 rounded-xl border transition-colors", styles.bg, styles.border, styles.text)}>
                        {icon}
                    </div>
                    {trend && (
                        <div className={clsx(
                            "flex items-center space-x-1 text-xs font-bold px-2.5 py-1 rounded-full border",
                            trend.isPositive
                                ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                                : "text-rose-400 bg-rose-500/10 border-rose-500/20"
                        )}>
                            {trend.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            <span>{Math.abs(trend.value)}%</span>
                        </div>
                    )}
                </div>

                <div className="mt-4">
                    <p className="text-sm font-medium text-slate-400 mb-1 tracking-wide uppercase">{title}</p>
                    <div className="flex items-baseline space-x-1">
                        <h2 className="text-5xl font-bold text-slate-100 tracking-tight">
                            {value}
                        </h2>
                        {unit && <span className="text-lg text-slate-500 font-medium mb-1">{unit}</span>}
                    </div>
                </div>
            </CardContent>

            {/* Sparkline Chart Background */}
            <div className="absolute bottom-0 left-0 right-0 h-24 opacity-20 group-hover:opacity-30 transition-opacity pointer-events-none">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={styles.stroke} stopOpacity={0.5} />
                                <stop offset="100%" stopColor={styles.stroke} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={styles.stroke}
                            strokeWidth={2}
                            fill={`url(#gradient-${color})`}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};
