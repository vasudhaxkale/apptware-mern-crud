## Apptware - MERN Task Manager

Minimal MERN (MongoDB, Express, React/Vite, Node) CRUD task manager with separate `frontend/` and `backend/` folders.

## Features
- Create, read, update, and delete tasks
- Simple REST API served from `backend/` at `/api/tasks`
- React + Vite frontend in `frontend/` using `services/taskService.js` to call the API

## Project layout

- `frontend/` - Vite + React app (pages, components, services)
- `backend/` - Express server, Mongoose models, routes, controllers
- `FILE_STRUCTURE.md` - file map and route summary

## Prerequisites
- Node.js 18+ and npm
- MongoDB (local or hosted, e.g. Atlas)

## Environment variables

Backend (create `backend/.env`):

```
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster0.example.mongodb.net/apptware?retryWrites=true&w=majority
# Optional: allow runtime configuration for CORS origin
FRONTEND_URL=http://localhost:5173
```

Frontend (create `frontend/.env`):

```
VITE_API_URL=http://localhost:5000
```

NOTE: Do NOT commit `.env` files. Include `.env.example` with placeholders instead.

## Setup & Run (development)

Open two terminals from project root.

1) Backend

```cmd
cd backend
npm install
npm run dev
```

2) Frontend

```cmd
cd frontend
npm install
npm run dev
```

Frontend default: `http://localhost:5173`; Backend default: `http://localhost:5000`.

## Production / Build

Build frontend and deploy static assets to your host/CDN. Configure backend CORS and `FRONTEND_URL` for the production origin.

Frontend build example:

```cmd
cd frontend
npm run build
```

Deploy backend to Node hosting (Heroku, Railway, Fly, etc.) and set `MONGODB_URI` and `FRONTEND_URL` in the environment.

## Useful scripts

- Backend: `npm run dev` (dev), `npm start` (production)
- Frontend: `npm run dev`, `npm run build`, `npm run preview`

## Recommendations before push
- Ensure a root `.gitignore` is present (excludes `node_modules`, `.env`, build artifacts). A `.gitignore` was added.
- Add a root `LICENSE` file if public.
- Verify no secrets are committed.

## Contributing

1. Fork and create a feature branch
2. Run frontend and backend locally to test changes
3. Open a PR with a description and testing notes

## License
Add a `LICENSE` file (MIT, Apache-2.0, etc.) and update `backend/package.json` accordingly.

---


