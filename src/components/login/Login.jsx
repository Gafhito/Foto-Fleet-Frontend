
import { useState, useContext, useEffect } from 'react';
import './login.css';
import  { LoginFormContext }   from '../../utils/LoginFormContext';
import { useAuth } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

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


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();

    const [inputErrors, setInputErrors] = useState({
      email: '',
      password: '',
  });

    const { login, registerUser, setIsLoggedIn, isLoggedIn } = useAuth();

    const handleToggleMode = () => {
        setIsRegisterMode(!isRegisterMode);
        setError(null); // Limpiar errores al cambiar entre modos
      };

const handleChange = (event) => {
  const { name, value } = event.target;
  switch (name) {
    case 'firstName':
      setFirstName(value);
      break;
    case 'lastName':
      setLastName(value);
      break;
    case 'email':
      setEmail(value);
      setInputErrors((prevErrors) => ({ ...prevErrors, email: '' })); // Limpiar mensaje de error
      break;
    case 'password':
      setPassword(value);
      setInputErrors((prevErrors) => ({ ...prevErrors, password: '' })); // Limpiar mensaje de error
      break;
    case 'address':
      setAddress(value);
      break;
    case 'phone':
      setPhone(value);
      break;
    default:
      break;
  }
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
          console.log('Respuesta del inicio de sesión:', response);
      
          if (response && response.accessToken) {
            console.log('isLoggedIn es: ' + isLoggedIn)
            setIsLoggedIn(true);
            console.log('isLoggedIn establecido en true');
          } else {
            setError('Inicio de sesión fallido. Verifica tus credenciales.');
          }
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
          setError('Inicio de sesión fallido. Verifica tus credenciales.');
        }
      };


      if (isLoggedIn) {
        navigate('/');
      }



      console.log('isLoggedIn al entrar al componente Login:', isLoggedIn);

      const handleRegister = async () => {

        const userData = {
          firstName,
          lastName,
          email,
          password,
          address,
          phone,
        };
      
        try {

            console.log('UserData enviado al registro: ', userData)
          const response = await registerUser(userData);

          console.log('response: ', response)
      
          if (response) {
            console.log('entro al IF: ', response)
            setRegistrationSuccess(true);
            setOpenDialog(true);
          } else {
            setError('Inicio de sesión fallido. Verifica tus credenciales.');
            setInputErrors((prevErrors) => ({
              ...prevErrors,
              email: 'Email o contraseña incorrectos', // Mensaje de error específico para email
              password: 'Email o contraseña incorrectos', // Mensaje de error específico para contraseña
            }));
          }
        } catch (error) {
          console.error('Error al registrar usuario:', error);
          setError('Registro de usuario fallido. Verifica los datos proporcionados.');
          setInputErrors((prevErrors) => ({
            ...prevErrors,
            email: 'Email o contraseña incorrectos', // Mensaje de error específico para email
            password: 'Email o contraseña incorrectos', // Mensaje de error específico para contraseña
          }));
        }
      };

    
      const handleRedirectHome = () => {
        setOpenDialog(false);
        console.log('antes de setear redirect')
        setRedirect(true);
        console.log('antes de setear redirect')
    };


    if (redirect) {
        navigate('/');
      }





  return (
    <div className='form_container'>
        {isLoginFormOpen && 
            <Paper 
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
                        <h2 style={{color: '#ffffff'}}>Bienvenido a FotoLibre!</h2>

                        <div className='form_login_options'>
                            <p style={{color: '#ffffff'}}>{ isRegisterMode ? 'Registrate' : 'Inicia Sesion'}</p>
                            <PinkSwitch
                                checked={isRegisterMode}
                                onChange={handleToggleMode}
                                inputProps={{ 'label': 'controlled' }}
                            />
                        </div>
                    </div>
                </div>
                <form action="/">
                    {isRegisterMode && (
                    <>
                        <TextField
                            sx={{ mb: '1rem' }}
                            className={`form_input`}
                            id="filled-basic"
                            label="First Name"
                            variant="filled"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField
                            sx={{ mb: '1rem' }}
                            className={`form_input`}
                            id="filled-basic"
                            label="Last Name"
                            variant="filled"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <TextField
                            sx={{ mb: '1rem' }}
                            className={`form_input`}
                            id="filled-basic"
                            label="Address"
                            variant="filled"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <TextField
                            sx={{ mb: '1rem' }}
                            className='form_input'
                            id="filled-basic"
                            label="Phone"
                            variant="filled"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </>
                    )}
                    <TextField 
                        sx={{ mb: '1rem'}} 
                        className='form_input' 
                        id="filled-basic" 
                        label="Email" 
                        variant="filled" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Actualiza el estado local de email
                        error={Boolean(inputErrors.email)}  // Agregado para manejar el estado de error
                        helperText={inputErrors.email}  // Agregado para mostrar el mensaje de error
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

                    <Button sx={{ mt: '1.5rem'}} variant="contained" disableElevation color='success' onClick={ isRegisterMode ? handleRegister: handleLogin} >
                        {isRegisterMode ? 'Registrate' : 'Inicia Sesión' }
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

                {registrationSuccess && (
                    <Dialog open={openDialog} onClose={() => setOpenDialog(false)} sx={{zIndex:'1000000000000000000'}}>
                        <DialogTitle>Registro exitoso</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            Registro exitoso! Deberas iniciar sesion. Haz clic en "OK" para continuar.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleRedirectHome}>
                            OK
                            </Button>
                        </DialogActions>
                    </Dialog>
                )}
            </Paper>
        }
    </div>
  )
}

