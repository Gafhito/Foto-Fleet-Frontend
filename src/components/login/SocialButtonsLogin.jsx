import React from 'react'

import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';

import { colors } from '../../utils/constants';

export const SocialButtonsLogin = () => {
  return (
    <>
        <Button sx={{ 
            mt: '.5rem',
            p: '.5rem',
            display: 'flex',
            justifyContent: 'space-evenly',
            color: '#ffffff',
            borderColor: '#ffffff', 
            '&:hover': {
                color: colors.terciaryColor,
                 borderColor: colors.terciaryColor,
             },}} 
             variant="outlined" 
            disableElevation 
                    
        >
            <GoogleIcon /> Iniciar Sesion con Google
        </Button>
            <Button sx={{ 
                 mt: '.5rem',
                 p: '.5rem',
                 display: 'flex',
                 justifyContent: 'space-evenly',
                 color: '#ffffff',
                 borderColor: '#ffffff', 
                 '&:hover': {
                     color: colors.terciaryColor,
                      borderColor: colors.terciaryColor,
                  },}} 
                  variant="outlined" 
                 disableElevation 
                         
             >
                <FacebookIcon  sx={{mr: '-15px'}}/> Iniciar Sesion con Facebook
            </Button>
            <Button sx={{ 
                 mt: '.5rem',
                 p: '.5rem',
                 display: 'flex',
                 justifyContent: 'space-evenly',
                 color: '#ffffff',
                 borderColor: '#ffffff', 
                 '&:hover': {
                     color: colors.terciaryColor,
                      borderColor:colors.terciaryColor,
                  },}} 
                  variant="outlined" 
                 disableElevation 
                         
             >
                <TwitterIcon/> Iniciar Sesion con Twitter
            </Button>
    </>
  )
}

