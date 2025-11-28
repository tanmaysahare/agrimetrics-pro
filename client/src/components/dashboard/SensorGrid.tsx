import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { motion } from 'framer-motion';
import type { SensorData } from '../../types';
import { clsx } from 'clsx';

interface SensorGridProps {
    sensors: SensorData[];
}

export const SensorGrid: React.FC<SensorGridProps> = ({ sensors }) => {
    // Simulate a 5x10 grid layout for the field
    const gridSensors = sensors.slice(0, 50);

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Field Sector Analysis</CardTitle>
                <div className="flex space-x-4 text-xs">
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 mr-2" /> Optimal</div>
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-amber-500 mr-2" /> Warning</div>
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-rose-500 mr-2" /> Critical</div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-10 gap-2">
                    {gridSensors.map((sensor, idx) => {
                        const isCritical = sensor.status === 'offline' || (sensor.type === 'moisture' && sensor.value < 30);
                        const isWarning = !isCritical && sensor.type === 'moisture' && sensor.value < 45;

                        return (
                            <motion.div
                                key={sensor.id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.01 }}
                                className="group relative aspect-square"
                            >
                                <div className={clsx(
                                    "w-full h-full rounded-md transition-all duration-300 cursor-pointer",
                                    isCritical ? "bg-rose-500/20 border border-rose-500/50 animate-pulse" :
                                        isWarning ? "bg-amber-500/20 border border-amber-500/50" :
                                            "bg-emerald-500/20 border border-emerald-500/50 hover:bg-emerald-500/40"
                                )} />

                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 rounded-lg bg-slate-900 border border-slate-700 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                                    <p className="text-xs font-bold text-slate-200 mb-1">Sector {idx + 1} ({sensor.id})</p>
                                    <div className="space-y-1 text-xs text-slate-400">
                                        <div className="flex justify-between">
                                            <span>Type:</span>
                                            <span className="capitalize text-slate-300">{sensor.type}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Value:</span>
                                            <span className={clsx(
                                                "font-mono",
                                                isCritical ? "text-rose-400" : isWarning ? "text-amber-400" : "text-emerald-400"
                                            )}>
                                                {sensor.value} {sensor.unit}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Status:</span>
                                            <span className="capitalize">{sensor.status}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
};
