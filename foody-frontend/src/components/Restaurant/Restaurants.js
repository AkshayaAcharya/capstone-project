import classes from "./restaurant.module.css";
import Restaurant from "./Restaurant";
import { useState } from "react";
export default function Restaurants({ restaurants }) {
  const [singleRestaurant, setSingleRestaurant] = useState(null);
  function handleRestaurant() {}
  return (
    <div className={classes.restaurant_list}>
      <div className={classes.container}>
        <h2>Restaurants</h2>
        <div className={classes.row}>
          {restaurants.map((restaurant) => (
            <Restaurant restaurant={restaurant} key={restaurant._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
