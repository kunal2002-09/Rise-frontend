import React from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice'; // Import the logout action
import useNavigate from '../../utils/router'; // Adjust the import path as needed
import './styles.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate(); // Get the navigate function
  
  const dispatch = useAppDispatch(); // Get the dispatch function

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action to update Redux state
    navigate('/login'); // Navigate to the login page after logging out
  };

  return (
    <nav className="navbarWrapper">
      <div className='logoSection'>
        <div className='logoWrapper' onClick={() => navigate('/')} >
          <div className='logoImg'>
            RISE
          </div>
        </div>
      </div>
      <div className='buttonSection'>
        <div className='buttonWrapper'>
          {isAuthenticated ?
            <>
              <button onClick={() => navigate('/dashboard')} className="bg-blue-500 text-white px-4 py-2 rounded">
                Dashboard
              </button> </> :
            <>
              <button onClick={() => navigate('/login')} className="bg-blue-500 text-white px-4 py-2 rounded">
                Login
              </button>
              <button onClick={() => navigate('/signup')} className="bg-blue-500 text-white px-4 py-2 rounded">
                Signup
              </button>
            </>}
        </div>


      </div>

    </nav>
  );
};

export default Navbar;
