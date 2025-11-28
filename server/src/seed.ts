import fs from 'fs';
import path from 'path';

// Mock seed script to generate historical data
const generateHistory = () => {
    const history = [];
    const now = Date.now();
    const day = 24 * 60 * 60 * 1000;

    for (let i = 0; i < 90; i++) {
        history.push({
            date: new Date(now - (90 - i) * day).toISOString().split('T')[0],
            avgMoisture: 40 + Math.random() * 20,
            avgTemp: 25 + Math.random() * 10,
            avgPh: 6.5 + Math.random()
        });
    }

    return history;
};

const data = generateHistory();
console.log('Generated 3 months of historical data:', data.length, 'records');
console.log('Seeding complete.');

// In a real app, we would write this to the DB.
// For now, we'll just save it to a JSON file.
fs.writeFileSync(path.join(__dirname, 'seed_data.json'), JSON.stringify(data, null, 2));
