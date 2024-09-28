import React from 'react';
import { Drawer, List, ListItemIcon, ListItemText, ListItemButton, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../../redux/store'; // Adjust import if needed
import { logout } from '../../redux/slices/authSlice';
import './styles.css';

const Sidebar: React.FC = () => {
    const router = useRouter();
    const dispatch = useAppDispatch(); // For handling logout

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    const handleLogout = () => {
        dispatch(logout());
        router.push('/login'); // Redirect to login after logout
    };

    const drawerWidth = 240;

    return (
        <div
            className='drawer'
        >
            <List>
                <ListItemButton onClick={() => handleNavigation('/dashboard')}>
                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItemButton>

                <ListItemButton onClick={() => handleNavigation('/profile')}>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>

                <Divider />

                <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </List>
        </div>
    );
};

export default Sidebar;
