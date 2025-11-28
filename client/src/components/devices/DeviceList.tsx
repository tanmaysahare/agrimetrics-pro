import React from 'react';
import { useStore } from '../../store/useStore';
import { Wifi, WifiOff, RefreshCw, Power } from 'lucide-react';
import clsx from 'clsx';
import { API_URL } from '../../config';

export const DeviceList: React.FC = () => {
    const { sensors, token } = useStore();

    const handleAction = async (id: string, action: 'calibrate' | 'offline') => {
        if (!token) return;
        try {
            await fetch(`${API_URL}/api/devices/${id}/${action}`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` }
            });
            // In a real app, we'd show a toast here
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800">
                <h3 className="text-lg font-semibold text-slate-100">Connected IoT Devices</h3>
                <p className="text-sm text-slate-400">Manage your sensor network</p>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-400">
                    <thead className="bg-slate-800/50 text-slate-200 uppercase font-medium">
                        <tr>
                            <th className="px-6 py-4">Device ID</th>
                            <th className="px-6 py-4">Type</th>
                            <th className="px-6 py-4">Location</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Last Reading</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {sensors.map((sensor) => (
                            <tr key={sensor.id} className="hover:bg-slate-800/30 transition-colors">
                                <td className="px-6 py-4 font-medium text-slate-300">{sensor.id}</td>
                                <td className="px-6 py-4 capitalize">{sensor.type}</td>
                                <td className="px-6 py-4">{sensor.location}</td>
                                <td className="px-6 py-4">
                                    <span className={clsx(
                                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                                        sensor.status === 'online' ? "bg-emerald-500/10 text-emerald-400" : "bg-slate-700 text-slate-400"
                                    )}>
                                        {sensor.status === 'online' ? <Wifi size={12} className="mr-1" /> : <WifiOff size={12} className="mr-1" />}
                                        {sensor.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    {sensor.value} {sensor.unit}
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button
                                        onClick={() => handleAction(sensor.id, 'calibrate')}
                                        className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-blue-400 transition-colors"
                                        title="Calibrate"
                                    >
                                        <RefreshCw size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleAction(sensor.id, 'offline')}
                                        className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                                        title="Turn Off"
                                    >
                                        <Power size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
