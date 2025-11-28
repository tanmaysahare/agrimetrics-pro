import React, { useEffect, useState } from 'react';
import { SensorWidget } from './SensorWidget';
import { WeatherCard } from './WeatherCard';
import { Heatmap } from './Heatmap';
import { useStore } from '../../store/useStore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const BentoGrid: React.FC = () => {
    const { sensors } = useStore();
    const [history, setHistory] = useState<any[]>([]);

    // Aggregate data for widgets
    const moistureSensors = sensors.filter(s => s.type === 'moisture');
    const avgMoisture = moistureSensors.length
        ? Math.round(moistureSensors.reduce((acc, s) => acc + s.value, 0) / moistureSensors.length)
        : 0;

    const phSensors = sensors.filter(s => s.type === 'ph');
    const avgPh = phSensors.length
        ? parseFloat((phSensors.reduce((acc, s) => acc + s.value, 0) / phSensors.length).toFixed(1))
        : 0;

    const tempSensors = sensors.filter(s => s.type === 'temp');
    const avgTemp = tempSensors.length
        ? Math.round(tempSensors.reduce((acc, s) => acc + s.value, 0) / tempSensors.length)
        : 0;

    // Update history
    useEffect(() => {
        if (sensors.length === 0) return;

        setHistory(prev => {
            const newPoint = {
                time: new Date().toLocaleTimeString(),
                moisture: avgMoisture,
                temp: avgTemp,
                ph: avgPh * 10 // Scale pH for visibility
            };
            const newHistory = [...prev, newPoint];
            if (newHistory.length > 20) newHistory.shift();
            return newHistory;
        });
    }, [sensors, avgMoisture, avgTemp, avgPh]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <SensorWidget type="moisture" value={avgMoisture} unit="%" trend={2.5} />
                <SensorWidget type="ph" value={avgPh} unit="pH" trend={-0.1} />
                <SensorWidget type="temp" value={avgTemp} unit="°C" trend={1.2} />
                <WeatherCard />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 h-full min-h-[400px]">
                        <h3 className="text-lg font-semibold text-slate-100 mb-4">Real-time Sensor Trends</h3>
                        <div className="h-[320px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={history}>
                                    <defs>
                                        <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                                    <XAxis dataKey="time" stroke="#64748b" fontSize={12} tick={{ fill: '#64748b' }} />
                                    <YAxis stroke="#64748b" fontSize={12} tick={{ fill: '#64748b' }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f1f5f9' }}
                                        itemStyle={{ color: '#f1f5f9' }}
                                    />
                                    <Area type="monotone" dataKey="moisture" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorMoisture)" name="Moisture %" />
                                    <Area type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorTemp)" name="Temp °C" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-1">
                    <Heatmap sensors={sensors} />
                </div>
            </div>
        </div>
    );
};
