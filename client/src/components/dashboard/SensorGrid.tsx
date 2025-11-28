import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { motion } from 'framer-motion';
import type { SensorData } from '../../types';
import { clsx } from 'clsx';

interface SensorGridProps {
    sensors: SensorData[];
}

export const SensorGrid: React.FC<SensorGridProps> = ({ sensors }) => {
    // Ensure we have exactly 50 slots for the 5x10 grid
    const gridSlots = Array.from({ length: 50 }, (_, i) => sensors[i] || null);

    return (
        <Card className="h-full flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle>Field Sector Analysis</CardTitle>
                    <p className="text-xs text-slate-400 mt-1">Real-time sensor heatmap (50 Sectors)</p>
                </div>
                <div className="flex space-x-3 text-[10px] font-medium uppercase tracking-wider">
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] mr-2" /> Optimal</div>
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)] mr-2" /> Warning</div>
                    <div className="flex items-center"><span className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)] mr-2" /> Critical</div>
                </div>
            </CardHeader>
            <CardContent className="flex-1 min-h-[300px]">
                <div className="grid grid-cols-10 gap-1.5 h-full">
                    {gridSlots.map((sensor, idx) => {
                        if (!sensor) return <div key={idx} className="bg-slate-800/30 rounded-sm" />;

                        const isCritical = sensor.status === 'offline' || (sensor.type === 'moisture' && parseFloat(sensor.value.toString()) < 30);
                        const isWarning = !isCritical && sensor.type === 'moisture' && parseFloat(sensor.value.toString()) < 45;

                        return (
                            <motion.div
                                key={sensor.id}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.005, type: "spring", stiffness: 260, damping: 20 }}
                                className="group relative w-full h-full min-h-[24px]"
                            >
                                <div className={clsx(
                                    "w-full h-full rounded-md transition-all duration-500 cursor-pointer border",
                                    isCritical
                                        ? "bg-rose-500/20 border-rose-500/50 animate-pulse-glow shadow-[0_0_10px_rgba(244,63,94,0.3)]"
                                        : isWarning
                                            ? "bg-amber-500/20 border-amber-500/50 hover:bg-amber-500/40"
                                            : "bg-emerald-500/20 border-emerald-500/30 hover:bg-emerald-500/40 hover:shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                                )} />

                                {/* Enterprise Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-0 rounded-xl bg-slate-900/95 border border-slate-700 shadow-2xl backdrop-blur-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-50 translate-y-2 group-hover:translate-y-0">
                                    <div className={clsx("h-1 w-full rounded-t-xl", isCritical ? "bg-rose-500" : isWarning ? "bg-amber-500" : "bg-emerald-500")} />
                                    <div className="p-3">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-xs font-bold text-slate-100">Sector {idx + 1}</span>
                                            <span className={clsx("text-[10px] px-1.5 py-0.5 rounded border uppercase font-bold",
                                                isCritical ? "text-rose-400 border-rose-500/30 bg-rose-500/10" :
                                                    isWarning ? "text-amber-400 border-amber-500/30 bg-amber-500/10" :
                                                        "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                                            )}>{sensor.status}</span>
                                        </div>
                                        <div className="space-y-1.5">
                                            <div className="flex justify-between text-xs">
                                                <span className="text-slate-500">ID</span>
                                                <span className="font-mono text-slate-300">{sensor.id}</span>
                                            </div>
                                            <div className="flex justify-between text-xs">
                                                <span className="text-slate-500">Type</span>
                                                <span className="capitalize text-slate-300">{sensor.type}</span>
                                            </div>
                                            <div className="flex justify-between text-xs">
                                                <span className="text-slate-500">Reading</span>
                                                <span className={clsx("font-mono font-bold",
                                                    isCritical ? "text-rose-400" : isWarning ? "text-amber-400" : "text-emerald-400"
                                                )}>
                                                    {sensor.value} {sensor.unit}
                                                </span>
                                            </div>
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
