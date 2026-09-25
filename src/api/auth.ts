import {
  signUp,
  resendSignUpCode,
  confirmSignUp,
  signIn,
  getCurrentUser,
  fetchAuthSession,
  signOut,
} from "@aws-amplify/auth";

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
    await signIn({
      username: email,
      password,
    });

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
