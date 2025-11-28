import React, { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { Sidebar } from './components/layout/Sidebar';
import { BentoGrid } from './components/dashboard/BentoGrid';
import { YieldPredictionCard } from './components/intelligence/YieldPredictionCard';
import { DeviceList } from './components/devices/DeviceList';
import { useAuth } from './hooks/useAuth';
import { useSocket } from './hooks/useSocket';
import { useStore } from './store/useStore';
import { Loader2 } from 'lucide-react';

function App() {
  const { loading: authLoading, signIn } = useAuth();
  const { token } = useStore();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Initialize socket
  useSocket();

  // Mock Login Screen
  const [email, setEmail] = useState('farmer@agrimetrics.com');
  const [password, setPassword] = useState('password');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(email, password);
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              AgriMetrics Pro
            </h1>
            <p className="text-slate-400 mt-2">Sign in to your command center</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={authLoading}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center"
            >
              {authLoading ? <Loader2 className="animate-spin" /> : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            <p>Demo Credentials:</p>
            <p>farmer@agrimetrics.com / password</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col min-w-0">
        <MainLayout>
          {activeTab === 'dashboard' && <BentoGrid />}
          {activeTab === 'intelligence' && <YieldPredictionCard />}
          {activeTab === 'devices' && <DeviceList />}
          {activeTab === 'settings' && (
            <div className="text-center py-20 text-slate-500">
              Settings module coming soon.
            </div>
          )}
        </MainLayout>
      </div>
    </div>
  );
}

export default App;
