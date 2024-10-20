import React, { useContext, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import MyContext from '../MyContext';
import { getUsernameFromCurrentUser } from '../helpers/user';
import LoginPopup from './popups/LoginPopup';

const Header: React.FC = () => {
    const { user, loading: authLoading } = useAuth();
    const context = useContext(MyContext);
    const [usernameLoading, setUsernameLoading] = useState(true);
    const [hasNavigated, setHasNavigated] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
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

    return (
        <>
            <header className="w-full bg-blue-500 flex flex-col justify-between">
                {/* Top section with logo and login/welcome */}
                <div className="w-full h-[10vh] flex items-center justify-between px-4">
                    <div className="flex items-center">
                        <img src="#" alt="Logo" className="h-8 w-8" />
                    </div>
                    <div className="flex items-center">
                        {
                            (authLoading || contextLoading || usernameLoading || !user) ? 
                            <button
                                onClick={() => setShowLogin(true)}
                                className="bg-blue-700 text-white p-2 rounded-md"
                            >
                                Login
                            </button> : 
                            <div className="relative">
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="text-white p-2 rounded-md flex items-center"
                                >
                                    Welcome, {contextUser}
                                    <span className="ml-2">▼</span> {/* Dropdown icon */}
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
                        }
                    </div>
                </div>

                {/* Bottom section with centered menu */}
                <div className="w-full h-[5vh] flex items-center justify-center bg-blue-600">
                    <nav className="text-white font-semibold">
                        HOME | CATALOG | ABOUT
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
