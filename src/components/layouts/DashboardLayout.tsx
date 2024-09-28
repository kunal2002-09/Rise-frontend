import React from 'react';
import Navbar from '../Navbar/DashboardNavbar/DashboardNavbar'; // Adjust the import path as needed
import Sidebar from '../Sidebar/Sidebar'; // Adjust the import path if needed
import { Box, Toolbar } from '@mui/material';
import { relative } from 'path';

interface LayoutProps {
  children: React.ReactNode;
  pageTitle: string; // Define the type for pageTitle
}

const DashboardLayout: React.FC<LayoutProps> = ({ children, pageTitle }) => {
  const drawerWidth = 240;

  return (
    <Box sx={{
      display: 'flex', flexDirection: "column", background: "linear-gradient(111.52deg, rgb(213, 241, 254) 4.16%, rgb(246, 251, 255) 22.57%, rgb(246, 251, 255) 95.49%)"
    }}>
      {/* Navbar on top */}
      <Navbar />

      {/* Sidebar and Main Content */}
      <Box sx={{
        display: 'flex', width: '100%', minHeight: '100vh', justifyContent: 'space-between', alignContent: 'center'
      }}>

        {/* Sidebar */}
        <Sidebar />
        {/* Main Content Area */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            margin: "5% 5% 5% 1%",
            height: '700px',
            bgcolor: 'background.default',
          }}
        >
          {/* Add a top padding to prevent content from being hidden under the Navbar */}
          <Toolbar />
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
