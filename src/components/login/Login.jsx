
import { useState, useContext, useEffect } from 'react';
import { useLoginForm } from '../../utils/LoginFormContext';
import { useAuth } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

/* Material UI imports */ 
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import FaceIcon from '@mui/icons-material/Face';
import LockIcon from '@mui/icons-material/Lock';
//import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from '@mui/material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Button from '@mui/material/Button';
//import { alpha, styled } from '@mui/material/styles';
//import { green } from '@mui/material/colors';
import FormHelperText from '@mui/material/FormHelperText';


import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { SocialButtonsLogin } from './SocialButtonsLogin';
import { CustomTextField } from './CustomTextField';

import { colors } from '../../utils/constants';

import './login.css';

const label = { inputProps: { 'label': 'Checkbox demo' } };


/*const PinkSwitch = styled(Switch)(({ theme }) => ({
    '& .MuiSwitch-switchBase.Mui-checked': {
      color: green[600],
      '&:hover': {
        backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
      },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
      backgroundColor: green[600],
    },
  }));*/

export const Login = () => {

    const [checked, setChecked] = useState(false);
    const { isLoginFormOpen, openLoginForm, closeLoginForm, isRegisterMode } = useLoginForm();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    //const [isRegisterMode, setIsRegisterMode] = useState(false);
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


  console.log('isRegisterMode: ' + isRegisterMode)

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
      // Mínimo 8 caracteres, máximo 15, al menos una mayúscula, un número y un carácter especial
      const passwordRegex =  /^.+$/; ///^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,15}$/;
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
            <Paper elevation={6} className='paper_login_form' 
                sx={{ 
                    width: { xs: '85vw', sm: '29rem', md: '29rem', lg: '29rem', xl: '29rem' },
                    height: { xs: '95vh', sm: '90vh', md: '90vh', lg: 'auto', xl: 'auto', }
                }}>
                <div>
                    <div>
                        <h2 style={{color: '#ffffff'}}>Bienvenido a FotoFleet!</h2>
                        <div className='form_login_options'>
                            <p style={{color: '#ffffff'}}>{ isRegisterMode ? 'Registrate' : 'Inicia Sesion'}</p>
                           {/*<PinkSwitch checked={isRegisterMode} onChange={handleToggleMode} inputProps={{ 'label': 'controlled' }}/>*/}
                        </div>
                    </div>
                </div>
                <form action="/" className={'login_form'}>
                    {isRegisterMode && (
                    <div>

                      <CustomTextField label={'First Name'} value={firstName} onChange={(e) => setFirstName(e.target.value)} onFocus={() => setInputErrors((prevErrors) => ({ ...prevErrors, firstName: '' }))} onBlur={handleNameBlur} error={inputErrors.firstName} helperText={inputErrors.firstName}/>
                      <CustomTextField label={'Last Name'} value={lastName} onChange={(e) => setLastName(e.target.value)} onFocus={() => setInputErrors((prevErrors) => ({ ...prevErrors, lastName: '' }))} onBlur={handleLastNameBlur} error={inputErrors.lastName} helperText={inputErrors.lastName}/>
                      <TextField sx={{ mb: '2rem' }} className={`form_input`} id="filled-basic" label="Address" variant="filled" value={address} onChange={(e) => setAddress(e.target.value)}/>
                      <CustomTextField label={'Phone'} value={phone} onChange={(e) => setPhone(e.target.value)} onFocus={() => setInputErrors((prevErrors) => ({ ...prevErrors, phone: '' }))} onBlur={handlePhoneBlur} error={inputErrors.phone} helperText={inputErrors.phone}/>
                    </div>
                    )}
                    <CustomTextField label={'Email'} value={email} onChange={(e) => setEmail(e.target.value)} onFocus={handleEmailFocus} onBlur={handleEmailBlur} error={inputErrors.email} helperText={inputErrors.email}/>       
                    <TextField sx={{ mb: '2rem', }} type={showPassword ? 'text' : 'password'} className='form_input' id="filled-basic" label="Password" variant="filled" value={password} onChange={(e) => setPassword(e.target.value)}  onFocus={() => setInputErrors((prevErrors) => ({ ...prevErrors, password: '' }))}
                        error={Boolean(inputErrors.password)}
                        helperText={inputErrors.password}  
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end"onClick={handleClickShowPassword} sx={{ '&:focus': { outline: 'none', },}}>
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>),
                        }}/>
                    <div className='form_options'>
                        <FormControlLabel control={<Checkbox color="success" className='custom_chkbx'/>} label="Recuérdame" style={{color:'#ffffff'}}/>
                        <Link href="#" sx={{ color: '#ffffff', textDecoration: 'none', '&:hover': { color: colors.terciaryColor } }}>
                            Olvidé contraseña
                        </Link>
                    </div>

                    <Button sx={{ mt: '1.5rem', backgroundColor:colors.primaryColor}} variant="contained" disableElevation onClick={ isRegisterMode ? handleRegister: handleLogin}  disabled={hasErrors} >
                        {isRegisterMode ? 'Registrate' : 'Inicia Sesión' }
                    </Button>

                    <hr className="divider" />

                    <SocialButtonsLogin /> 
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
    </div>
  )
}

