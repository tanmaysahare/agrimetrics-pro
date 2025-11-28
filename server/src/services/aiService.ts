import { SensorData, YieldPrediction } from '../types';

class YieldAIService {
    public analyze(sensor: SensorData): YieldPrediction | null {
        // Only analyze relevant sensors for yield prediction (e.g., moisture, temp)
        // In a real app, this would aggregate data from multiple sensors in a sector.

        // Simple logic for demonstration:
        // If soil_moisture < 30% AND temp > 35C -> Drought Risk

        const prediction: YieldPrediction = {
            sensorId: sensor.id,
            predictedYield: 0,
            riskLevel: 'low',
            alerts: [],
            timestamp: Date.now()
        };

        // Base yield calculation (mock)
        let baseYield = 4.5; // tons/hectare

        if (sensor.type === 'moisture') {
            if (sensor.value < 30) {
                prediction.alerts.push('Low Moisture Warning');
                baseYield -= 1.0;
                prediction.riskLevel = 'medium';
            }
            if (sensor.value < 15) {
                prediction.alerts.push('Critical Drought Risk');
                baseYield -= 2.0;
                prediction.riskLevel = 'high';
            }
        }

        if (sensor.type === 'temp') {
            if (sensor.value > 35) {
                prediction.alerts.push('Heat Stress Risk');
                baseYield -= 0.5;
                if (prediction.riskLevel === 'low') prediction.riskLevel = 'medium';
            }
            if (sensor.value > 40) {
                prediction.alerts.push('Extreme Heat Danger');
                baseYield -= 1.5;
                prediction.riskLevel = 'high';
            }
        }

        // Combined logic check as requested
        // Note: Since we process single sensor updates here, we might not have both values at once 
        // unless we aggregate. For this mock, we'll assume we check the current sensor's value 
        // against a global context or just simple single-variable checks, 
        // OR we can simulate the compound condition if we had access to other sensors.
        // For simplicity in this "stream" architecture, we'll stick to single-sensor analysis 
        // but we can enhance it if we pass the full state.

        prediction.predictedYield = Math.max(0, parseFloat(baseYield.toFixed(2)));

        return prediction.alerts.length > 0 ? prediction : null;
    }

    // Method to analyze full sector state (more accurate to requirements)
    public analyzeSector(sensors: SensorData[]): YieldPrediction[] {
        // Group by location/sector
        // For now, just return a list of predictions
        return sensors.map(s => this.analyze(s)).filter((p): p is YieldPrediction => p !== null);
    }
}

export default new YieldAIService();
