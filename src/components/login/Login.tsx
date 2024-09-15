import React, { useState } from 'react';
import { signInWithEmail } from '../../helpers/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmail(email, password);
      alert('Logged in successfully!');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="w-full h-[5vh] bg-blue-500 flex justify-end">
      <form onSubmit={handleLogin} className="flex items-center w-1/2 justify-end px-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded-md ml-2"
        />
        <button type="submit" className="bg-blue-700 text-white p-2 rounded-md ml-2">
          Login
        </button>
        {error && <p className="text-red-500 ml-4">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
