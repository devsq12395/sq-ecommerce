import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import Logout from './login/Logout';
import { getUsernameFromCurrentUser } from '../helpers/user';

const Profile: React.FC = () => {
  const { user, loading } = useAuth();
  const [username, setUsername] = useState<string | null>(null);
  const [usernameLoading, setUsernameLoading] = useState(true);

  useEffect(() => {
    // Fetch the username if the user is logged in
    const fetchUsername = async () => {
      if (user) {
        const fetchedUsername = await getUsernameFromCurrentUser();
        setUsername(fetchedUsername);
        setUsernameLoading(false);
      }
    };
    
    fetchUsername();
  }, [user]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {usernameLoading ? 'Loading username...' : username ? username : 'No username found'}</p>
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
