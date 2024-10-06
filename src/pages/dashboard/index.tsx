import React from 'react';
import DashboardLayout from '../../components/layouts/DashboardLayout';

import GoogleMapComponent from '../../components/common/GoogleMap/GoogleMap'; 

import { GetServerSideProps } from 'next';

const Dashboard: React.FC = () => {


  return (
    <DashboardLayout pageTitle='Dashboard'>
      <h1>Dashboard</h1>
      <h1>Google Maps Places API Example</h1>
      {/* <GoogleMapComponent /> */}
    </DashboardLayout>
  );
};

// Server-side authentication check
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;
  const token = req.cookies.token; // Access the cookie directly from the request

  if (!token) {
    // If no token, redirect to login
    res.writeHead(302, { Location: '/login?authStatus=user_invalid' });
    res.end();
    return { props: {} } // Return empty props
  }

  return { props: {} }; // Return empty props if authenticated
};

export default Dashboard;
