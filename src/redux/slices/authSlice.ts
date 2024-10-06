// src/redux/slices/authSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userService from '../../services/userService'; // Import your user service
import { setTokenCookie, removeTokenCookie, getTokenCookie } from '../../utils/cookieUtils'; // Import cookie utility

// Check for token and set initial state
const initialToken = getTokenCookie('token');
const initialState = {
  isAuthenticated: !!initialToken, // true if token exists
  user: null,
  loading: false,
  error: null as string | null,
};

// Async Thunks
export const login = createAsyncThunk('auth/login', async (userData: { email: string; password: string, }) => {
  const response = await userService.login(userData);
  setTokenCookie('token', response.data.token); // Set token in cookie
  return response.data; // Return user data
});

export const signup = createAsyncThunk('auth/signup', async (userData: { email: string; password: string,restaurantDetails:object }) => {
  const response = await userService.signup(userData);
  setTokenCookie('token', response.data.token); // Set token in cookie
  return response.data; // Return user data
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      removeTokenCookie('token'); // Clear token from cookie on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true; // Set to true on successful login
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true; // Set to true on successful signup
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
