import React, { useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ResetPass() {
  const { token } = useParams();
  const [data, setdata] = useState({
    password: "",
    confirm: "",
  });
  const { password } = data;
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setdata({ ...data, [name]: value });
  };
  const resetSubmit = async (e) => {
    e.preventDefault();
    if (data.password.length < 6)
      return alert("Password must be at least 6 character");
    if (data.password !== data.confirm)
      return alert("Password and confirm does not match!");
    try {
      console.log(token);
      const result = await axios.post(
        "/user/reset",
        { password },
        { headers: { Authorization: token } }
      );
      alert(result.data.msg);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  //   useEffect(() => {
  //     if (accesstoken) {
  //       const resetPassword = async () => {
  //         try {
  //           await axios.post("/user/reset", { accesstoken });

  //         } catch (err) {
  //           return err.response.data.msg;
  //         }
  //       };
  //       resetPassword();
  //     }
  //   }, [accesstoken]);
  return (
    <div className="forgot-page">
      <div className="formfg-container">
        <form className="formfg" onSubmit={resetSubmit}>
          <h1>Forgot Account</h1>
          <div className="social-containerlg">
            <Link to="#" className="sociallg"></Link>
            <Link to="#" className="sociallg"></Link>
            <Link to="#" className="sociallg"></Link>
            <p>Following email belong to re-send password</p>
          </div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={data.password}
            onChange={onChangeInput}
          />
          <input
            type="password"
            name="confirm"
            placeholder="Confirm Password"
            required
            value={data.confirm}
            onChange={onChangeInput}
          />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
  );
}
