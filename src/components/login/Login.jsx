
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
import FormHelperText from '@mui/material/FormHelperText';


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
    const [hasErrors, setHasErrors] = useState(false);
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

    const setEmailError = (message) => {
      setInputErrors((prevErrors) => ({ ...prevErrors, email: message }));
    };

    // -------------- VALIDACIONESSSSS ---------------------

    const validateEmail = (email) => {
      // Expresión regular para verificar el formato de un email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validatePassword = (password) => {
      // Lógica de validación para la contraseña
      // Mínimo 8 caracteres, máximo 15, al menos una mayúscula, un número y un carácter especial
      const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,15}$/;
      return passwordRegex.test(password);
    };
    
    const validateName = (name) => {
      // Lógica de validación para el nombre o apellido (no debe contener números)
      const nameRegex = /^[^\d]+$/;
      return nameRegex.test(name);
    };
    
    const validatePhone = (phone) => {
      // Lógica de validación para el teléfono (solo números)
      const phoneRegex = /^\d+$/;
      return phoneRegex.test(phone);
    };

    const handleEmailFocus = () => {
      // Limpiar el mensaje de error cuando el campo está en foco
      setInputErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    };
    
    const handleEmailBlur = () => {
      // Verificar el formato del correo electrónico al perder el foco
      if (!email) {
        setEmailError('El correo electrónico no puede estar vacío');
        setHasErrors(true);
      } else if (!validateEmail(email)) {
        setEmailError('Formato de email incorrecto');
        setHasErrors(true);
      } else {
        setEmailError(''); // Limpiar el mensaje de error si el formato es correcto
        setHasErrors(false);
      }
    };

    const handleNameBlur = () => {
      if (!firstName) {
        setInputErrors((prevErrors) => ({ ...prevErrors, firstName: 'El nombre no puede estar vacío' }));
      } else if (!validateName(firstName)) {
        setInputErrors((prevErrors) => ({ ...prevErrors, firstName: 'El nombre no puede contener números' }));
      } else {
        setInputErrors((prevErrors) => ({ ...prevErrors, firstName: '' }));
      }
  
      // Validar todo el formulario y establecer hasErrors en consecuencia
      setHasErrors(validateForm());
    };

    const handleLastNameBlur = () => {
      if (!lastName) {
        setInputErrors((prevErrors) => ({ ...prevErrors, lastName: 'El apellido no puede estar vacío' }));
      } else if (!validateName(lastName)) {
        setInputErrors((prevErrors) => ({ ...prevErrors, lastName: 'El apellido no puede contener números' }));
      } else {
        setInputErrors((prevErrors) => ({ ...prevErrors, lastName: '' }));
      }
  
      // Validar todo el formulario y establecer hasErrors en consecuencia
      setHasErrors(validateForm());
    };

    const handlePhoneBlur = () => {
      if (!phone) {
        setInputErrors((prevErrors) => ({ ...prevErrors, phone: 'El teléfono no puede estar vacío' }));
      } else if (!validatePhone(phone)) {
        setInputErrors((prevErrors) => ({ ...prevErrors, phone: 'Formato de teléfono incorrecto' }));
      } else {
        setInputErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
      }
  
      // Validar todo el formulario y establecer hasErrors en consecuencia
      setHasErrors(validateForm());
    };


    const handlePasswordBlur = () => {
      if (!password) {
        setInputErrors((prevErrors) => ({ ...prevErrors, password: 'La contraseña no puede estar vacía' }));
      } else if (!validatePassword(password)) {
        setInputErrors((prevErrors) => ({ ...prevErrors, password: 'Formato de contraseña incorrecto' }));
      } else {
        setInputErrors((prevErrors) => ({ ...prevErrors, password: '' }));
      }
    
      // Validar todo el formulario y establecer hasErrors en consecuencia
      setHasErrors(validateForm());
    };


    const validateForm = () => {
      // Lógica de validación para todos los campos
      const emailValid = validateEmail(email);
      const passwordValid = validatePassword(password);
      const firstNameValid = validateName(firstName);
      const lastNameValid = validateName(lastName);
      const phoneValid = validatePhone(phone);
    
      // Devuelve true si hay algún error en cualquier campo
      return !emailValid || !passwordValid || !firstNameValid || !lastNameValid || !phoneValid;
    };
    

    const handleChange = (event) => {
      const { name, value } = event.target;
    
      switch (name) {
        case 'firstName':
          setFirstName(value);
          setInputErrors((prevErrors) => ({ ...prevErrors, firstName: '' }));
          break;
        case 'lastName':
          setLastName(value);
          setInputErrors((prevErrors) => ({ ...prevErrors, lastName: '' }));
          break;
        case 'email':
          setEmail(value);
          setInputErrors((prevErrors) => ({ ...prevErrors, email: '' }));
          break;
        case 'password':
          setPassword(value);
          setInputErrors((prevErrors) => ({ ...prevErrors, password: '' }));
          break;
        case 'address':
          setAddress(value);
          break;
        case 'phone':
          setPhone(value);
          setInputErrors((prevErrors) => ({ ...prevErrors, phone: '' }));
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
            setInputErrors((prevErrors) => ({
              ...prevErrors,
              email: 'Email o contraseña incorrectos', // Mensaje de error específico para email
              password: 'Email o contraseña incorrectos', // Mensaje de error específico para contraseña
            }));
          }
        } catch (error) {
          console.error('Error al iniciar sesión:', error);
          setError('Inicio de sesión fallido. Verifica tus credenciales.');
          setInputErrors((prevErrors) => ({
            ...prevErrors,
            email: 'Email o contraseña incorrectos', // Mensaje de error específico para email
            password: 'Email o contraseña incorrectos', // Mensaje de error específico para contraseña
          }));
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
                            sx={{ mb: '2rem' }}
                            className={`form_input`}
                            id="filled-basic"
                            label="First Name"
                            variant="filled"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            onFocus={() => setInputErrors((prevErrors) => ({ ...prevErrors, firstName: '' }))}
                            onBlur={handleNameBlur}
                            error={Boolean(inputErrors.firstName)}
                            helperText={inputErrors.firstName}
                        />
                        <TextField
                            sx={{ mb: '2rem' }}
                            className={`form_input`}
                            id="filled-basic"
                            label="Last Name"
                            variant="filled"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            onFocus={() => setInputErrors((prevErrors) => ({ ...prevErrors, lastName: '' }))}
                            onBlur={handleLastNameBlur}
                            error={Boolean(inputErrors.lastName)}
                            helperText={inputErrors.lastName}
                        />
                        <TextField
                            sx={{ mb: '2rem' }}
                            className={`form_input`}
                            id="filled-basic"
                            label="Address"
                            variant="filled"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <TextField
                            sx={{ mb: '2rem' }}
                            className='form_input'
                            id="filled-basic"
                            label="Phone"
                            variant="filled"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onFocus={() => setInputErrors((prevErrors) => ({ ...prevErrors, phone: '' }))}
                            onBlur={handlePhoneBlur}
                            error={Boolean(inputErrors.phone)}
                            helperText={inputErrors.phone}
                        />
                    </>
                    )}
                    <TextField 
                        sx={{ mb: '2rem'}} 
                        className='form_input' 
                        id="filled-basic" 
                        label="Email" 
                        variant="filled" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Actualiza el estado local de email
                        onFocus={handleEmailFocus}
                        onBlur={handleEmailBlur}
                        error={Boolean(inputErrors.email)}  // Agregado para manejar el estado de error
                        helperText={<FormHelperText sx={{ color: 'black' }}>{inputErrors.email}</FormHelperText>}  // Agregado para mostrar el mensaje de error
                    />
                    <TextField 
                        sx={{
                            mb: '2rem',
                        }}
                        type={showPassword ? 'text' : 'password'} 
                        className='form_input' 
                        id="filled-basic" 
                        label="Password" 
                        variant="filled"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Actualiza el estado local de password 
                        onFocus={() => setInputErrors((prevErrors) => ({ ...prevErrors, password: '' }))}
                        onBlur={handlePasswordBlur}
                        error={Boolean(inputErrors.password)}  // Agregado para manejar el estado de error
                        helperText={inputErrors.password}  // Agregado para mostrar el mensaje de error
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

                    <Button sx={{ mt: '1.5rem'}} variant="contained" disableElevation color='success' onClick={ isRegisterMode ? handleRegister: handleLogin}  disabled={hasErrors} >
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

