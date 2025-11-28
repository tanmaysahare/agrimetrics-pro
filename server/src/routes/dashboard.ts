import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import MockSensorService from '../services/sensorService';
import YieldAIService from '../services/aiService';

const router = express.Router();

// We need to pass the sensor service instance or use a singleton.
// For this simple app, we'll assume the service is instantiated in index.ts 
// and we might need to export the instance or pass it. 
// To keep it clean, let's export the class and instantiate it in index.ts, 
// but for routes to access it, we can attach it to req or use a singleton pattern.
// I'll use a singleton pattern for the service in this file for simplicity, 
// OR better, I'll export a function to create the router that accepts the service.

export const createDashboardRouter = (sensorService: MockSensorService) => {
    const router = express.Router();

    router.get('/metrics', authenticateToken, (req: AuthRequest, res) => {
        const sensors = sensorService.getSensors();
        const predictions = YieldAIService.analyzeSector(sensors);

        res.json({
            sensors,
            predictions,
            timestamp: Date.now()
        });
    });

    router.get('/alerts', authenticateToken, (req: AuthRequest, res) => {
        const sensors = sensorService.getSensors();
        const predictions = YieldAIService.analyzeSector(sensors);
        const alerts = predictions.filter(p => p.alerts.length > 0);

        res.json(alerts);
    });

    return router;
};
