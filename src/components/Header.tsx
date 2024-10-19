import React, { useContext, useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import MyContext from '../MyContext'; // Import MyContext
import { getUsernameFromCurrentUser } from '../helpers/user';

import SignUp from './login/Signup';

const Header: React.FC = () => {
    const { user, loading: authLoading } = useAuth(); // useAuth for user authentication state
    const context = useContext(MyContext); // Access MyContext safely
    const [usernameLoading, setUsernameLoading] = useState(true);
    const [hasNavigated, setHasNavigated] = useState(false);
    const navigate = useNavigate();

    // Ensure the context is defined
    if (!context) {
        throw new Error('MyContext must be used within a MyProvider');
    }

    const { user: contextUser, loading: contextLoading, setUser } = context; // Destructure after the context check

    useEffect(() => {
        const fetchUsername = async () => {
            if (user) {
                const fetchedUsername = await getUsernameFromCurrentUser();
                setUser(fetchedUsername); // Set the username in the context
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
            <header className="w-full h-[10vh] bg-blue-500 flex-col justify-end">
                {
                    (authLoading || contextLoading || usernameLoading || !user) ? 
                    <SignUp /> : <></>
                }

                <SignUp />
            </header>
            
        </>
    );
};

export default Header;
