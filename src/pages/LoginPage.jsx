import Login from "../components/login/Login";
import { Carrousel } from "../components/loginCarrousel/Carrousel";

import { useTheme } from '@mui/system';
import { useMediaQuery } from '@mui/material';

export const LoginPage = () => {
  const theme = useTheme();
  const isScreenSmallerThan768px = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Login />
      {isScreenSmallerThan768px ? null : <Carrousel />}
    </>
  );
};
