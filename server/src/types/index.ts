export interface SensorData {
    id: string;
    type: 'moisture' | 'ph' | 'temp' | 'humidity';
    value: number;
    unit: string;
    status: 'online' | 'offline' | 'calibration_needed';
    timestamp: number;
    location: string;
}

export interface YieldPrediction {
    sensorId: string;
    predictedYield: number; // in tons/hectare
    riskLevel: 'low' | 'medium' | 'high';
    alerts: string[];
    timestamp: number;
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'farmer' | 'viewer';
}
