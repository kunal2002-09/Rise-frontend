import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userDetails: { id: number; name: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userDetails: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUserStart(state) {
      state.loading = true;
    },
    fetchUserSuccess(state, action: PayloadAction<{ id: number; name: string }>) {
      state.userDetails = action.payload;
      state.loading = false;
    },
    fetchUserFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchUserStart, fetchUserSuccess, fetchUserFailure } = userSlice.actions;

export default userSlice.reducer;
