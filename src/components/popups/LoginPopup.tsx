import React, { useState } from 'react';
import { signInWithEmail, signUpWithEmail } from '../../helpers/auth';

interface LoginPopupProps {
  show: boolean;
  onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ show, onClose }) => {
  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [emailSignUp, setEmailSignUp] = useState('');
  const [passwordSignUp, setPasswordSignUp] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [signUpError, setSignUpError] = useState<string | null>(null);
  const [isSubmittingSignUp, setIsSubmittingSignUp] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmail(emailLogin, passwordLogin);
      alert('Logged in successfully!');
      onClose();
    } catch (err: any) {
      setLoginError(err.message);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingSignUp) return;
    setIsSubmittingSignUp(true);
    try {
      await signUpWithEmail(emailSignUp, passwordSignUp);
      alert('Check your email for the confirmation link!');
    } catch (err: any) {
      setSignUpError(err.message);
    } finally {
      setIsSubmittingSignUp(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md w-full max-w-3xl flex">
        <div className="w-1/2 pr-4 border-r">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Login</h2>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              value={emailLogin}
              onChange={(e) => setEmailLogin(e.target.value)}
              className="p-2 border border-gray-300 rounded-md mb-2"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={passwordLogin}
              onChange={(e) => setPasswordLogin(e.target.value)}
              className="p-2 border border-gray-300 rounded-md mb-4"
              required
            />
            <button type="submit" className="bg-blue-700 text-white p-2 rounded-md">
              Login
            </button>
            {loginError && <p className="text-red-500 mt-2">{loginError}</p>}
          </form>
        </div>

        <div className="w-1/2 pl-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Sign Up</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
          </div>

          <form onSubmit={handleSignUp} className="flex flex-col">
            <input
              type="email"
              placeholder="Email"
              value={emailSignUp}
              onChange={(e) => setEmailSignUp(e.target.value)}
              className="p-2 border border-gray-300 rounded-md mb-2"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={passwordSignUp}
              onChange={(e) => setPasswordSignUp(e.target.value)}
              className="p-2 border border-gray-300 rounded-md mb-4"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white p-2 rounded-md"
              disabled={isSubmittingSignUp}
            >
              {isSubmittingSignUp ? 'Signing Up...' : 'Sign Up'}
            </button>
            {signUpError && <p className="text-red-500 mt-2">{signUpError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
