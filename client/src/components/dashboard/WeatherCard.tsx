import React from 'react';
import { CloudSun, Wind, Droplets } from 'lucide-react';

export const WeatherCard: React.FC = () => {
    return (
        <div className="col-span-1 md:col-span-2 lg:col-span-1 rounded-xl p-6 bg-gradient-to-br from-indigo-600 to-purple-700 text-white relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-indigo-100 font-medium">Field Conditions</h3>
                        <p className="text-3xl font-bold mt-1">Partly Cloudy</p>
                    </div>
                    <CloudSun size={40} className="text-yellow-300" />
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4">
                    <div>
                        <p className="text-indigo-200 text-xs">Temp</p>
                        <p className="font-semibold text-lg">28°C</p>
                    </div>
                    <div>
                        <p className="text-indigo-200 text-xs">Wind</p>
                        <div className="flex items-center space-x-1">
                            <Wind size={14} />
                            <p className="font-semibold text-lg">12km/h</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-indigo-200 text-xs">Precip</p>
                        <div className="flex items-center space-x-1">
                            <Droplets size={14} />
                            <p className="font-semibold text-lg">15%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-500/30 rounded-full blur-xl -ml-10 -mb-10" />
        </div>
    );
};
