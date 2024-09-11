// src/components/Profile.tsx
import React from 'react';
import { useAuth } from '../context/AuthProvider';
import Logout from './login/Logout';

const Profile: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
          <Logout />
        </>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

export default Profile;
