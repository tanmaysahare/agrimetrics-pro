import React from 'react';
import { CloudRain, Wind, Droplets, Sun } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

export const WeatherCard: React.FC = () => {
    return (
        <Card className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 border-blue-500/30">
            <CardContent className="p-6 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-blue-200 font-medium">Field Conditions</p>
                        <h3 className="text-3xl font-bold text-white mt-1">24°C</h3>
                        <p className="text-sm text-blue-200 mt-1">Partly Cloudy</p>
                    </div>
                    <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                        <Sun className="text-amber-400" size={24} />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="text-center p-2 bg-slate-900/40 rounded-lg">
                        <Wind size={16} className="mx-auto text-slate-400 mb-1" />
                        <p className="text-xs text-slate-300">12 km/h</p>
                    </div>
                    <div className="text-center p-2 bg-slate-900/40 rounded-lg">
                        <Droplets size={16} className="mx-auto text-blue-400 mb-1" />
                        <p className="text-xs text-slate-300">45%</p>
                    </div>
                    <div className="text-center p-2 bg-slate-900/40 rounded-lg">
                        <CloudRain size={16} className="mx-auto text-slate-400 mb-1" />
                        <p className="text-xs text-slate-300">0%</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
