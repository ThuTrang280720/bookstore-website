import React from "react";
import SideBar from "./sidebar/SideBar";
import Profile from "./profile/Profile";
import Order from "./order/Order";

import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import "./infor.css";
import OrderDetail from "./orderDetail/OrderDetail";

function Infor() {
  // const state = useContext(GlobalState);
  // const [isLogged] = state.userApi.isLogged;
  // const [infor] = state.userApi.infor;
  // const [token] = state.token;

  // const [user, setUser] = useState({
  //   name: "",
  //   address: "",
  //   phone: "",
  //   password: "",
  //   newPassword: "",
  //   confirmNewpass: "",
  // });
  // const { name, address, phone, password, newPassword, confirmNewpass } = user;
  // const onChangeInput = (e) => {
  //   const { name, value } = e.target;
  //   setUser({ ...user, [name]: value });
  // };

  // //update info
  // const updateInfo = async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log(token);
  //     const result = await axios.patch(
  //       "/user/update",
  //       {
  //         name: name ? name : infor.name,
  //         address: address ? address : infor.address,
  //         phone: phone ? phone : infor.phone,
  //       },
  //       {
  //         headers: { Authorization: token },
  //       }
  //     );
  //     alert(result.data.msg);
  //     window.location.href = "/infor";
  //   } catch (err) {
  //     alert(err.response.data.msg);
  //   }
  // };

  // //update password
  // const updatePassword = async (e) => {
  //   e.preventDefault();
  //   try {
  //     console.log(token);
  //     if (password === "" || newPassword === "" || confirmNewpass === "")
  //       return setUser(
  //         { ...user },
  //         alert("Require input if you want change password")
  //       );

  //     if (newPassword.length < 6)
  //       return setUser(
  //         { ...user },
  //         alert("New password must be least 6 character")
  //       );
  //     if (newPassword !== confirmNewpass)
  //       return setUser(
  //         { ...user },
  //         alert("Confirm new password does not match!")
  //       );

  //     const result = await axios.patch(
  //       "/user/change",
  //       {
  //         password: password,
  //         newPassword: newPassword,
  //       },
  //       {
  //         headers: { Authorization: token },
  //       }
  //     );
  //     window.location.href = "/infor";
  //     alert(result.data.msg);
  //   } catch (err) {
  //     alert(err.response.data.msg);
  //   }
  // };
  return (
    <>
      <Router>
        <div className="container_infor">
          <SideBar />
          <div className="page_infor">
            <Switch>
              <Route path="/infor" exact component={Profile} />
              <Route path="/order" exact component={Order} />
              <Route path="/order/:id" exact component={OrderDetail} />
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}

export default Infor;
