"use client";
import React, { useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";
const UserContextProvider = ({ children }) => {

  // fetch dummy api 
  const [apiData, setApiData] = useState([]);
  const getApi = async () => {
    const response = await axios.get("https://dummyapi.online/api/movies");
    setApiData(response.data);
  };
  useEffect(() => {
    getApi();
  }, []);

  const [user, setUser] = useState(null);
  const [value, setValue] = useState(null);
  const [tableData, setTableData] = useState(null);
  const [resetData, setResetData] = useState();

  useEffect(() => {
    const savedUser = localStorage.getItem("users");
    const savedData = localStorage.getItem("data");
    if (savedUser && savedData) {
      setUser(JSON.parse(savedUser));
      setValue(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("users", JSON.stringify(user));
      localStorage.setItem("data", JSON.stringify(value));
    } else {
      localStorage.removeItem("users");
      localStorage.removeItem("data");
    }
  }, [user]);
  
  return (
    <UserContext.Provider
      value={{
        apiData,
        setApiData,
        value,
        setValue,
        tableData,
        setTableData,
        resetData,
        setResetData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;