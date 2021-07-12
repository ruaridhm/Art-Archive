import { createContext } from 'react';
import { AuthStateInterface } from './AuthReducer';

// type authContextType = {
// loadUser: () => Promise<void>;
// login: (formData: { email: string; password: string }) => Promise<void>;
// logout: () => void;
// clearErrors: () => void;

//   error: any | null;
//   isAuthenticated: boolean | null;
//   loading: boolean;
//   user: {
//     name: string;
//     id: string;
//   } | null;
//   token: string;
// };

const initialState: AuthStateInterface = {
  error: null,
  isAuthenticated: false,
  loading: true,
  user: null,
  token: '',
  loadUser: null,
  login: null,
  logout: null,
  clearErrors: null,
};

const authContext = createContext(initialState); //TODO A more robust type is possible

export default authContext;
