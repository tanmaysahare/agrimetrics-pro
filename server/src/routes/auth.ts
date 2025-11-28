import express from 'express';
import { generateToken } from '../middleware/auth';
import { User } from '../types';

const router = express.Router();

// Mock user database
const users: User[] = [
    { id: '1', email: 'admin@agrimetrics.com', name: 'Admin User', role: 'admin' },
    { id: '2', email: 'farmer@agrimetrics.com', name: 'John Doe', role: 'farmer' }
];

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Mock authentication logic
    const user = users.find(u => u.email === email);

    if (!user || password !== 'password') { // Simple mock password check
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({ token, user });
});

router.post('/register', (req, res) => {
    const { email, name, password } = req.body;

    if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role: 'farmer'
    };

    users.push(newUser);
    const token = generateToken(newUser);
    res.status(201).json({ token, user: newUser });
});

export default router;
