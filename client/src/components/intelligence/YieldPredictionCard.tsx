import React, { useEffect, useState } from 'react';
import type { YieldPrediction } from '../../types';
import { AlertTriangle, CheckCircle, TrendingUp, Loader2, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { API_URL } from '../../config';
import { Card, CardContent } from '../ui/Card';
import { motion, AnimatePresence } from 'framer-motion';

export const YieldPredictionCard: React.FC = () => {
    const { token } = useStore();
    const [predictions, setPredictions] = useState<YieldPrediction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPredictions = async () => {
            if (!token) return;
            // Simulate "Scanning" delay for effect
            setLoading(true);
            try {
                const res = await fetch(`${API_URL}/api/dashboard/metrics`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setTimeout(() => {
                    setPredictions(data.predictions);
                    setLoading(false);
                }, 1500); // Artificial delay for "AI Processing" effect
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchPredictions();
        const interval = setInterval(fetchPredictions, 30000); // Refresh every 30s
        return () => clearInterval(interval);
    }, [token]);

    if (loading && predictions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
                <div className="relative">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full animate-pulse" />
                    <Loader2 size={48} className="text-emerald-400 animate-spin relative z-10" />
                </div>
                <p className="text-emerald-400 font-mono animate-pulse">Analyzing satellite & sensor data...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center space-x-3 mb-8">
                <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <Sparkles className="text-emerald-400" size={24} />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-white">Yield Intelligence</h2>
                    <p className="text-slate-400">AI-driven insights for crop optimization</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnimatePresence mode="popLayout">
                    {predictions.slice(0, 3).map((pred, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="h-full border-t-4 border-t-emerald-500">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-slate-100">Sector {idx + 1}</h3>
                                            <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mt-1">Analysis Report</p>
                                        </div>
                                        {pred.riskLevel === 'high' ? (
                                            <div className="p-2 bg-rose-500/10 rounded-full border border-rose-500/20">
                                                <AlertTriangle className="text-rose-500" size={20} />
                                            </div>
                                        ) : pred.riskLevel === 'medium' ? (
                                            <div className="p-2 bg-amber-500/10 rounded-full border border-amber-500/20">
                                                <AlertTriangle className="text-amber-500" size={20} />
                                            </div>
                                        ) : (
                                            <div className="p-2 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                                                <CheckCircle className="text-emerald-500" size={20} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <p className="text-sm text-slate-400 mb-1">Predicted Yield</p>
                                            <div className="flex items-baseline space-x-2">
                                                <span className="text-4xl font-bold text-white tracking-tight">{pred.predictedYield}</span>
                                                <span className="text-sm text-slate-500 font-medium">tons/ha</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-slate-800 rounded-full mt-3 overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full"
                                                    style={{ width: `${(pred.predictedYield / 12) * 100}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-sm text-slate-400 mb-3">Risk Factors</p>
                                            <div className="flex flex-wrap gap-2">
                                                {pred.alerts.length > 0 ? (
                                                    pred.alerts.map((alert, i) => (
                                                        <span key={i} className="px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-400 text-xs font-medium border border-rose-500/20">
                                                            {alert}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 text-xs font-medium border border-emerald-500/20">
                                                        Optimal Conditions
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700">
                <CardContent className="p-8">
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                            <TrendingUp className="text-blue-400" size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">AI Recommendations</h3>
                            <p className="text-slate-400 text-sm">Actionable insights to improve yield</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-5 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-emerald-500/30 transition-colors group">
                            <h4 className="font-semibold text-emerald-400 mb-2 flex items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 group-hover:animate-pulse" />
                                Irrigation Optimization
                            </h4>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Based on current moisture levels in Sector 2, reducing irrigation by <span className="text-white font-medium">15%</span> will maintain optimal yield while conserving water resources.
                            </p>
                        </div>
                        <div className="p-5 rounded-xl bg-slate-950/50 border border-slate-800 hover:border-amber-500/30 transition-colors group">
                            <h4 className="font-semibold text-amber-400 mb-2 flex items-center">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mr-2 group-hover:animate-pulse" />
                                Soil pH Adjustment
                            </h4>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Sector 4 shows slightly acidic trends (pH 6.2). Consider applying <span className="text-white font-medium">lime treatment</span> within the next 48 hours to prevent yield loss.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
