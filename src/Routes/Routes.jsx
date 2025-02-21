import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import SignIn from "../SignUp/SignIn";
import Register from "../SignUp/Register";
import TaskManagement from "../components/Task/TaskManagement";
import AddTask from "../components/Task/AddTask";
import EditTask from "../components/Task/EditTask";


  export const router = createBrowserRouter([

    {
        path: '/',
        element: <Main></Main>
    },
    {
        path: '/addTask',
        element: <AddTask></AddTask>
    },
    {
        path: '/tasks',
        element: <TaskManagement></TaskManagement>
    },
    {
        path: '/editTask/:id',
        element: <EditTask></EditTask>
    },
    {
        path: '/register',
        element: <Register></Register>,
    },
    {
        path: '/signin',
        element: <SignIn></SignIn>,
    },
        
  ]);