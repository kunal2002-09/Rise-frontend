import React from 'react';
import Navbar from '../Navbar/Navbar'; // Adjust the import path as needed
import Head from 'next/head';

interface LayoutProps {
  children: React.ReactNode;
  pageTitle: string; // Define the type for pageTitle
}

const Layout: React.FC<LayoutProps> = ({ children, pageTitle }) => {
  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <Navbar />

      <main>
      <div className='mainWrapper'>{children}
      </div></main>
    </div>
  );
};

export default Layout;
