"use client";
import { useState, useEffect, createContext } from "react";
import { useRouter } from "next/navigation";
import { userCtrl, authCtrl } from "@/api";

interface UserType {
  userDateAdd?: string;
  userDateUpd?: string;
  userEmail?: string;
  userFirstName?: string;
  userLastName?: string;
  userStatus?: number | string;
  userUUID?: string;
  [key: string]: unknown;
}

interface AuthContextType {
  user: UserType | null;
  login: () => Promise<void>;
  isAdmin: boolean;
  logout: () => void;
  updateUser: (key: string, value: unknown) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  isAdmin: false,
  logout: () => {},
  updateUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<UserType | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const login = async () => {
    try {
      const response = await userCtrl.me();
      setUser(response);
      setIsAdmin(response.userStatus == 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await login();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const logout = () => {
    setUser(null);
    authCtrl.logout();
    router.push("/");
  };

  const updateUser = (key: string, value: unknown) => {
    setUser((prev) => {
      if (!prev) return prev;
      return { ...prev, [key]: value };
    });
  };

  const data: AuthContextType = {
    user,
    login,
    isAdmin,
    logout,
    updateUser,
  };

  if (loading) return null;

  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
}
