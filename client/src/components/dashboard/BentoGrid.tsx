import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { StatCard } from '../ui/StatCard';
import { SensorGrid } from './SensorGrid';
import { WeatherCard } from './WeatherCard';
import { Droplets, Thermometer, Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

export const BentoGrid: React.FC = () => {
    const { sensors } = useStore();
    const [chartData, setChartData] = useState<any[]>([]);

    // Calculate averages
    const moistureSensors = sensors.filter(s => s.type === 'moisture');
    const avgMoisture = moistureSensors.length
        ? (moistureSensors.reduce((acc, s) => acc + parseFloat(s.value.toString()), 0) / moistureSensors.length).toFixed(1)
        : '0';

    const tempSensors = sensors.filter(s => s.type === 'temp');
    const avgTemp = tempSensors.length
        ? (tempSensors.reduce((acc, s) => acc + parseFloat(s.value.toString()), 0) / tempSensors.length).toFixed(1)
        : '0';

    const phSensors = sensors.filter(s => s.type === 'ph');
    const avgPh = phSensors.length
        ? (phSensors.reduce((acc, s) => acc + parseFloat(s.value.toString()), 0) / phSensors.length).toFixed(1)
        : '0';

    // Mock chart data updates
    useEffect(() => {
        const interval = setInterval(() => {
            setChartData(prev => {
                const newData = [...prev, {
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    moisture: parseFloat(avgMoisture) + (Math.random() * 2 - 1),
                    temp: parseFloat(avgTemp) + (Math.random() * 1 - 0.5)
                }];
                return newData.slice(-30); // Keep last 30 points
            });
        }, 2000);
        return () => clearInterval(interval);
    }, [avgMoisture, avgTemp]);

    return (
        <div className="space-y-6 animate-slide-up">
            {/* Hero Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Soil Moisture"
                    value={avgMoisture}
                    unit="%"
                    icon={<Droplets size={24} />}
                    trend={{ value: 2.5, isPositive: true }}
                    color="blue"
                />
                <StatCard
                    title="Temperature"
                    value={avgTemp}
                    unit="°C"
                    icon={<Thermometer size={24} />}
                    trend={{ value: 1.2, isPositive: true }}
                    color="rose"
                />
                <StatCard
                    title="Soil pH Level"
                    value={avgPh}
                    unit="pH"
                    icon={<Activity size={24} />}
                    trend={{ value: 0.4, isPositive: false }}
                    color="amber"
                />
                <WeatherCard />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[550px]">
                {/* Real-time Chart */}
                <Card className="lg:col-span-2 h-full flex flex-col">
                    <CardHeader>
                        <CardTitle>Real-time Field Conditions</CardTitle>
                        <p className="text-sm text-slate-400">Live telemetry from 50+ sensors</p>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#F43F5E" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis
                                    dataKey="time"
                                    stroke="#64748b"
                                    tick={{ fontSize: 12, fill: '#64748b' }}
                                    tickLine={false}
                                    axisLine={false}
                                    minTickGap={30}
                                />
                                <YAxis
                                    stroke="#64748b"
                                    tick={{ fontSize: 12, fill: '#64748b' }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                                    itemStyle={{ color: '#e2e8f0', fontSize: '12px', fontWeight: 600 }}
                                    labelStyle={{ color: '#94a3b8', marginBottom: '4px' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="moisture"
                                    name="Moisture"
                                    stroke="#3B82F6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorMoisture)"
                                    animationDuration={1000}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="temp"
                                    name="Temperature"
                                    stroke="#F43F5E"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorTemp)"
                                    animationDuration={1000}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Sensor Heatmap */}
                <div className="lg:col-span-1 h-full">
                    <SensorGrid sensors={sensors} />
                </div>
            </div>
        </div>
    );
};
