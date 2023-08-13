import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();

  const [userid, setuserid] = useState(1);

  const login = async (user) => {
    try {
      const endpoint = "http://localhost:3001/videogames/login";

      const { email, password } = user;
      const { data } = await axios(
        `${endpoint}?email=${email}&password=${password}`
      );

      const { access, userid } = data;

      setuserid(userid);
      navigate("/home");

      return { access, userid };
    } catch (error) {
      console.log(error.message);
      return { access: false, userid: null };
    }
  };

  return (
    <UserContext.Provider value={{ userid, setuserid, login }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
