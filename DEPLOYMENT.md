# Deployment Guide - AgriMetrics Pro

This guide details how to deploy the AgriMetrics Pro application to production using **Vercel** (Frontend) and **Render** (Backend).

## Prerequisites

- GitHub account (to host the repository).
- Vercel account.
- Render account.

## 1. Backend Deployment (Render)

We will deploy the Node.js/Express backend to Render.

1.  **Push your code to GitHub**: Ensure your project is in a GitHub repository.
2.  **Log in to Render**: Go to [dashboard.render.com](https://dashboard.render.com/).
3.  **Create a New Web Service**:
    - Click "New +" -> "Web Service".
    - Connect your GitHub repository.
4.  **Configure the Service**:
    - **Name**: `agrimetrics-api` (or similar).
    - **Root Directory**: `server` (Important!).
    - **Environment**: `Node`.
    - **Build Command**: `npm install && npm run build`.
    - **Start Command**: `npm start`.
    - **Plan**: Free.
5.  **Environment Variables**:
    Add the following variables in the "Environment" tab:
    - `NODE_ENV`: `production`
    - `JWT_SECRET`: (Generate a strong random string)
    - `CORS_ORIGIN`: `https://your-frontend-app.vercel.app` (You will update this after deploying frontend).
6.  **Deploy**: Click "Create Web Service".
7.  **Copy URL**: Once deployed, copy the service URL (e.g., `https://agrimetrics-api.onrender.com`).

## 2. Frontend Deployment (Vercel)

We will deploy the React/Vite frontend to Vercel.

1.  **Log in to Vercel**: Go to [vercel.com](https://vercel.com/).
2.  **Add New Project**:
    - Click "Add New..." -> "Project".
    - Import your GitHub repository.
3.  **Configure Project**:
    - **Framework Preset**: Vite.
    - **Root Directory**: Edit and select `client`.
4.  **Environment Variables**:
    - Add `VITE_API_URL`: Paste your Render Backend URL (e.g., `https://agrimetrics-api.onrender.com`).
5.  **Deploy**: Click "Deploy".
6.  **Finalize Backend CORS**:
    - Go back to Render.
    - Update `CORS_ORIGIN` with your new Vercel URL.
    - Redeploy/Restart the backend service.

## Environment Variables Reference

### Backend (`server/.env`)

| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Port to run the server on (Render sets this automatically). | `10000` |
| `NODE_ENV` | Environment mode. | `production` |
| `JWT_SECRET` | Secret key for signing JWT tokens. | `s3cr3t-k3y` |
| `CORS_ORIGIN` | Allowed frontend origin for CORS. | `https://myapp.vercel.app` |

### Frontend (`client/.env`)

| Variable | Description | Example |
| :--- | :--- | :--- |
| `VITE_API_URL` | URL of the deployed backend API. | `https://my-api.onrender.com` |

## Troubleshooting

### Common Errors

1.  **CORS Errors**:
    - *Symptom*: Frontend cannot fetch data; console shows "CORS policy" error.
    - *Fix*: Ensure `CORS_ORIGIN` in Render matches your Vercel URL exactly (no trailing slash).

2.  **Socket Connection Failed**:
    - *Symptom*: "Lost connection to sensor stream" notification.
    - *Fix*: Verify `VITE_API_URL` is correct and the backend is running. Check Render logs for crashes.

3.  **Build Failures**:
    - *Symptom*: Vercel or Render build fails.
    - *Fix*: Check the build logs. Ensure `npm install` runs successfully and all dependencies are listed in `package.json`.

## Post-Deployment Monitoring Checklist

- [ ] **Frontend Load**: Verify the dashboard loads without errors.
- [ ] **API Connectivity**: Check if data is fetching (Network tab in DevTools).
- [ ] **Real-time Updates**: Confirm socket connection is established (Green notification).
- [ ] **Authentication**: Test Login/Logout flows.
- [ ] **Responsiveness**: Check UI on mobile device.
- [ ] **Logs**: Check Render logs for any server-side exceptions.
