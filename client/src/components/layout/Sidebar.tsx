import React from 'react';
import { LayoutDashboard, Brain, Cpu, Settings, LogOut } from 'lucide-react';
import { useStore } from '../../store/useStore';
import clsx from 'clsx';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    const { logout } = useStore();

    const menuItems = [
        { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
        { id: 'intelligence', label: 'Yield AI', icon: Brain },
        { id: 'devices', label: 'Device Manager', icon: Cpu },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0 z-50">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                    AgriMetrics Pro
                </h1>
                <p className="text-xs text-slate-500 mt-1">Precision Farming OS</p>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={clsx(
                                'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200',
                                activeTab === item.id
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                            )}
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800">
                <button
                    onClick={logout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </aside>
    );
};
