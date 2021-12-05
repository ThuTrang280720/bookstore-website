import React, { useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { GlobalState } from "../../GlobalState";

export default function ActivationEmail() {
  const { activationtoken } = useParams();
  const history = useHistory();
  const state = useContext(GlobalState);
  const [givenName] = state.userApi.givenName;
  const [callback, setCallback] = state.callback;
  useEffect(() => {
    if (activationtoken) {
      const activationEmail = async () => {
        try {
          const res = await axios.post("/user/activation", { activationtoken });

          localStorage.setItem("firstLogin", true);
          localStorage.setItem("token", res.data.accesstoken);
          setCallback(!callback);
          history.push("/");
          toast.success(`Hello ${givenName}.`);
        } catch (err) {
          toast.error(err.response.data.msg);
        }
      };
      activationEmail();
    }
    // eslint-disable-next-line
  }, [activationtoken]);

  return <div className="active_page"></div>;
}
