
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/Authcontext";
import { FaMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";


const Navbar = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [theme, setTheme] = useState('light');

    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                console.log('Sign out successful');
            })
            .catch(() => {
                console.log('Sign out failed');
            });
    };

    // Toggle dark/light mode
    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const links = (
        <>
            <li><NavLink to='/'>Home</NavLink></li>
            <li><NavLink to='/addTask'>Add Task</NavLink></li>
            <li><NavLink to='/tasks'>Task Management</NavLink></li>

        </>
    );
    return (
        <div>
            <div className="navbar bg-base-300">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            {links}
                        </ul>
                    </div>
                    <a className="btn btn-ghost font-bold text-2xl ml-20">TaskManager</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {links}
                    </ul>
                </div>
                <div className="navbar-end mr-20">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="btn btn-ghost mr-2"
                        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                        {theme === 'light' ? <FaMoon /> : <FiSun />}
                    </button>

                    {user ? (
                        <button onClick={handleSignOut} className="btn">
                            Sign Out
                        </button>
                    ) : (
                        <>
                            <Link to='/signin'>Sign-In</Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;