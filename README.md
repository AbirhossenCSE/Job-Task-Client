# Task Management Application

A simple and efficient Task Management Application built with React, Vite, Firebase authentication, and drag-and-drop functionality for seamless task organization.

## 🚀 Live Demo
[Live Link](#) (Replace with your deployed link)

## 📌 Features
- Add, edit, delete, and reorder tasks.
- Categorize tasks into **To-Do, In Progress, and Done**.
- Drag and drop tasks between categories.
- Reorder tasks within a category.
- Firebase authentication (Google Sign-In, Email/Password login).
- Dark mode toggle.
- Responsive design.

## 🛠 Technologies Used
- **Frontend:** React.js, Vite, Tailwind CSS, DaisyUI
- **State Management:** React Context API
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** Firebase Authentication
- **Drag & Drop:** @hello-pangea/dnd
- **HTTP Requests:** Axios

## 📦 Dependencies
```json
"dependencies": {
  "react": "^18.0.0",
  "react-router-dom": "^6.0.0",
  "firebase": "^9.0.0",
  "axios": "^1.0.0",
  "@hello-pangea/dnd": "^13.0.0",
  "tailwindcss": "^3.0.0",
  "daisyui": "^2.0.0"
}
```

## 🛠 Installation & Setup
1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/task-management-app.git
   cd task-management-app
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Add Firebase configuration to `.env` file:
     ```env
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     ```
4. **Run the development server**
   ```sh
   npm run dev
   ```

## 📄 API Endpoints
- `POST /tasks` – Add a new task
- `GET /tasks` – Retrieve all tasks for the logged-in user
- `PUT /tasks/:id` – Update task details
- `DELETE /tasks/:id` – Delete a task

## 📌 Author
[Abir Hossen]



