import React, { useContext } from 'react';
import { useAuth } from '../context/AuthProvider';
import MyContext from '../MyContext';

const Header: React.FC = () => {
    const context = useContext(MyContext);

    if (!context) {
        return null;
    }

    const { user } = context;

    return (
        <header className="bg-gray-800 text-white fixed top-0 w-full m-0 p-0 shadow-md z-10">
            {/* <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <div>
                        <p className="text-sm font-semibold">{user.username}</p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="focus:outline-none">
                        <img src="/icons/notification.png" alt="Notifications" className="w-6 h-6" />
                    </button>
                    <button className="focus:outline-none">
                        <img src="/icons/nav.png" alt="Navigation" className="w-6 h-6" />
                    </button>
                </div>
            </div> */}
        </header>
    );
};

export default Header;
