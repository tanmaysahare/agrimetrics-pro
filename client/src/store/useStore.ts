import { create } from 'zustand';
import type { SensorData, User, Notification } from '../types';

interface AppState {
    user: User | null;
    token: string | null;
    sensors: SensorData[];
    theme: 'dark' | 'light';
    notifications: Notification[];

    login: (user: User, token: string) => void;
    logout: () => void;
    setSensors: (sensors: SensorData[]) => void;
    toggleTheme: () => void;
    addNotification: (message: string, type: Notification['type']) => void;
    removeNotification: (id: string) => void;
}

export const useStore = create<AppState>((set) => ({
    user: null,
    token: localStorage.getItem('token'),
    sensors: [],
    theme: 'dark',
    notifications: [],

    login: (user, token) => {
        localStorage.setItem('token', token);
        set({ user, token });
    },

    logout: () => {
        localStorage.removeItem('token');
        set({ user: null, token: null });
    },

    setSensors: (sensors) => set({ sensors }),

    toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        return { theme: newTheme };
    }),

    addNotification: (message, type) => set((state) => ({
        notifications: [...state.notifications, { id: Date.now().toString(), message, type }]
    })),

    removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter(n => n.id !== id)
    }))
}));
