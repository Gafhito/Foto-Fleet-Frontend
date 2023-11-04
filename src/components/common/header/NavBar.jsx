import React, { useState } from 'react';
import { Box, Menu, MenuItem } from '@mui/material';
import { NavLinks } from './NavLinks';
import { HeaderButtons } from './HeaderButtons';
import { useAuth } from '../../../utils/AuthContext';

import { Avatar } from '../../UserInfo/Avatar';
import { UserMenu } from '../../UserInfo/UserMenu';

export const NavBar = () => {
    const { user } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);

    console.log('user del Navbar: ' + user)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: { sm: 'space-between', md: 'space-around' }, alignItems: { sm: 'center' }, width: { lg: '65%', sm: '85%' } }}>
            <NavLinks />
            <Box sx={{ display: 'flex' }}>
                {user ? (
                    <div>
                        <Avatar onClick={handleClick} />
                        <UserMenu anchorEl={anchorEl} onClose={handleClose}/>
                    </div>
                ) : (
                    <HeaderButtons />
                )}
            </Box>
        </Box>
    );
};