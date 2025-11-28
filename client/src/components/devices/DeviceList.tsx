import React from 'react';
import { useStore } from '../../store/useStore';
import { Wifi, WifiOff, RefreshCw, Power, MapPin, Activity } from 'lucide-react';
import { clsx } from 'clsx';
import { API_URL } from '../../config';
import { Card, CardHeader, CardTitle } from '../ui/Card';
import { motion } from 'framer-motion';

export const DeviceList: React.FC = () => {
    const { sensors, token } = useStore();

    const handleAction = async (id: string, action: 'calibrate' | 'offline') => {
        if (!token) return;
        try {
            await fetch(`${API_URL}/api/devices/${id}/${action}`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` }
            });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle>Connected IoT Devices</CardTitle>
                <p className="text-sm text-slate-400">Manage your sensor network fleet</p>
            </CardHeader>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-slate-800/50 text-slate-200 uppercase font-medium text-xs">
                        <tr>
                            <th className="px-6 py-4">Device ID</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Location</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Last Reading</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {sensors.map((sensor, idx) => (
                            <motion.tr
                                key={sensor.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className="hover:bg-slate-800/30 transition-colors group"
                            >
                                <td className="px-6 py-4 font-mono text-slate-300">{sensor.id}</td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <Activity size={14} className="text-slate-500" />
                                        <span className="capitalize">{sensor.type}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <MapPin size={14} className="text-slate-500" />
                                        <span>{sensor.location}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={clsx(
                                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                                        sensor.status === 'online'
                                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                            : "bg-slate-700/50 text-slate-400 border-slate-600"
                                    )}>
                                        {sensor.status === 'online' ? <Wifi size={12} className="mr-1.5" /> : <WifiOff size={12} className="mr-1.5" />}
                                        {sensor.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-mono text-slate-200">
                                    {sensor.value} <span className="text-slate-500 text-xs">{sensor.unit}</span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => handleAction(sensor.id, 'calibrate')}
                                        className="p-2 hover:bg-blue-500/10 rounded-lg text-slate-400 hover:text-blue-400 transition-colors border border-transparent hover:border-blue-500/20"
                                        title="Calibrate Sensor"
                                    >
                                        <RefreshCw size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleAction(sensor.id, 'offline')}
                                        className="p-2 hover:bg-rose-500/10 rounded-lg text-slate-400 hover:text-rose-400 transition-colors border border-transparent hover:border-rose-500/20"
                                        title="Force Offline"
                                    >
                                        <Power size={16} />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
};
