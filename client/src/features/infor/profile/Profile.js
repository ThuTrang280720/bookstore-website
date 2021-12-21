import React, { useContext, useState } from "react";
import "./profile.css";
import { GlobalState } from "../../../GlobalState";
import axiosClient from "../../../api/ClientAxiosApi";
import dateFormat from "dateformat";
import { AccountCircle, PermIdentity, Settings } from "@mui/icons-material";

export default function Profile() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userApi.isLogged;
  const [infor] = state.userApi.infor;
  const [token] = state.token;

  const [user, setUser] = useState({
    name: "",
    address: "",
    phone: "",
    password: "",
    newPassword: "",
    confirmNewpass: "",
  });
  const { name, address, phone, password, newPassword, confirmNewpass } = user;
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  //update info
  const updateInfo = async (e) => {
    e.preventDefault();
    try {
      console.log(token);
      const result = await axiosClient.patch(
        "/user/update",
        {
          name: name ? name : infor.name,
          address: address ? address : infor.address,
          phone: phone ? phone : infor.phone,
        },
        {
          headers: { Authorization: token },
        }
      );
      alert(result.data.msg);
      window.location.href = "/infor";
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  //update password
  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      console.log(token);
      if (password === "" || newPassword === "" || confirmNewpass === "")
        return setUser(
          { ...user },
          alert("Require input if you want change password")
        );

      if (newPassword.length < 6)
        return setUser(
          { ...user },
          alert("New password must be least 6 character")
        );
      if (newPassword !== confirmNewpass)
        return setUser(
          { ...user },
          alert("Confirm new password does not match!")
        );

      const result = await axiosClient.patch(
        "/user/change",
        {
          password: password,
          newPassword: newPassword,
        },
        {
          headers: { Authorization: token },
        }
      );
      window.location.href = "/infor";
      alert(result.data.msg);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };
  return (
    <>
      {isLogged ? (
        <div className="user">
          <div className="userTitleContainer">
            <h1 className="userTitle">
              <Settings className="userTitleIcon" />
              My Profile
            </h1>
          </div>
          <div className="userContainer">
            <div className="userShow">
              <div className="userShowTop">
                <AccountCircle className="userShowImg" />
                <div className="userShowTopTitle">
                  <span className="userShowUsername">{infor.email}</span>
                  <span className="userShowUserTitle">{infor.name}</span>
                </div>
              </div>
              <div className="userShowBottom">
                <span className="userShowTitle">Account Detail</span>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">Name: {infor.name}</span>
                </div>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    Phone: {infor.phone}
                  </span>
                </div>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    Address: {infor.address}
                  </span>
                </div>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    Role: {infor.role === 0 ? "User Account" : "Admin Account"}
                  </span>
                </div>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    Date join: {dateFormat(infor.createdAt)}
                  </span>
                </div>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    Last update: {dateFormat(infor.updatedAt)}
                  </span>
                </div>
              </div>
            </div>

            <div className="userUpdate">
              <span className="userUpdateTitle">Edit Information</span>
              <div className="userUpdateContainer">
                <div className="userUpdateLeft">
                  <form className="userUpdateInfo" onSubmit={updateInfo}>
                    <div className="userUpdateItem">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        placeholder={infor.name}
                        value={user.name}
                        className="userUpdateInput"
                        onChange={onChangeInput}
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label>Phone</label>
                      <input
                        type="text"
                        name="phone"
                        value={user.phone}
                        placeholder={infor.phone}
                        className="userUpdateInput"
                        onChange={onChangeInput}
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label>Address</label>
                      <input
                        type="text"
                        name="address"
                        value={user.address}
                        placeholder={infor.address}
                        className="userUpdateInput"
                        onChange={onChangeInput}
                      />
                    </div>

                    <button className="userUpdateButton" type="submit">
                      Update Info
                    </button>
                  </form>
                </div>
                <div className="userUpdateRigh">
                  <form className="userUpdatePass" onSubmit={updatePassword}>
                    <div className="userUpdateItem">
                      <label>Password</label>
                      <input
                        type="password"
                        className="userUpdateInput"
                        placeholder="Password"
                        name="password"
                        value={user.password}
                        onChange={onChangeInput}
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label>New Password</label>
                      <input
                        type="password"
                        placeholder="New pass word if you want"
                        className="userUpdateInput"
                        name="newPassword"
                        value={user.newPassword}
                        onChange={onChangeInput}
                      />
                    </div>
                    <div className="userUpdateItem">
                      <label>Confirm New Password</label>
                      <input
                        type="password"
                        placeholder="Confirm new password"
                        className="userUpdateInput"
                        name="confirmNewpass"
                        value={user.confirmNewpass}
                        onChange={onChangeInput}
                      />
                    </div>
                    <div className="row">
                      <button
                        className="userUpdateButton update-password-btn"
                        type="submit"
                      >
                        Update Pass
                      </button>
                      <span className="warning">
                        * If you change password. <br />
                        Login the next time you will remember
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>You must login to access!</h1>
      )}
    </>
  );
}
