# AgriMetrics Pro

AgriMetrics Pro is an enterprise-grade precision farming dashboard that aggregates real-time IoT sensor data, uses AI for yield prediction, and provides actionable insights for farmers.

## Features

- **Command Center Dashboard**: Real-time monitoring of soil moisture, pH, and weather conditions.
- **Yield-AI Engine**: ML-based crop yield predictions and risk assessment.
- **IoT Device Management**: Manage and calibrate connected sensors.
- **Real-time Updates**: Live data streaming via WebSockets.
- **Responsive Design**: Fully optimized for desktop and mobile.

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion, Recharts.
- **Backend**: Node.js, Express, Socket.io.
- **State Management**: Zustand.
- **Authentication**: JWT.

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm

### Installation

1.  **Clone the repository** (or navigate to the project directory).

2.  **Install Dependencies**:
    ```bash
    # Client
    cd client
    npm install

    # Server
    cd ../server
    npm install
    ```

3.  **Start the Application**:
    
    Start the backend server:
    ```bash
    cd server
    npm run dev
    ```
    
    Start the frontend client:
    ```bash
    cd client
    npm run dev
    ```

4.  **Access the App**:
    Open [http://localhost:5173](http://localhost:5173) in your browser.

### Demo Credentials

- **Email**: `farmer@agrimetrics.com`
- **Password**: `password`

## Architecture

The project follows a monorepo structure:
- `client/`: React frontend application.
- `server/`: Express backend API and Socket.io server.

## License

Proprietary - AgriMetrics Inc.
