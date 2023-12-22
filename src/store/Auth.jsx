import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userData, setUserData] = useState("");
  const [service, setServices] = useState("");

  const storeTokenInLocal = (token) => {
    setToken(token)
    return localStorage.setItem("token", token);
  };

  const LogOutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  const isLoggedIn = !!token;

  const userAuthentication = async () => {
    try {
      const res = await axios.get("https://fullstack-backend-nwj1.onrender.com/api/auth/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const data = res.data;
        // console.log("Data form auth", data);
        setUserData(data);
      }
    } catch (error) {
      console.log("userAuthentication error", error);
    }
  };

  const ourServices = async () => {
    try {
      const res = await axios.get("https://fullstack-backend-nwj1.onrender.com/api/data/service");
      if (!res) {
        console.log("Services not Found ourservices");
      }
      setServices(res.data.response);
    } catch (error) {
      console.log("Our Services Error", error);
    }
  };

  useEffect(() => {
    userAuthentication();
    ourServices();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        storeTokenInLocal,
        LogOutUser,
        isLoggedIn,
        userData,
        service,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook for send data
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }
  return authContextValue;
};
