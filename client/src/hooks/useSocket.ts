import { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useStore } from '../store/useStore';
import { API_URL } from '../config';

export const useSocket = () => {
    const { setSensors, addNotification } = useStore();

    useEffect(() => {
        const socket = io(API_URL);

        socket.on('connect', () => {
            console.log('Connected to socket server');
            addNotification('Connected to real-time sensor stream', 'success');
        });

        socket.on('sensors:update', (data) => {
            setSensors(data);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from socket server');
            addNotification('Lost connection to sensor stream', 'error');
        });

        return () => {
            socket.disconnect();
        };
    }, [setSensors, addNotification]);
};
