# TaskFrontend

Frontend application for the Task Manager project. Built with React (Vite) and TailwindCSS, the app provides a user-friendly interface to register, log in, and manage tasks (create, edit, delete, filter). It integrates with the TaskBackend API to persist tasks for authenticated users.

---

## ✨ Features

- User registration and login with JWT
- Persisted sessions using localStorage
- Protected client routes for authenticated users
- Create, edit, delete tasks with priority, status, and due date fields
- Search, filter and pagination support for tasks
- Responsive UI using Tailwind CSS and smooth transitions via Framer Motion

---

## 📁 Folder Structure

```
TaskFrontend/
│── public/
│── src/
│ ├── assets/           → Static assets and images
│ ├── components/       → Reusable components (Navbar, Sidebar, TaskCard, PrivateRoute)
│ ├── context/          → Auth context and provider
│ ├── hooks/            → Custom hooks (useAuth)
│ ├── layouts/          → AppLayout and wrappers
│ ├── pages/            → Pages (Landing, Login, Register, Dashboard, Tasks, AddTask, EditTask)
│ ├── utils/            → API helpers and axios instance
│ ├── App.jsx
│ └── main.jsx
│── .env (VITE_API_URL)
│── package.json
```

---

## Tech Stack

- React (Vite) – Frontend framework
- Tailwind CSS – UI styling
- Framer Motion – Animations & transitions
- Axios – HTTP client
- React Router DOM – Client-side routing
- JWT – Authentication tokens

---

## Pages / Modules

- Landing – Public homepage and intro
- Login / Register – User authentication pages
- Dashboard – User summary and quick actions
- Tasks – Task list with filters and search
- AddTask / EditTask – Compose and update tasks

---

## Configuration / Backend Connection

- Configure API base URL by creating a `.env` file at the project root with:

```
VITE_API_URL=http://localhost:5000/api
```

The app uses `src/utils/axiosInstance.js` to build requests. If `VITE_API_URL` is not set, it defaults to `http://localhost:5000/api`.

---

## Run Locally

```bash
# clone repo
cd TaskFrontend
npm install
npm run dev
```

Visit the app at: `http://localhost:5173` (or Vite-provided port)

Build for production:

```bash
npm run build
npm run preview
```

---

## Example Test Accounts

Use these for quick testing or register a new user in-app:

- demo@gmail.com | Password: 123456
- honey@gmail.com  | Password: 123456

---

## API Endpoints Used

The frontend consumes these endpoints on TaskBackend:

- `POST /api/auth/register` – Register user
- `POST /api/auth/login` – Login (returns JWT)
- `GET /api/tasks` – Get user's tasks 
- `POST /api/tasks` – Create task
- `PUT /api/tasks/:id` – Update task
- `DELETE /api/tasks/:id` – Delete task

---

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/3b712c99-a157-4861-bdfc-b4980ccb09b3" />

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/ce206933-bb8a-43ec-a581-87e6e2affb70" />

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/4b518f5c-539b-46e4-b415-c961dedad433" />

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/eadefe41-e265-4ecb-8a44-d105ed182337" />

<img width="1366" height="768" alt="image" src="https://github.com/user-attachments/assets/b56ce289-f9fa-4bde-9123-0805fa18d1d2" />

