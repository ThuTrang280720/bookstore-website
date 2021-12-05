import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { GlobalState } from "../../GlobalState";
import withLoading from "../../utils/loading/withLoading";
const MODE = {
  LOGIN: "LOGIN",
  REGISTER: "REGISTER",
};
function Login({ closeModal }) {
  const history = useHistory();
  const state = useContext(GlobalState);
  const [givenName] = state.userApi.givenName;
  const [callback, setCallback] = state.callback;
  const [user, setUser] = useState({
    email: "",
    name: "",
    password: "",
    confirm: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      document.body.classList.add("loading-data");
      const res = await axios.post("/user/login", {
        ...user,
      });
      localStorage.setItem("firstLogin", true);
      localStorage.setItem("token", res.data.accesstoken);
      setCallback(!callback);
      closeModal();
      history.push("/");
      await toast.success(`Hello ${givenName} come back.`);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
    document.body.classList.remove("loading-data");
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user.confirm === user.password) {
        const result = await axios.post("/user/register", { ...user });

        // localStorage.setItem("firstLogin", true);

        // window.location.href = "/";
        setMode(MODE.LOGIN);
        toast.success(result.data.msg);
      } else {
        toast.warn("Confirm password is not match!");
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const [mode, setMode] = useState(MODE.LOGIN);
  const ToogleClass = () => {
    if (mode === MODE.LOGIN) {
      setMode(MODE.REGISTER);
      return;
    }
    setMode(MODE.LOGIN);
  };

  //login google
  const loginGoogle = async (response) => {
    console.log(response.tokenId);
    try {
      const result = await axios.post("/user/login_google", {
        tokenId: response.tokenId,
      });

      localStorage.setItem("token", result.data.accesstoken);
      setCallback(!callback);
      history.push("/");
      toast.success(`Hello ${givenName} come back.`);
      closeModal();
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  //registerGoogle
  const registerGoogle = async (response) => {
    console.log(response.tokenId);
    try {
      const result = await axios.post("/user/register_google", {
        tokenId: response.tokenId,
      });
      setMode(MODE.LOGIN);
      toast.success(result.data.msg);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };
  //loginFacebook
  const loginFacebook = async (response) => {
    console.log(response);
    try {
      const { accessToken, userID } = response;
      const result = await axios.post("/user/login_facebook", {
        accessToken,
        userID,
      });
      localStorage.setItem("token", result.data.accesstoken);
      setCallback(!callback);
      history.push("/");
      toast.success(`Hello ${givenName} come back.`);
      closeModal();
      toast.success(result.data.msg);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const registerFacebook = async (response) => {
    console.log(response);
    try {
      const { accessToken, userID } = response;
      console.log(accessToken, userID);
      const result = await axios.post("/user/register_facebook", {
        accessToken,
        userID,
      });
      setMode(MODE.LOGIN);
      toast.success(result.data.msg);
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  return (
    <div className="login-page">
      <div
        className={`containerlg ${
          mode === MODE.REGISTER ? "right-panel-activelg" : null
        }`}
        id="container"
      >
        <div className="form-containerlg sign-up-containerlg ">
          <form className="formlg" onSubmit={registerSubmit}>
            <h1>Sign up</h1>
            <div className="social-containerlg">
              <div className="social">
                <div className="btn-google-signup">
                  <GoogleLogin
                    clientId="777528100895-q05tshbqhfjh7goc71g50gea3mnmuotj.apps.googleusercontent.com"
                    buttonText="Login with google"
                    onSuccess={registerGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>

                <div className="btn-facebook-signup">
                  <FacebookLogin
                    // appId="270618948409992"
                    appId="1176374546224175"
                    autoLoad={false}
                    fields="id,name,email,picture"
                    icon="fa-facebook"
                    callback={registerFacebook}
                  />
                </div>
              </div>
            </div>
            {/* <span>or use your email for registration</span> */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={user.email}
              onChange={onChangeInput}
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              value={user.name}
              onChange={onChangeInput}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={user.password}
              onChange={onChangeInput}
            />
            <input
              type="password"
              name="confirm"
              placeholder="Confirm"
              required
              value={user.confirm}
              onChange={onChangeInput}
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-containerlg sign-in-containerlg ">
          <form className="formlg" onSubmit={loginSubmit}>
            <h1>Sign in</h1>
            <div className="social-containerlg">
              <div className="social">
                <div className="btn-google-signup">
                  <GoogleLogin
                    clientId="777528100895-q05tshbqhfjh7goc71g50gea3mnmuotj.apps.googleusercontent.com"
                    buttonText="Login with google"
                    onSuccess={loginGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                </div>

                <div className="btn-facebook-signup">
                  <FacebookLogin
                    appId="6380483075359895"
                    autoLoad={false}
                    fields="id,name,email,picture"
                    icon="fa-facebook"
                    callback={loginFacebook}
                  />
                </div>
              </div>
            </div>
            {/* <span>or use your account</span> */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={user.email}
              onChange={onChangeInput}
            />
            <input
              type="password"
              name="password"
              required
              autoComplete="on"
              placeholder="Password"
              value={user.password}
              onChange={onChangeInput}
            />
            <Link to="/forgot">Forgot your password?</Link>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="overlay-containerlg">
          <div className="overlaylg">
            <div className="overlay-panellg overlay-leftlg">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className="ghostlg" id="signInlg" onClick={ToogleClass}>
                Sign In
              </button>
            </div>
            <div className="overlay-panellg overlay-rightlg">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghostlg" id="signUplg" onClick={ToogleClass}>
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withLoading(Login);
