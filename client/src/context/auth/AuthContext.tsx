import { createContext } from 'react';

type authContextType = {
  loadUser: () => Promise<void>;
  login: (formData: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  clearErrors: () => void;

  error: any | null;
  isAuthenticated: boolean | null;
  loading: boolean;
  user: any;
  token: string;
};

const authContext = createContext<authContextType>(undefined!); //TODO A more robust type is possible

export default authContext;
