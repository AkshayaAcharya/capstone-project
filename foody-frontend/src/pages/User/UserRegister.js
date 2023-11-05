import React, { useState } from "react";
import classes from "./userpage.module.css";
import { Link } from "react-router-dom";
import { registerUser } from "../../services/userService";
// import { addRestaurant } from "../../services/restaurantService";
import Status from "../Restaurant/Status";
export default function UserRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const user = {
      name,
      email,
      password,
      passwordConfirm,
      mobileNumber,
    };

    try {
      await registerUser(user).then(({ data, status }) => {
        setRegisterStatus(status);
      });
    } catch (err) {
      setRegisterStatus("fail");
    }
    clearFields();
  }
  function clearFields() {
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setMobileNumber("");
  }

  return (
    <div className={classes.container}>
      {registerStatus === "success" && (
        <Status notification="User Registered Successfully" color="#37b24d" />
      )}
      {registerStatus === "fail" && (
        <Status notification="Registration Failed! Try again" color="#e03131" />
      )}
      <form className={classes.add_form} onSubmit={handleSubmit}>
        <label>Name of user:</label>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Name here..."
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email:</label>
        <input
          type="email"
          name="name"
          value={email}
          placeholder="Email here..."
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
        <label>Confirm Password</label>
        <input
          type="password"
          value={passwordConfirm}
          placeholder="Must match password"
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <label>Mobile Number</label>
        <input
          type="text"
          value={mobileNumber}
          placeholder="Location detail here"
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <button>Register</button>
      </form>
      <p style={{ marginTop: "2rem" }}>
        Already Registered? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
