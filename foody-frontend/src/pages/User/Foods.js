import { React, useEffect } from "react";
import { useStateValue } from "../../utils/StateProvider";
import classes from "./userpage.module.css";
import Food from "./Food";
import { getFoods } from "../../services/foodService";
export default function Foods() {
  const [state, dispatch] = useStateValue();
  const { foods } = state;

  return (
    <div className={classes.food_gallery}>
      {!foods.length && <p>No foods available</p>}
      {foods.map((food) => (
        <Food food={food} key={food._id} />
      ))}
    </div>
  );
}
