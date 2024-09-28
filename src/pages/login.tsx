// src/pages/login.tsx

import React from 'react';
import Login from '../components/Login';
import Layout from '../components/layouts/Layout';
import { GetServerSideProps } from 'next';

const LoginPage: React.FC = () => {



  return (
    <Layout pageTitle='lOGIN'>
      <Login />
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const token = req.cookies.token; // Access the cookie directly from the request

  if (token) {
    // If valid token, redirect to dashboard
    res.writeHead(302, { Location: '/dashboard' });
    res.end();
    return { props: {} } // Return empty props
  }

  return { props: {} }; // Return empty props if authenticated
};
export default LoginPage;
