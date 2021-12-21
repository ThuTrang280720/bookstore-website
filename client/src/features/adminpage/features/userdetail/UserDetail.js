import { AccountCircle, PermIdentity, Settings } from "@mui/icons-material";
import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import axiosClient from "../../../../api/ClientAxiosApi";
import { GlobalState } from "../../../../GlobalState";
import "./userdetail.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../../../../utils/loading/Loading";
import withLoading from "../../../../utils/loading/withLoading";

function UserDetail(props) {
  const params = useParams();
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [inforAll] = state.userApi.inforAll;
  const [detailUser, setDetailUser] = useState([]);
  const [callback, setCallback] = state.userApi.callback;
  const [user, setUser] = useState({
    name: "",
    phone: "",
    address: "",
    role: "",
  });
  const { name, phone, address, role } = user;

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  //Update
  const updateInfo = async (e) => {
    e.preventDefault();
    props.showLoading();
    try {
      const result = await axiosClient.patch(
        `/user/all_update/${params.id}`,
        {
          name: name ? name : detailUser.name,
          address: address ? address : detailUser.address,
          phone: phone ? phone : detailUser.phone,
          role: role ? role : detailUser.role,
        },
        {
          headers: { Authorization: token },
        }
      );
      setCallback(!callback);
      toast.success(result.data.msg);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
    props.hideLoading();
  };
  //Select detail
  useEffect(() => {
    if (params) {
      inforAll.forEach((detail) => {
        if (detail._id === params.id) {
          setDetailUser(detail);
          console.log(detail);
        }
      });
    }
  }, [params, inforAll]);
  if (detailUser.length === 0) return null;
  return (
    <>
      {inforAll.length === null && <Loading />}
      <div className="user">
        <div className="userTitleContainer">
          <h1 className="userTitle">
            <Settings className="userTitleIcon" />
            Edit User
          </h1>
          <Link to="/admin/userlist">
            <button className="userAddButton">Back</button>
          </Link>
        </div>
        <div className="userContainer">
          <div className="userShow">
            <div className="userShowTop">
              <AccountCircle className="userShowImg" />
              <div className="userShowTopTitle">
                <span className="userShowUsername">{detailUser.name}</span>
                <span className="userShowUserTitle">{detailUser.email}</span>
              </div>
            </div>
            <div className="userShowBottom">
              <span className="userShowTitle">Account Detail</span>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">
                  Name: {detailUser.name}
                </span>
              </div>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">
                  Phone: {detailUser.phone}
                </span>
              </div>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">
                  Address: {detailUser.address}
                </span>
              </div>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">
                  Role:{" "}
                  {detailUser.role === 0 ? "User Account" : "Admin Account"}
                </span>
              </div>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">
                  Date join: {detailUser.createdAt}
                </span>
              </div>
              <div className="userShowInfo">
                <PermIdentity className="userShowIcon" />
                <span className="userShowInfoTitle">
                  Last update: {detailUser.updatedAt}
                </span>
              </div>
            </div>
          </div>
          <div className="userUpdate">
            <span className="userUpdateTitle">Edit Information</span>
            <form className="userUpdateForm" onSubmit={updateInfo}>
              <div className="userUpdateLeft">
                <div className="userUpdateItem">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email can't change"
                    className="userUpdateInput"
                    disabled
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="userUpdateInput"
                    value={user.name}
                    onChange={onChangeInput}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Phone</label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    className="userUpdateInput"
                    value={user.phone}
                    onChange={onChangeInput}
                  />
                </div>
              </div>
              <div className="userUpdateRight">
                <div className="userUpdateItem">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="userUpdateInput"
                    value={user.address}
                    onChange={onChangeInput}
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Password</label>
                  <input
                    type="password"
                    placeholder="Security!"
                    className="userUpdateInput"
                    disabled
                  />
                </div>
                <div className="userUpdateItem">
                  <label>Role</label>
                  <input
                    type="text"
                    name="role"
                    placeholder="0 or 1"
                    className="userUpdateInput"
                    value={user.role}
                    onChange={onChangeInput}
                  />
                </div>
                <button className="userUpdateButton" type="submit">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default withLoading(UserDetail);
