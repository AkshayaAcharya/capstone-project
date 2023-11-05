import React, { useEffect, useState } from "react";
import classes from "./restaurantpage.module.css";
import { loginRestaurant } from "../../services/restaurantService";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useStateValue } from "../../utils/StateProvider";
import Status from "./Status";
export default function LoginRestaurant() {
  const [state, dispatch] = useStateValue();
  const { restaurantLoggedIn, currentRestaurant, loggedIn } = state;
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setloginStatus] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = {
      name,
      password,
    };
    try {
      await loginRestaurant(res).then(({ token, status, data }) => {
        setloginStatus(status);
        dispatch({
          type: "RESTAURANT_LOGGEDIN",
          payload: !restaurantLoggedIn,
        });
        dispatch({
          type: "CURRENT_RESTAURANT",
          payload: data.restaurant,
        });
        dispatch({
          type: "LOGGED_IN",
          payload: !loggedIn,
        });
        localStorage.setItem("restaurantAccessToken", token);
        navigate("/restaurant");
      });
    } catch (err) {
      setloginStatus("fail");
      dispatch({
        type: "RESTAURANT_LOGGEDIN",
        payload: false,
      });
      dispatch({
        type: "CURRENT_RESTAURANT",
        payload: null,
      });
    }
  }

  return (
    <div className={classes.container}>
      {loginStatus === "success" && (
        <Status
          notification="Restaurant logged in Successfully"
          color="#37b24d"
        />
      )}
      {loginStatus === "fail" && (
        <Status notification="Login Failed! Try again" color="#e03131" />
      )}
      {!restaurantLoggedIn && (
        <>
          <form className={classes.add_form} onSubmit={handleSubmit}>
            <label>Name of restaurant</label>
            <input type="text" onChange={(e) => setName(e.target.value)} />
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>{restaurantLoggedIn ? "Logout" : "Login"}</button>
          </form>
          <p style={{ marginTop: "2rem" }}>
            Not yet Registered?{" "}
            <Link to="/restaurantSignup">Register Here</Link>
          </p>
        </>
      )}
    </div>
  );
}
