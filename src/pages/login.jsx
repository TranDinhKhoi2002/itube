import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import withPublicRoute from 'src/hocs/withPublicRoute';
import { selectIsAuthenticated } from 'src/redux/slices/authSlice';

function LoginPage() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  console.log(isAuthenticated);

  return <Typography>Login Page</Typography>;
}

export default withPublicRoute(LoginPage);
