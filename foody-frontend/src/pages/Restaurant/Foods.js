import React, { useEffect } from "react";
import { useStateValue } from "../../utils/StateProvider";
import classes from "./restaurantpage.module.css";
import Food from "./Food";
import { getFoods } from "../../services/foodService";
export default function Foods() {
  const [state, dispatch] = useStateValue();
  const { restaurants, currentRestaurant } = state;
  const { foods } = currentRestaurant;
  useEffect(() => {
    getFoods().then(({ foods }) =>
      dispatch({ type: "FOODS_LOADED", payload: foods })
    );
  }, []);
  return (
    <div className={classes.food_gallery}>
      {!currentRestaurant.foods.length && <p>No foods added</p>}
      {/* <div> */}
      {foods.map((food) => (
        <Food food={food} key={food._id} />
      ))}
      {/* </div> */}
    </div>
  );
}
