import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import MockSensorService from '../services/sensorService';

export const createDeviceRouter = (sensorService: MockSensorService) => {
    const router = express.Router();

    router.get('/', authenticateToken, (req: AuthRequest, res) => {
        res.json(sensorService.getSensors());
    });

    router.post('/', authenticateToken, (req: AuthRequest, res) => {
        // Mock adding a device
        const { type, location } = req.body;
        // In a real app, we'd call a method on sensorService to add it.
        // For now, just return success.
        res.status(201).json({ message: 'Device added successfully', device: { id: 'new-device', type, location } });
    });

    router.post('/:id/calibrate', authenticateToken, (req: AuthRequest, res) => {
        res.json({ message: `Device ${req.params.id} calibrated successfully` });
    });

    router.post('/:id/offline', authenticateToken, (req: AuthRequest, res) => {
        res.json({ message: `Device ${req.params.id} set to offline mode` });
    });

    return router;
};
