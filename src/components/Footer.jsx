import React from 'react';

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-900 text-white text-center py-6">
                <p>&copy; {new Date().getFullYear()} Task Management System. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Footer;