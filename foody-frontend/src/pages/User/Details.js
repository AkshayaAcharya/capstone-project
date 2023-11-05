import React from "react";
import classes from "./userpage.module.css";
import res from "../../images/restaurants/res.jpg";
import formatTime from "../../services/formatTime";
export default function Details({ user }) {
  return (
    <div className={classes.info}>
      <p>
        <strong>Name</strong>: {user.name}
      </p>
      <p>
        <strong>Email 📧</strong>: {user.email}
      </p>
      <p>
        <strong>Mobile 📱</strong>: {user.mobileNumber}
      </p>
    </div>
  );
}
