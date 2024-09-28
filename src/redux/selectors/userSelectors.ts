import { RootState } from '../store';

export const selectUserDetails = (state: RootState) => state.user.userDetails;
export const selectUserLoading = (state: RootState) => state.user.loading;
export const selectUserError = (state: RootState) => state.user.error;
