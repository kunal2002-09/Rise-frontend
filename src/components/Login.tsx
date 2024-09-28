// src/components/Login.tsx

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store'; // Use the typed dispatch and selector
import { login } from '../redux/slices/authSlice';
import { setTokenCookie } from '../utils/cookieUtils'; // Import the cookie utility
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
const router = useRouter(); // Hook for routing
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const resultAction = await   dispatch(login({ email, password }));
    if (login.fulfilled.match(resultAction)) {
      // // Store the token in cookies using the utility function
      // const token = resultAction.payload.token; // Assuming the token is in the payload
      // setTokenCookie(token); // Use the utility to set the token in cookies

      // Redirect to dashboard
      router.push('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;
