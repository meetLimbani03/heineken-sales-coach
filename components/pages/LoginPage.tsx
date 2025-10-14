import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Icons } from '../../constants';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!login(email)) {
      setError('Invalid email or password.');
    } else {
      setError('');
    }
  };
  
  const setCredentials = (email: string) => {
    setEmail(email);
    setPassword('password123');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="mb-8">
        <Icons.HeinekenLogo />
      </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center text-[#006A42] mb-6">
          Sales Rep Login
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-900 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-white text-gray-900 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-400"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#006A42] hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              LOG IN
            </button>
          </div>
           <div className="text-center mt-4">
            <a className="inline-block align-baseline font-bold text-sm text-red-600 hover:text-red-800" href="#">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
       <div className="mt-4 p-4 border rounded-md bg-gray-100 text-sm text-gray-600 w-full max-w-md">
            <h3 className="font-bold mb-2 text-center">Demo Accounts</h3>
            <div className="flex justify-around">
                 <button onClick={() => setCredentials('cayden.ong@heineken.com')} className="text-blue-500 hover:underline">Use Cayden's Account</button>
                 <button onClick={() => setCredentials('zen.huang@heineken.com')} className="text-blue-500 hover:underline">Use Zen's Account</button>
            </div>
            <p className="text-center mt-2">Password: <span className="font-mono">password123</span></p>
        </div>
    </div>
  );
};

export default LoginPage;