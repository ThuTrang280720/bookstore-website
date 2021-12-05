import { useState } from "react";

// import { GlobalState } from "../GlobalState";
function AllUsersApi(token) {
  // const state = useContext(GlobalState);
  //const [isLogged, setIsLogged] = useState(false);
  // const [isAdmin] = state.userApi.isAdmin;
  const [inforAll, setInforAll] = useState([]);
  const [callback, setCallback] = useState(false);
  // useEffect(() => {
  //   if (token) {
  //     const getAllUsers = async () => {
  //       try {
  //         const res = await axios.get("/user/all_infor", {
  //           headers: { Authorization: token },
  //         });
  //         setInforAll(res.data);
  //       } catch (err) {
  //         toast.error(err.response.data.msg);
  //       }
  //     };
  //     getAllUsers();
  //   }
  // }, [token, callback]);
  return {
    //isLogged: [isLogged, setIsLogged],
    //isAdmin: [isAdmin, setIsAdmin],
    inforAll: [inforAll, setInforAll],
    callback: [callback, setCallback],
  };
}

export default AllUsersApi;
