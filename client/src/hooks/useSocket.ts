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
