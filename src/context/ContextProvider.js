import React, { createContext, useContext, useEffect, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [shareBox, setShareBox] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const [blogData, setBlogData] = useState([]);

  const [userProfile, setUserProfile] = useState([]);

  const [token, setToken] = useState(undefined);

  const [search, setSearch] = useState("");

  const [subMenu, setSubMenu] = useState([]);

  useEffect(() => {
    try {
      var token = localStorage.token;
      setToken(token);
    } catch (error) {
      console.log(error);
    }
    const getBlog = async () => {
      const data = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}blog-data`
      );
      const res = await data.json();
      setBlogData(res);
      setIsLoaded(true);
    };
    getBlog();
  }, []);

  useEffect(() => {
    try {
      var token = localStorage.token;
      setToken(token);
    } catch (error) {
      console.log(error);
    }
    const getUserProfile = async () => {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}accounts/user/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUserProfile(data[0]));
    };

    if (token !== undefined) {
      getUserProfile();
    }
    // eslint-disable-next-line
  }, [token]);

  const userLogout = async () => {
    await fetch(`${process.env.REACT_APP_API_BASE_URL}accounts/logout/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.token}`,
      },
    })
      .then(() => localStorage.clear())
      .then(() => setToken(undefined));
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      value={{
        blogData,
        shareBox,
        setShareBox,
        isLoaded,
        setIsLoaded,
        userProfile,
        setUserProfile,
        userLogout,
        token,
        setToken,
        search,
        setSearch,
        subMenu,
        setSubMenu,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
