import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FaTasks, FaCheckCircle, FaChartLine } from "react-icons/fa";
import Footer from "../components/Footer";

const Main = () => {
    return (
        <div className="bg-base-100 text-base-content">
            {/* Navbar */}
            <Navbar />

            {/* Hero Section */}
            <header className="bg-orange-400 text-white py-16 text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <h1 className="text-4xl font-bold mb-4">Manage Your Tasks Efficiently</h1>
                    <p className="text-lg mb-6">
                        A simple and powerful task management system to help you stay organized and boost productivity.
                    </p>
                    <Link
                        to="/tasks"
                        className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition"
                    >
                        Get Started
                    </Link>
                </div>
            </header>

            {/* Features Section */}
            <section className="py-16 px-6 bg-base-100 dark:bg-gray-900">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-3xl font-bold  dark:text-white mb-8">Key Features</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Feature 1 */}
                        <div className="bg-base-200 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <FaTasks className="text-orange-500 text-5xl mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2 dark:text-white">Task Organization</h3>
                            <p className="text-gray-500 dark:text-gray-300">
                                Categorize your tasks into To-Do, In Progress, and Done with an intuitive drag-and-drop interface.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-base-200 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <FaCheckCircle className="text-orange-500 text-5xl mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2 dark:text-white">Real-Time Updates</h3>
                            <p className="text-gray-500 dark:text-gray-300">
                                Instantly save and sync tasks across all your devices for seamless collaboration.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-base-200 dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <FaChartLine className="text-orange-500 text-5xl mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2 dark:text-white">Performance Insights</h3>
                            <p className="text-gray-500 dark:text-gray-300">
                                Visualize your progress with insightful charts and analytics to track your productivity.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

           <Footer></Footer>
            
        </div>
    );
};

export default Main;
