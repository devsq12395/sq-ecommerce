import React, { useContext, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import MyContext from '../MyContext';
import { getUsernameFromCurrentUser } from '../helpers/user';

import LoginPopup from './popups/LoginPopup';
import SearchBar from './header/SearchBar';
import { FaShoppingCart } from 'react-icons/fa';

const Header: React.FC = () => {
    const { user, loading: authLoading } = useAuth();
    const context = useContext(MyContext);
    const [usernameLoading, setUsernameLoading] = useState(true);
    const [hasNavigated, setHasNavigated] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isSticky, setIsSticky] = useState(false);
    const navigate = useNavigate();

    if (!context) {
        throw new Error('MyContext must be used within a MyProvider');
    }

    const { user: contextUser, loading: contextLoading, setUser } = context;

    useEffect(() => {
        const fetchUsername = async () => {
            if (user) {
                const fetchedUsername = await getUsernameFromCurrentUser();
                setUser(fetchedUsername);
                setUsernameLoading(false);

                if (!fetchedUsername && !hasNavigated) {
                    setHasNavigated(true);
                    navigate('/create-profile');
                }
            }
        };

        fetchUsername();
    }, [user, navigate, hasNavigated, setUser]);

    useEffect(() => {
        const handleScroll = () => {
            // If the scroll position is past the top header height, make the bottom nav sticky
            setIsSticky(window.scrollY > 70); // Adjust this value based on the header height
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <header className="w-full bg-blue-500 flex flex-col">
                {/* Top header section */}
                <div className="w-full h-[10vh] flex items-center justify-between px-4">
                    <div className="flex items-center w-1/3">
                        <img src="#" alt="Logo" className="h-8 w-8" />
                    </div>
                    <div className="w-1/3 flex justify-center">
                        <SearchBar />
                    </div>
                    <div className="flex items-center justify-end w-1/3">
                        {(authLoading || contextLoading || usernameLoading || !user) ? 
                            <button onClick={() => setShowLogin(true)} className="bg-blue-700 text-white p-2 rounded-md">
                                Login
                            </button> 
                            : 
                            <div className="flex flex-col items-end gap-2">
                                <div className="relative">
                                    <button
                                        onClick={() => setShowDropdown(!showDropdown)}
                                        className="text-white p-2 rounded-md flex items-center"
                                    >
                                        Welcome, {contextUser}
                                        <span className="ml-2">▼</span>
                                    </button>
                                    {showDropdown && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                                            <ul className="py-1">
                                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 1</li>
                                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Option 2</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                                <button 
                                    className="bg-blue-700 text-white p-2 rounded-md flex items-center"
                                    onClick={() => navigate('/cart')}
                                >
                                    <FaShoppingCart className="mr-2" />
                                    Cart
                                </button>
                            </div>
                        }
                    </div>
                </div>

                {/* Bottom navigation menu */}
                <div 
                    className={`w-full h-[5vh] flex items-center justify-center bg-blue-600 ${isSticky ? 'fixed top-0 left-0 z-10' : ''}`}
                >
                    <nav className="text-white font-semibold">
                        <a href="#" className="px-4 hover:underline">HOME</a>
                        <span>|</span>
                        <a href="#" className="px-4 hover:underline">CATALOG</a>
                        <span>|</span>
                        <a href="#" className="px-4 hover:underline">ABOUT</a>
                    </nav>
                </div>
            </header>

            <LoginPopup 
                show={showLogin} 
                onClose={() => setShowLogin(false)}
            />
        </>
    );
};

export default Header;
