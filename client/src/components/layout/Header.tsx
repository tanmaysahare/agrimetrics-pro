import React from 'react';
import { Bell, User, Search } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const Header: React.FC = () => {
    const { user, notifications } = useStore();

    return (
        <header className="h-20 px-8 flex items-center justify-between border-b border-slate-800/50 bg-slate-900/50 backdrop-blur-xl sticky top-0 z-40">
            <div className="flex items-center flex-1">
                <div className="relative w-96 hidden md:block group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search sensors, fields, or alerts..."
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-6">
                <button className="relative p-2 text-slate-400 hover:text-emerald-400 transition-colors rounded-lg hover:bg-slate-800/50">
                    <Bell size={20} />
                    {notifications.length > 0 && (
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.6)] animate-pulse" />
                    )}
                </button>

                <div className="flex items-center space-x-3 pl-6 border-l border-slate-800">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium text-slate-200">{user?.name}</p>
                        <p className="text-xs text-slate-500">{user?.role}</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center text-slate-300 shadow-lg">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};
