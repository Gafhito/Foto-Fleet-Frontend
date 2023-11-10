import { Avatar as MuiAvatar } from '@mui/material';

import { useAuth } from '../../utils/AuthContext';

export const Avatar = ({ onClick }) => {
    const { user } = useAuth();

    const role = user && user.role;

    console.log(' Avatar role:' + role)

    const userInitial = role ? role.charAt(0).toUpperCase() : '';

    console.log('userInitial: ' + userInitial)
    console.log('User: ', user)

    return (
        <MuiAvatar
            className="avatar"
            onClick={onClick}
            sx={{ cursor: 'pointer' }}
        >
            {userInitial}
        </MuiAvatar>
    );
}
