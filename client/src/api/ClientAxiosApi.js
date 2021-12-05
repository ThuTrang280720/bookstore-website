import axios from "axios";
// import { GlobalState } from "../GlobalState";
// import { useContext } from "react";
// "proxy": "http://localhost:5000/"

const axiosClient = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    //Do something before request
    return config;
  },
  function (err) {
    //Do something with request error
    return Promise.reject(err);
  }
);

// const refreshToken = async () => {
//   try {
//     const firstLogin = localStorage.getItem("firstLogin");
//     if (firstLogin) {
//       const res = await axios.get("http://localhost:5000/user/refresh_token");
//       localStorage.setItem("token", res.data.accesstoken);
//       console.log(res.data.accesstoken);
//     }
//   } catch (err) {
//     console.log(err.response.data.msg);
//   }
// };

// axiosClient.interceptors.response.use(
//   function (response) {
//     console.log("OK");

//     return response;
//   },
//   async function (err) {
//     const originalConfig = err.config;
//     console.warn("Error status", err.response.status);
//     if (err.response) {
//       if (err.response.status === 401) {
//         console.log("Getting new token...");
//         refreshToken();
//         return axiosClient(originalConfig);
//       }
//     } else {
//       return Promise.reject(err);
//     }
//   }
// );

export default axiosClient;
