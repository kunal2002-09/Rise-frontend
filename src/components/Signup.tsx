// src/components/Signup.tsx

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store'; // Use the typed dispatch and selector
import { signup } from '../redux/slices/authSlice';
import { useRouter } from 'next/router';
import { setTokenCookie } from '../utils/cookieUtils'; // Import the cookie utility

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter(); // Hook for routing
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(signup({ email, password }));

      // Check if the signup action was fulfilled. 
      if (signup.fulfilled.match(resultAction)) {
        // // Store the token in cookies using the utility function
        // const token = resultAction.payload.token; // Assuming the token is in the payload
        // setTokenCookie(token); // Use the utility to set the token in cookies

        // Redirect to dashboard
        router.push('/dashboard');
      } else {
        // Handle the case where signup failed
        console.error('Signup failed:', resultAction.error.message);
      }
    } catch (err) {
      console.error('Error during signup:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Signup</h2>
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Signing up...' : 'Signup'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default Signup;
