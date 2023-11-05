import React, { useState } from "react";
import classes from "./restaurantpage.module.css";
import { Link } from "react-router-dom";
import { addRestaurant } from "../../services/restaurantService";
import Status from "./Status";
export default function RegisterRestaurant() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [address, setAddress] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [description, setDescription] = useState("");
  const [registerStatus, setRegisterStatus] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    const restaurant = {
      name,
      password,
      passwordConfirm,
      address,
      openTime,
      closeTime,
      description,
    };

    try {
      await addRestaurant(restaurant).then(({ data, status }) => {
        setRegisterStatus(status);
      });
    } catch (err) {
      setRegisterStatus("fail");
    }
    clearFields();
  }
  function clearFields() {
    setName("");
    setPassword("");
    setPasswordConfirm("");
    setAddress("");
    setOpenTime("");
    setCloseTime("");
    setDescription("");
  }

  return (
    <div className={classes.container}>
      {registerStatus === "success" && (
        <Status
          notification="Restaurant Registered Successfully"
          color="#37b24d"
        />
      )}
      {registerStatus === "fail" && (
        <Status notification="Registration Failed! Try again" color="#e03131" />
      )}
      <form className={classes.add_form} onSubmit={(e) => handleSubmit(e)}>
        <label>Name of restaurant:</label>
        <input
          type="text"
          name="name"
          value={name}
          placeholder="Name here..."
          onChange={(e) => setName(e.target.value)}
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
        <label>Address</label>
        <input
          type="text"
          value={address}
          placeholder="Location detail here"
          onChange={(e) => setAddress(e.target.value)}
        />
        <label>Oening time</label>
        <input
          type="time"
          value={openTime}
          placeholder="Opening at"
          onChange={(e) => setOpenTime(e.target.value)}
        />
        <label>Closing time</label>
        <input
          type="time"
          value={closeTime}
          placeholder="Closing at"
          onChange={(e) => setCloseTime(e.target.value)}
        />
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Register</button>
      </form>
      <p style={{ marginTop: "2rem" }}>
        Already Registered? <Link to="/restaurantLogin">Login</Link>
      </p>
    </div>
  );
}
