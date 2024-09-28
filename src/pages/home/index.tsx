import React from 'react';
import Link from 'next/link';
import Layout from '../../components/layouts/Layout';

const Home: React.FC = () => {
  return (
    <Layout pageTitle='Home Page'>
   
     <div className='mainWrapper'> <h1>Welcome to the Next.js + Redux App</h1>
      <p>This is a sample home page for your Next.js app.</p>
      <Link href="/dashboard">
        Go to Dashboard
      </Link>
      </div>
      </Layout>
  );
};

export default Home;
