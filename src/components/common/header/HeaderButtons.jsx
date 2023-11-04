import { Button } from "../button/Button";
import { Link } from "react-router-dom";

import { useLoginForm } from '../../../utils/LoginFormContext';
import { colors } from "../../../utils/constants";

export const HeaderButtons = () => {

  const { openLoginForm } = useLoginForm(); // obtenemos la función openLoginForm desde el contexto

  const handleOpenLoginForm = () => {
    openLoginForm(); // Utiliza la función openLoginForm del contexto
  };
  
  const handleCloseLoginForm = () => {
    closeLoginForm();
  };


  return (
    <>
        <Link to="/auth/login">
            <Button label={'Iniciar Sesión'} backgroundColor={colors.backgroundColor} backgroundColorHover={colors.secondaryColor} color={colors.textColor} onClick={handleOpenLoginForm} />
        </Link>
        <Button label={'Crear Cuenta'} backgroundColor={colors.backgroundColor} backgroundColorHover={colors.secondaryColor} color={colors.textColor} onClick={handleOpenLoginForm} />
    </>
  )
}

