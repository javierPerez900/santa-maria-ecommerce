import { authCtrl } from "@/api";

export async function authFetch(
  url: string,
  params: RequestInit = {},
): Promise<Response> {
  const token = await authCtrl.retrieveSession();

  if (!token) {
    await authCtrl.logout();
    throw new Error("No hay sesión activa");
  } else {
    const paramsTemp = {
      ...params,
      headers: {
        ...params?.headers,
        Authorization: token,
      },
    };

    try {
      return await fetch(url, paramsTemp);
    } catch (error) {
      throw error;
    }
  }
}
