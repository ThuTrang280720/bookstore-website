import axios from "axios";
import axiosClient from "./api/ClientAxiosApi";
import React, { createContext, useState, useEffect, useContext } from "react";
import CategoriesApi from "./api/CategoriesApi";
import ProductsApi from "./api/ProductsApi";
import ProductsApiAdmin from "./api/ProductsApiAdmin";
import UserApi from "./api/UserApi";
import OrdersApi from "./api/OrdersApi";

//import AllUsersApi from "./api/AllUsersApi";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const [callback, setCallback] = useState(false);
  console.log(token);

  const refreshToken = async () => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const res = await axios.get("/user/refresh_token");
      localStorage.setItem("token", res.data.accesstoken);
      setToken(localStorage.getItem("token"));
      console.log(res.data.accesstoken);
    }
  };

  useEffect(() => {
    // const firstLogin = localStorage.getItem("firstLogin");
    // if (firstLogin) refreshToken();
    //Authenticate
    setToken(localStorage.getItem("token"));
    // const refreshToken = async () => {
    //   const firstLogin = localStorage.getItem("firstLogin");
    //   if (firstLogin) {
    //     const res = await axios.get("/user/refresh_token");
    //     localStorage.setItem("token", res.data.accesstoken);
    //     setToken(localStorage.getItem("token"));
    //     console.log(res.data.accesstoken);

    //     setTimeout(() => {
    //       refreshToken();
    //     }, 28 * 60 * 1000);
    //   }
    // };
    // setTimeout(() => {
    //   refreshToken();
    // }, 28 * 60 * 1000);
  }, [callback]);

  axiosClient.interceptors.response.use(
    function (response) {
      console.log("OK");
      return response;
    },
    async function (err) {
      const originalConfig = err.config;
      console.warn("Error status", err.response.status);
      if (err.response) {
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            console.log("Getting new token...");
            await refreshToken();
            return axiosClient(originalConfig);
          } catch (_error) {
            if (_error.response && _error.response.data) {
              return Promise.reject(_error.response.data);
            }
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );

  //API
  const state = {
    token: [token, setToken],
    callback: [callback, setCallback],
    productsApi: ProductsApi(),
    productsApiAdmin: ProductsApiAdmin(token),
    categoriesApi: CategoriesApi(),
    userApi: UserApi(token),
    OrdersApi: OrdersApi(token),
    //allUsersApi: AllUsersApi(token),
  };
  ProductsApi();
  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};

const DeleteToken = () => {
  const state = useContext(GlobalState);
  const [, setToken] = state.token;
  setToken(false);
  return null;
};
export { DeleteToken };
