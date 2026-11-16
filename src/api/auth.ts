import {
  signUp,
  resendSignUpCode,
  confirmSignUp,
  signIn,
  getCurrentUser,
  fetchAuthSession,
  signOut,
} from "@aws-amplify/auth";

function authStepError(name: string, message: string) {
  const error = new Error(message);
  error.name = name;
  return error;
}

async function register(email: string, password: string) {
  try {
    const response = await signUp({
      username: email,
      password,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

async function confirmation(email: string, code: string) {
  try {
    await confirmSignUp({
      username: email,
      confirmationCode: code,
    });
    return true;
  } catch (error) {
    throw error;
  }
}

async function resendCode(email: string) {
  try {
    await resendSignUpCode({ username: email });
  } catch (error) {
    throw error;
  }
}

async function login(email: string, password: string) {
  try {
    const { isSignedIn, nextStep } = await signIn({
      username: email,
      password,
    });

    if (!isSignedIn) {
      switch (nextStep.signInStep) {
        case "CONFIRM_SIGN_UP":
          throw authStepError(
            "UserNotConfirmedException",
            "User is not confirmed.",
          );
        case "RESET_PASSWORD":
          throw authStepError(
            "PasswordResetRequiredException",
            "Password reset required.",
          );
        default:
          throw authStepError(
            "UnsupportedSignInStep",
            `Paso de inicio de sesión no soportado: ${nextStep.signInStep}`,
          );
      }
    }

    const session = await getCurrentUser();

    return session;
  } catch (error) {
    throw error;
  }
}

async function retrieveSession() {
  try {
    const session = await fetchAuthSession();

    return session.tokens?.accessToken.toString();
  } catch (error) {
    throw error;
  }
}

async function logout() {
  try {
    await signOut();
  } catch (error) {
    throw error;
  }
}

export const authCtrl = {
  register,
  resendCode,
  confirmation,
  login,
  retrieveSession,
  logout,
};
