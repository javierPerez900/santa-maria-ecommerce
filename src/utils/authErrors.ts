export type AuthErrorContext = "login" | "register" | "confirm" | "resend";

export function authErrorName(error: unknown): string {
  if (typeof error === "object" && error !== null && "name" in error) {
    return String((error as { name: unknown }).name);
  }
  return "";
}

const COMMON_MESSAGES: Partial<Record<string, string>> = {
  NetworkError:
    "No se pudo conectar. Revisa tu conexión a internet e inténtalo de nuevo.",
  LimitExceededException:
    "Demasiados intentos. Espera unos minutos e inténtalo de nuevo.",
  TooManyRequestsException:
    "Demasiados intentos. Espera unos minutos e inténtalo de nuevo.",
  TooManyFailedAttemptsException:
    "Demasiados intentos fallidos. Espera unos minutos e inténtalo de nuevo.",
};

const CONTEXT_MESSAGES: Record<
  AuthErrorContext,
  Partial<Record<string, string>>
> = {
  login: {
    NotAuthorizedException: "Correo o contraseña incorrectos.",
    UserNotFoundException: "Correo o contraseña incorrectos.",
    UserNotConfirmedException: "Tu cuenta aún no está confirmada.",
    PasswordResetRequiredException:
      "Debes restablecer tu contraseña antes de entrar.",
    UserAlreadyAuthenticatedException:
      "Ya tienes una sesión iniciada. Cierra sesión antes de entrar con otra cuenta.",
  },
  register: {
    UsernameExistsException:
      "Ya existe una cuenta con este correo. Inicia sesión; si aún no la activaste, te llevaremos a confirmarla.",
    InvalidPasswordException:
      "La contraseña no cumple los requisitos de seguridad. Prueba con una más larga que combine mayúsculas, minúsculas, números y símbolos.",
    InvalidParameterException:
      "Los datos ingresados no son válidos. Revisa el correo y la contraseña.",
  },
  confirm: {
    CodeMismatchException:
      "El código es incorrecto. Revísalo e inténtalo de nuevo.",
    ExpiredCodeException:
      "El código expiró. Pulsa «Reenviar código de verificación» para recibir uno nuevo.",
    NotAuthorizedException:
      "Esta cuenta ya está confirmada. Puedes iniciar sesión.",
    UserNotFoundException: "No encontramos una cuenta con ese correo.",
    InvalidParameterException: "El correo o el código no son válidos.",
    UserLambdaValidationException:
      "No se pudo completar el registro. Inténtalo de nuevo más tarde.",
  },
  resend: {
    UserNotFoundException: "No encontramos una cuenta con ese correo.",
    InvalidParameterException:
      "Esta cuenta ya está confirmada. Puedes iniciar sesión.",
    CodeDeliveryFailureException:
      "No pudimos enviar el código. Inténtalo de nuevo.",
  },
};

const FALLBACK_MESSAGE =
  "Ocurrió un error inesperado. Inténtalo de nuevo en unos minutos.";

export function getAuthError(error: unknown, context: AuthErrorContext) {
  const name = authErrorName(error);
  const message = CONTEXT_MESSAGES[context][name] ?? COMMON_MESSAGES[name];

  return {
    message: message ?? FALLBACK_MESSAGE,
    unexpected: message === undefined,
  };
}
