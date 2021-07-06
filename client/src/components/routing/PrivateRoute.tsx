import React, { useContext } from 'react';
import {
  Route,
  Redirect,
  RouteProps,
  RouteComponentProps,
} from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

interface PrivateRouteProps extends RouteProps {
  component:
    | React.ComponentType<RouteComponentProps<any>>
    | React.ComponentType<any>;
}

const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
