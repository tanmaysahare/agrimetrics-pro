import React from 'react';
import { Header } from './Header';
import { motion, AnimatePresence } from 'framer-motion';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    // In a real app, activeTab would be handled by routing (react-router).
    // For this single-page feel requested, we'll lift state up or use router.
    // The prompt implies a dashboard, so I'll assume we pass the active tab state down 
    // or manage it in the parent App component.
    // However, MainLayout usually wraps content.
    // Let's make MainLayout accept the navigation state or slots.

    // Actually, let's just render the shell here.
    // The children will be the page content.
    // But Sidebar needs to control the view.
    // I'll modify MainLayout to accept activeTab props if needed, 
    // or better, I'll move the state to App.tsx and pass it down.

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 flex">
            {/* Sidebar is fixed, so we add margin to main content */}
            <div className="w-64 flex-shrink-0">
                {/* Placeholder for fixed sidebar space */}
            </div>

            <div className="flex-1 flex flex-col min-w-0">
                <Header />
                <main className="flex-1 p-8 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};
