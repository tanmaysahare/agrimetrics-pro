import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import { createDashboardRouter } from './routes/dashboard';
import { createDeviceRouter } from './routes/devices';
import MockSensorService from './services/sensorService';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use(express.json());

// Initialize Services
const sensorService = new MockSensorService(io);
sensorService.startSimulation();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', createDashboardRouter(sensorService));
app.use('/api/devices', createDeviceRouter(sensorService));

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('AgriMetrics Pro API is running');
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Send initial data
    socket.emit('sensors:update', sensorService.getSensors());

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
