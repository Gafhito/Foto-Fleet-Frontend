import { Button as MuiButton } from '@mui/material';

import { colors } from '../../../utils/constants';

export const Button = ({label, minWidth, onClick, backgroundColor, backgroundColorHover, colorHover, mt, mr, bxShadow, color, bxShadowHover}) => {
  return (
    <MuiButton 
        variant="contained"
        onClick={onClick}
        sx={{
            marginRight: mr ? mr  : 2,
            color: color ? color : '#000000',
            minWidth: minWidth ? minWidth : '64px',
            boxShadow: bxShadow ? bxShadow : 'none',
            marginTop: mt ? mt : '0',
            backgroundColor: backgroundColor ? backgroundColor : 'transparent', 
            fontSize: { 
                lg: '0.875rem', 
                md:'0.5rem', 
                sm: '.785rem' 
            }, 
            padding: {
                md: '6xp 16px', 
                sm:'6px 0.4rem'
            }, 
            '&:hover': { 
                backgroundColor: backgroundColorHover ? backgroundColorHover : 'transparent', 
                color: colorHover ? colorHover : 'black',
                boxShadow: bxShadowHover ? bxShadowHover : 'none',
            } }}>
        {label}
    </MuiButton>
  )
}