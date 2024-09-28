// src/pages/signup.tsx

import React from 'react';
import Signup from '../components/Signup';
import Layout from '../components/layouts/Layout';
import { useRouter } from 'next/router';
import { useAppSelector } from '../redux/store';

const SignupPage: React.FC = () => {
  const router = useRouter(); // Hook for routing

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if(isAuthenticated) router.push('/dashboard'); // Redirect to dashboard if the user is already authenticated


  return (
    <Layout pageTitle='Signup'>
      <Signup />
    </Layout>
  );
};

export default SignupPage;
