import React from 'react';
import { signOut } from '../../helpers/auth';

const Logout: React.FC = () => {
  const handleLogout = async () => {
    try {
      await signOut();
      alert('You have been logged out!');
    } catch (err: any) {
      console.error('Error logging out:', err.message);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
