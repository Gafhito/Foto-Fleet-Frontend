
import { useState, useContext } from 'react';
import './login.css';
import  { LoginFormContext }   from '../../utils/LoginFormContext';
import { useAuth } from '../../utils/AuthContext';
import { Navigate } from 'react-router-dom';

/* Material UI imports */ 
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import LockIcon from '@mui/icons-material/Lock';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from '@mui/material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';

const label = { inputProps: { 'label': 'Checkbox demo' } };


const PinkSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: green[600],
      '&:hover': {
        backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: green[600],
    },
  }));

export const Login = () => {

    const [checked, setChecked] = useState(false);
    const { isLoginFormOpen, openLoginForm, closeLoginForm } = useContext(LoginFormContext);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const { login } = useAuth();


    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        const userData = {
          email,
          password,
        };
    
        try {
          const response = await login(userData);
          setLoggedIn(true);
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
          setError('Inicio de sesión fallido. Verifica tus credenciales.');
        }
      };
    
      if (loggedIn) {
        return <Navigate to="/" />;
      }

  return (
    <div className='form_container'>
        {isLoginFormOpen && <Paper 
            elevation={6} 
            className='paper_login_form' 
            sx={{ 
                width: { xs: '85vw', sm: '29rem', md: '29rem', lg: '29rem', xl: '29rem' },
                height: {
                    xs: '95vh',
                    sm: '90vh',
                    md: '90vh',
                    lg: 'auto',
                    xl: 'auto',
                }
                 
             }}
        >
            <div>
                <div>
                    {/* checked 
                        ? <Chip sx={{ m: '2rem', p:'1rem'}} icon={<FaceIcon style={{ color: 'white' }} />} label="Inicia Sesión" style={{ color: 'white' }} variant="outlined"  />
                        : <Chip sx={{ m: '2rem', p: '1rem'}} icon={<LockIcon style={{ color: 'white' }} />} label="Regístrate" style={{ color: 'white' }} variant="outlined" />
            */}
                </div>
                <div>
                    <h2 style={{color: '#ffffff'}}>Bienvenido a FotoLibre!</h2>

                    <div className='form_login_options'>
                        <p style={{color: '#ffffff'}}>{ checked ? 'Inicia sesión' : 'Registrate'}</p>
                        <PinkSwitch
                            checked={checked}
                            onChange={handleChange}
                            inputProps={{ 'label': 'controlled' }}
                        />
                    </div>
                </div>
            </div>

            <form action="/">
                {!checked ? <TextField sx={{ mb: '1rem'}} className='form_input' id="filled-basic" label="User Name" variant="filled" /> : false}
                <TextField 
                    sx={{ mb: '1rem'}} 
                    className='form_input' 
                    id="filled-basic" 
                    label="Email" 
                    variant="filled" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Actualiza el estado local de email
                />
                <TextField 
                    sx={{
                        mb: '1rem',
                      }}
                    type={showPassword ? 'text' : 'password'} 
                    className='form_input' 
                    id="filled-basic" 
                    label="Password" 
                    variant="filled"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Actualiza el estado local de password 
                    InputProps={{
                        endAdornment: (
                            <InputAdornment 
                                position="end"
                            >
                                <IconButton 
                                    edge="end"
                                    onClick={handleClickShowPassword}
                                    sx={{
                                        '&:focus': {
                                          outline: 'none', // Quita el borde de enfoque por defecto en el icono
                                        },
                                      }}
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>),
                        }}
                />
                <div className='form_options'>
                    <FormControlLabel control={<Checkbox color="success" className='custom_chkbx'/>} label="Recuérdame" style={{color:'#ffffff'}}/>
                    <Link href="#" sx={{ color: '#ffffff', textDecoration: 'none', '&:hover': { color: 'green' } }}>
                        Olvidé contraseña
                    </Link>
                </div>

                <Button sx={{ mt: '1.5rem'}} variant="contained" disableElevation color='success' onClick={handleLogin}>
                    {checked ? 'Inicia Sesión' : 'Registrate'}
                </Button>

                <hr className="divider" />

                <Button sx={{ 
                    mt: '.5rem',
                    p: '.5rem',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    color: '#ffffff',
                    borderColor: '#ffffff', 
                    '&:hover': {
                        color: '#43a047',
                        borderColor: '#43a047',
                    },}} 
                    variant="outlined" 
                    disableElevation 
                
                >
                    <GoogleIcon /> Iniciar Sesion con Google
                </Button>
                <Button sx={{ 
                    mt: '1rem',
                    p: '.5rem',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    color: '#ffffff',
                    borderColor: '#ffffff', 
                    '&:hover': {
                        color: '#43a047',
                        borderColor: '#43a047',
                    },}} 
                    variant="outlined" 
                    disableElevation 
                
                >
                     <FacebookIcon  sx={{mr: '-15px'}}/> Iniciar Sesion con Facebook
                </Button>
                <Button sx={{ 
                    mt: '1rem',
                    p: '.5rem',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    color: '#ffffff',
                    borderColor: '#ffffff', 
                    '&:hover': {
                        color: '#43a047',
                        borderColor: '#43a047',
                    },}} 
                    variant="outlined" 
                    disableElevation 
                
                >
                    <TwitterIcon/> Iniciar Sesion con Twitter
                </Button>
            </form>
        </Paper>}
    </div>
  )
}

