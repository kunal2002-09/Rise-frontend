import { post } from '../utils/api'; // Import the utility for POST requests

const userService = {
  login: async (userData: { email: string; password: string }) => {
    try {
      const response = await post('/auth/login', userData); // Use the post utility for login
      return response;
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        // Throw the actual error message from the server
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message || 'Login failed');
      }
    }
  },

  signup: async (userData: { email: string; password: string }) => {
    try {
      const response = await post('/auth/signup', userData); // Use the post utility for signup
      return response;
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(error.message || 'Signup failed');
      }
    }
  },
};

export default userService;
