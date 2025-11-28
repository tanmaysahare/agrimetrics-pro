import React from 'react';
import type { SensorData } from '../../types';
import clsx from 'clsx';
import { motion } from 'framer-motion';

interface HeatmapProps {
    sensors: SensorData[];
}

export const Heatmap: React.FC<HeatmapProps> = ({ sensors }) => {
    // Group sensors by sector (mock logic: assuming 50 sensors, 5 sectors of 10)
    // Or just display a grid of 50 cells

    const getStatusColor = (sensor: SensorData) => {
        if (sensor.status === 'offline') return 'bg-slate-700';
        if (sensor.type === 'moisture') {
            if (sensor.value < 30) return 'bg-red-500';
            if (sensor.value < 50) return 'bg-yellow-500';
            return 'bg-emerald-500';
        }
        return 'bg-slate-600'; // Default
    };

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-slate-100">Field Health Map</h3>
                <div className="flex space-x-4 text-xs text-slate-400">
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2" /> Optimal</div>
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-yellow-500 mr-2" /> Warning</div>
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-red-500 mr-2" /> Critical</div>
                </div>
            </div>

            <div className="grid grid-cols-10 gap-2">
                {sensors.slice(0, 50).map((sensor, idx) => (
                    <motion.div
                        key={sensor.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.01 }}
                        className="relative group cursor-pointer"
                    >
                        <div
                            className={clsx(
                                "w-full pt-[100%] rounded-md transition-colors duration-500",
                                getStatusColor(sensor)
                            )}
                        />
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10 border border-slate-700">
                            {sensor.id}: {sensor.value}{sensor.unit}
                        </div>
                    </motion.div>
                ))}
                {/* Fillers if less than 50 */}
                {Array.from({ length: Math.max(0, 50 - sensors.length) }).map((_, i) => (
                    <div key={`empty-${i}`} className="w-full pt-[100%] rounded-md bg-slate-800/50" />
                ))}
            </div>
        </div>
    );
};
