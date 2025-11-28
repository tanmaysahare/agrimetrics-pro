import { Server } from 'socket.io';
import { SensorData } from '../types';

class MockSensorService {
    private sensors: SensorData[] = [];
    private io: Server;
    private intervalId: NodeJS.Timeout | null = null;

    constructor(io: Server) {
        this.io = io;
        this.initializeSensors();
    }

    private initializeSensors() {
        const types: SensorData['type'][] = ['moisture', 'ph', 'temp', 'humidity'];

        for (let i = 0; i < 50; i++) {
            this.sensors.push({
                id: `sensor-${i + 1}`,
                type: types[i % types.length],
                value: 0,
                unit: this.getUnit(types[i % types.length]),
                status: 'online',
                timestamp: Date.now(),
                location: `Sector ${Math.floor(i / 10) + 1}`
            });
        }
    }

    private getUnit(type: SensorData['type']): string {
        switch (type) {
            case 'moisture': return '%';
            case 'ph': return 'pH';
            case 'temp': return '°C';
            case 'humidity': return '%';
            default: return '';
        }
    }

    public startSimulation() {
        if (this.intervalId) return;

        console.log('Starting sensor simulation...');
        this.intervalId = setInterval(() => {
            this.updateSensors();
            this.io.emit('sensors:update', this.sensors);
        }, 3000); // Update every 3 seconds
    }

    public stopSimulation() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    private updateSensors() {
        this.sensors = this.sensors.map(sensor => {
            // Simulate random fluctuations
            let change = (Math.random() - 0.5) * 2; // -1 to 1

            // Add drift based on type
            if (sensor.type === 'moisture') change *= 2; // Larger fluctuations
            if (sensor.type === 'ph') change *= 0.1; // Small fluctuations

            let newValue = sensor.value + change;

            // Clamp values to realistic ranges
            if (sensor.type === 'moisture') newValue = Math.max(0, Math.min(100, newValue));
            if (sensor.type === 'ph') newValue = Math.max(0, Math.min(14, newValue));
            if (sensor.type === 'temp') newValue = Math.max(-10, Math.min(50, newValue));
            if (sensor.type === 'humidity') newValue = Math.max(0, Math.min(100, newValue));

            // Initial values if 0
            if (sensor.value === 0) {
                if (sensor.type === 'moisture') newValue = 40 + Math.random() * 20;
                if (sensor.type === 'ph') newValue = 6.5 + Math.random();
                if (sensor.type === 'temp') newValue = 25 + Math.random() * 10;
                if (sensor.type === 'humidity') newValue = 60 + Math.random() * 20;
            }

            return {
                ...sensor,
                value: parseFloat(newValue.toFixed(2)),
                timestamp: Date.now()
            };
        });
    }

    public getSensors() {
        return this.sensors;
    }
}

export default MockSensorService;
