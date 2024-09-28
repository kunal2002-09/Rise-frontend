import { useSelector, useDispatch } from 'react-redux';
import { selectUserDetails, selectUserLoading, selectUserError } from '../redux/selectors/userSelectors';
import { AppDispatch } from '../redux/store';
import { fetchUserStart, fetchUserSuccess, fetchUserFailure } from '../redux/slices/userSlice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUserDetails);
  const loading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);

  const fetchUser = () => {
    dispatch(fetchUserStart());
    setTimeout(() => {
      dispatch(fetchUserSuccess({ id: 1, name: 'John Doe' }));
    }, 1000);
  };

  return { user, loading, error, fetchUser };
};
