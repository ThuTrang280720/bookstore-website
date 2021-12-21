import "./createuser.css";
import React, { useState, useContext } from "react";
import axiosClient from "../../../../api/ClientAxiosApi";
import { GlobalState } from "../../../../GlobalState";
import { AddCircle } from "@mui/icons-material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router";
import withLoading from "../../../../utils/loading/withLoading";

function CreateUser(props) {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [callback, setCallback] = state.userApi.callback;
  const history = useHistory();
  const [user, setUser] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    password: "",
    role: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const createSubmit = async (e) => {
    e.preventDefault();
    props.showLoading();
    try {
      const result = await axiosClient.post(
        "/user/create_infor",
        { ...user },
        { headers: { Authorization: token } }
      );

      history.push("/admin/userlist");
      setCallback(!callback);
      toast.success(result.data.msg);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
    props.hideLoading();
  };
  return (
    <div className="createUser">
      <h1 className="createUserTitle">
        <AddCircle className="createUserIcon" />
        Create User
      </h1>
      <form className="createUserForm" onSubmit={createSubmit}>
        <div className="createUserFormItem">
          <div className="createUserItem">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={onChangeInput}
              required
            />
          </div>
          <div className="createUserItem">
            <label>Name</label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={user.name}
              onChange={onChangeInput}
              required
            />
          </div>
          <div className="createUserItem">
            <label>Phone</label>
            <input
              type="text"
              placeholder="Phone"
              name="phone"
              value={user.phone}
              onChange={onChangeInput}
            />
          </div>
          <div className="createUserItem">
            <label>Address</label>
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={user.address}
              onChange={onChangeInput}
            />
          </div>
          <div className="createUserItem">
            <label>Role</label>
            <input
              type="text"
              placeholder="Role"
              name="role"
              value={user.role}
              onChange={onChangeInput}
              required
            />
          </div>
          <div className="createUserItem">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={onChangeInput}
              required
            />
          </div>
        </div>
        <button className="createUserButton" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}

export default withLoading(CreateUser);
