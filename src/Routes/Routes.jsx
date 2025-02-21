import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import SignIn from "../SignUp/SignIn";
import Register from "../SignUp/Register";
import TaskManagement from "../components/Task/TaskManagement";
import AddTask from "../components/Task/AddTask";
import EditTask from "../components/Task/EditTask";
import PrivateRoute from "./PrivateRoute";


  export const router = createBrowserRouter([

    {
        path: '/',
        element: <Main></Main>
    },
    {
        path: '/addTask',
        element: <PrivateRoute><AddTask></AddTask></PrivateRoute>
    },
    {
        path: '/tasks',
        element: <PrivateRoute><TaskManagement></TaskManagement></PrivateRoute>
    },
    {
        path: '/editTask/:id',
        element: <PrivateRoute><EditTask></EditTask></PrivateRoute>
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