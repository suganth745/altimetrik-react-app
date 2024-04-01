import React, { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
// import { Auth0Provider } from "@auth0/auth0-react";

import SignUp from "./pages/signup";
import Login from "./pages/login";

import UserDetails from "./pages/details";
import NotFound from "./pages/not-found";

import SignOut from "./pages/signout";

import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCookies } from "./utils/cookies";
import { user_logout_thunk } from "./redux/thunk/user-thunk";

let AuthContext = React.createContext(null);

function AuthProvider({ children }) {
  let [user, setUser] = React.useState(null);

  let signin = (newUser, callback) => {
    setUser(newUser);
    callback();
  };

  let signout = (callback) => {
    setUser(null);
    callback();
  };

  let value = { user, signin, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}

function App() {
  return (
    <>
      <div className="top-loader">Loading....</div>

      <div className="whole-content">
        <BrowserRouter>
          {/* <Auth0Provider
          domain={process.env.REACT_APP_AUTH0_DOMAIN}
          clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
          redirectUri={`${window.location.origin}/accounts`}
          audience={process.env.REACT_APP_SERVER_URL}
        > */}
          {/* <AuthProvider> */}
          <Routes>
            <Route path="/signout" element={<SignOut />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Login />} />
            <Route
              path="/userDetails"
              element={
                <PrivateRoute>
                  <UserDetails />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* </AuthProvider> */}
          {/* </Auth0Provider> */}
        </BrowserRouter>
      </div>
    </>
  );
}

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  let location = useLocation();
  const { pathname } = location;

  const user = useSelector((state) => state.user);

  const token = getCookies();

  useEffect(() => {
    if (!token) {
      dispatch(user_logout_thunk());
    }
  }, [dispatch, token]);

  if (user.login) {
    if (!user.data.is_reset_password) {
      return children;
    } else {
      return children;
      // if (pathname !== "/create-password") {
      //   return <Navigate to={{ pathname: "/" }} replace />;
      // } else {
      //   return children;
      // }
    }
  } else {
    return (
      <Navigate to={{ pathname: "/" }} state={{ from: location }} replace />
    );
  }
};

export default App;
