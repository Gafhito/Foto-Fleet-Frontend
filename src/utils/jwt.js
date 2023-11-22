// Función para validar si un token JWT es válido
export function tokenIsValid(token) {
    if (!token) {
      return false;
    }
  
    const now = Math.floor(Date.now() / 1000); // Obtiene la hora actual en segundos
    return token.exp > now; // Comprueba si la fecha de expiración del token es posterior a la hora actual
  }