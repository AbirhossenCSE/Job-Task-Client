import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layout/Main";
import SignIn from "../SignUp/SignIn";
import Register from "../SignUp/Register";
import TaskManagement from "../components/Task/TaskManagement";


  export const router = createBrowserRouter([

    {
        path: '/',
        element: <Main></Main>
    },
    {
        path: '/taskManagement',
        element: <TaskManagement></TaskManagement>
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