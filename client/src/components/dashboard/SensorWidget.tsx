import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Thermometer, Activity, Wind } from 'lucide-react';
import clsx from 'clsx';

interface SensorWidgetProps {
    type: 'moisture' | 'ph' | 'temp' | 'humidity';
    value: number;
    unit: string;
    trend?: number;
}

const icons = {
    moisture: Droplets,
    ph: Activity,
    temp: Thermometer,
    humidity: Wind,
};

const colors = {
    moisture: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    ph: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    temp: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
    humidity: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
};

export const SensorWidget: React.FC<SensorWidgetProps> = ({ type, value, unit, trend }) => {
    const Icon = icons[type];
    const colorClass = colors[type];

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className={clsx(
                "relative overflow-hidden rounded-xl p-6 border backdrop-blur-sm transition-colors",
                "bg-slate-900/50 border-slate-800 hover:border-slate-700"
            )}
        >
            <div className="flex justify-between items-start">
                <div className={clsx("p-3 rounded-lg border", colorClass)}>
                    <Icon size={24} />
                </div>
                {trend && (
                    <span className={clsx("text-sm font-medium", trend > 0 ? "text-emerald-400" : "text-red-400")}>
                        {trend > 0 ? '+' : ''}{trend}%
                    </span>
                )}
            </div>

            <div className="mt-4">
                <h3 className="text-slate-400 text-sm font-medium capitalize">{type} Level</h3>
                <div className="flex items-baseline space-x-1 mt-1">
                    <span className="text-3xl font-bold text-slate-100">{value}</span>
                    <span className="text-slate-500 font-medium">{unit}</span>
                </div>
            </div>

            {/* Decorative background glow */}
            <div className={clsx("absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-3xl opacity-20",
                type === 'moisture' ? 'bg-blue-500' :
                    type === 'ph' ? 'bg-purple-500' :
                        type === 'temp' ? 'bg-orange-500' : 'bg-cyan-500'
            )} />
        </motion.div>
    );
};
