import React from 'react';
import { LayoutDashboard, Sprout, Settings, LogOut, Radio } from 'lucide-react';
import { motion } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { clsx } from 'clsx';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    const { logout } = useStore();

    const menuItems = [
        { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
        { id: 'intelligence', label: 'Yield Intelligence', icon: Sprout },
        { id: 'devices', label: 'Device Manager', icon: Radio },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="w-64 h-screen fixed left-0 top-0 bg-slate-900/80 backdrop-blur-xl border-r border-slate-800 flex flex-col z-50"
        >
            <div className="p-6 border-b border-slate-800/50">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                        <Sprout className="text-white" size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white tracking-tight">AgriMetrics</h1>
                        <p className="text-xs text-emerald-400 font-medium tracking-wider uppercase">Pro Edition</p>
                    </div>
                </div>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={clsx(
                                "w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                isActive
                                    ? "text-white bg-emerald-500/10 border border-emerald-500/20"
                                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50"
                            )}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-emerald-500/10 rounded-xl"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            )}
                            <Icon size={20} className={clsx("relative z-10", isActive ? "text-emerald-400" : "group-hover:text-emerald-400 transition-colors")} />
                            <span className="relative z-10 font-medium">{item.label}</span>
                            {isActive && <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />}
                        </button>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-slate-800/50">
                <button
                    onClick={logout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-all duration-200 group"
                >
                    <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>
        </motion.div>
    );
};
