import { Avatar as MuiAvatar } from '@mui/material';

import { useAuth } from '../../utils/AuthContext';

export const Avatar = ({ onClick }) => {

    const { user } = useAuth();

  return (
    <MuiAvatar
        className="avatar"
        onClick={onClick}
        sx={{ cursor:'pointer'}}

     >
        {user.rol.charAt(0).toUpperCase()}
    </MuiAvatar>
  )
}

