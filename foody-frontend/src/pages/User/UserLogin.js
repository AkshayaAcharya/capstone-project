import React, { useState, useEffect } from "react";
import classes from "./userpage.module.css";
import { Link } from "react-router-dom";
import { loginUser } from "../../services/userService";
import Status from "../Restaurant/Status";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../utils/StateProvider";
import { getCartData } from "../../services/cartService";
export default function UserLogin() {
  const [state, dispatch] = useStateValue();
  const { userLoggedIn, loggedIn, foods } = state;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    console.log(foods);
    e.preventDefault();
    const user = {
      email,
      password,
    };

    try {
      await loginUser(user).then(({ data, status, token }) => {
        setLoginStatus(status);
        dispatch({
          type: "USER_LOGGEDIN",
          payload: !userLoggedIn,
        });
        dispatch({
          type: "CURRENT_USER",
          payload: data.user,
        });
        dispatch({
          type: "LOGGED_IN",
          payload: !loggedIn,
        });
        localStorage.setItem("userAccessToken", token);

        // console.log(foods);
        navigate("/user");
      });
    } catch (err) {
      setLoginStatus("fail");
      dispatch({
        type: "USER_LOGGEDIN",
        payload: false,
      });
      dispatch({
        type: "CURRENT_USER",
        payload: null,
      });
    }
    clearFields();
  }
  function clearFields() {
    setEmail("");
    setPassword("");
  }

  return (
    <div className={classes.container}>
      {loginStatus === "success" && (
        <Status notification="LoggedIn Successfully" color="#37b24d" />
      )}
      {loginStatus === "fail" && (
        <Status notification="Login Failed! Try again" color="#e03131" />
      )}
      <form className={classes.add_form} onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="text"
          name="name"
          value={email}
          placeholder="Name here..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          name="password"
          placeholder="Must be strong..minimum 8 characters long"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Login</button>
      </form>
      <p style={{ marginTop: "2rem" }}>
        New User? <Link to="/signup">Register</Link>
      </p>
    </div>
  );
}
