import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Logout from './login/Logout';
import { getUsernameFromCurrentUser } from '../helpers/user';

const Profile: React.FC = () => {
  const { user, loading } = useAuth();
  const [username, setUsername] = useState<string | null>(null);
  const [usernameLoading, setUsernameLoading] = useState(true);
  const [hasNavigated, setHasNavigated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        const fetchedUsername = await getUsernameFromCurrentUser();
        setUsername(fetchedUsername);
        setUsernameLoading(false);

        if (!fetchedUsername && !hasNavigated) {
          setHasNavigated(true);
          navigate('/create-profile');
        }
      }
    };

    fetchUsername();
  }, [user, navigate, hasNavigated]);

  if (loading || usernameLoading) return <p>Loading...</p>;
  if (!user) return <></>;

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {username}</p>
          <p>Email: {user.email}</p>
          <Logout />
        </>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

export default Profile;
