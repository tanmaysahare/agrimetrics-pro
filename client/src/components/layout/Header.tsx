import React from 'react';
import { Sun, Moon, Bell, User as UserIcon } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const Header: React.FC = () => {
    const { user, theme, toggleTheme, notifications } = useStore();

    return (
        <header className="h-16 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40 ml-64">
            <div className="flex items-center space-x-4">
                {/* Breadcrumbs or Page Title could go here */}
            </div>

            <div className="flex items-center space-x-6">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-slate-400 hover:bg-slate-800 transition-colors"
                >
                    {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <div className="relative">
                    <button className="p-2 rounded-full text-slate-400 hover:bg-slate-800 transition-colors">
                        <Bell size={20} />
                        {notifications.length > 0 && (
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        )}
                    </button>
                </div>

                <div className="flex items-center space-x-3 pl-6 border-l border-slate-800">
                    <div className="text-right hidden md:block">
                        <p className="text-sm font-medium text-slate-200">{user?.name || 'Guest User'}</p>
                        <p className="text-xs text-slate-500 capitalize">{user?.role || 'Viewer'}</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                        <UserIcon size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};
