import React, { useState } from "react";
import foodImg from "../../images/foods/food.jpg";
import classes from "./restaurantpage.module.css";
import { deleteFood } from "../../services/foodService";
import { getRestaurant } from "../../services/restaurantService";
import { useStateValue } from "../../utils/StateProvider";
export default function Food({ food }) {
  const [state, dispatch] = useStateValue("");
  const { restaurants, currentRestaurant } = state;
  const token = localStorage.getItem("restaurantAccessToken");
  async function handleDelete() {
    try {
      const result = await deleteFood(food._id, token);

      await getRestaurant().then(({ restaurants }) =>
        dispatch({ type: "RESTAURANT_LOADED", payload: restaurants })
      );
      const [updatedRestaurant] = restaurants.filter(
        (res) => res._id === currentRestaurant._id
      );
      console.log(updatedRestaurant);
      dispatch({ type: "CURRENT_RESTAURANT", payload: updatedRestaurant });
    } catch (err) {
      console.log(2);
      console.log(err);
    }
  }

  return (
    <div className={classes.food_item}>
      <div className={classes.food_thumbnail}>
        <img src={foodImg} alt={food.name} />
      </div>
      <div className={classes.food_desc}>
        <p className={classes.food_name}>{food.name}</p>
        <p>{food.description}</p>
        <div className={classes.food_info}>
          <p>Price: Rs. {food.price}</p>
          <p>Qunatity: {food.quantity}</p>
        </div>
        <div className={classes.ctrls}>
          <button className={classes.ctrl_btn}>Edit</button>
          <button className={classes.ctrl_btn} onClick={() => handleDelete()}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
