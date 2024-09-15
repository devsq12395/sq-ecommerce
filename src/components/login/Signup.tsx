import React, { useState } from 'react';
import { signUpWithEmail } from '../../helpers/auth';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    e.preventDefault();
    try {
      await signUpWithEmail(email, password);
      alert('Check your email for the confirmation link!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-[5vh] bg-blue-500 flex justify-end">
      <form onSubmit={handleSignUp} className="flex items-center w-1/2 justify-end px-4">
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
        <button type="submit" className="bg-green-600 text-white p-2 rounded-md ml-2">
          Sign Up
        </button>
        {error && <p className="text-red-500 ml-4">{error}</p>}
      </form>
    </div>
  );
};

export default SignUp;
