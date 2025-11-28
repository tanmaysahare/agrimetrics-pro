import React, { useEffect, useState } from 'react';
import type { YieldPrediction } from '../../types';
import { AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { API_URL } from '../../config';

export const YieldPredictionCard: React.FC = () => {
    const { token } = useStore();
    const [predictions, setPredictions] = useState<YieldPrediction[]>([]);

    useEffect(() => {
        const fetchPredictions = async () => {
            if (!token) return;
            try {
                const res = await fetch(`${API_URL}/api/dashboard/metrics`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await res.json();
                setPredictions(data.predictions);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPredictions();
        const interval = setInterval(fetchPredictions, 5000);
        return () => clearInterval(interval);
    }, [token]);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {predictions.slice(0, 3).map((pred, idx) => (
                    <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-semibold text-slate-100">Sector {idx + 1} Analysis</h3>
                            {pred.riskLevel === 'high' ? (
                                <AlertTriangle className="text-red-500" />
                            ) : pred.riskLevel === 'medium' ? (
                                <AlertTriangle className="text-yellow-500" />
                            ) : (
                                <CheckCircle className="text-emerald-500" />
                            )}
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm text-slate-400">Predicted Yield</p>
                                <div className="flex items-baseline space-x-2">
                                    <span className="text-2xl font-bold text-slate-100">{pred.predictedYield}</span>
                                    <span className="text-sm text-slate-500">tons/ha</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm text-slate-400 mb-2">Risk Factors</p>
                                <div className="flex flex-wrap gap-2">
                                    {pred.alerts.length > 0 ? (
                                        pred.alerts.map((alert, i) => (
                                            <span key={i} className="px-2 py-1 rounded bg-red-500/10 text-red-400 text-xs border border-red-500/20">
                                                {alert}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20">
                                            Optimal Conditions
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <TrendingUp className="text-emerald-400" />
                    <h3 className="text-lg font-semibold text-slate-100">AI Recommendations</h3>
                </div>
                <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <h4 className="font-medium text-emerald-400 mb-1">Irrigation Optimization</h4>
                        <p className="text-sm text-slate-400">Based on current moisture levels in Sector 2, reducing irrigation by 15% will maintain optimal yield while conserving water.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <h4 className="font-medium text-yellow-400 mb-1">Soil pH Adjustment</h4>
                        <p className="text-sm text-slate-400">Sector 4 shows slightly acidic trends. Consider applying lime treatment within the next 48 hours.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
