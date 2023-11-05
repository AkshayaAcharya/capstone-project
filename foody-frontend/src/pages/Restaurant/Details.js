import React from "react";
import classes from "./restaurantpage.module.css";
import res from "../../images/restaurants/res.jpg";
import formatTime from "../../services/formatTime";
export default function Details({ restaurant }) {
  return (
    <div className={classes.info}>
      <div className={classes.profile}>
        <img src={res} alt="restaurant" />
      </div>
      <div className={classes.profile_time}>
        <p>⏲ Opening at: {formatTime(restaurant.openTime)}</p>
        <p>⏲ Closing at: {formatTime(restaurant.openTime)}</p>
      </div>
      <p>
        <strong>Description</strong>: {restaurant.description}
      </p>
    </div>
  );
}
