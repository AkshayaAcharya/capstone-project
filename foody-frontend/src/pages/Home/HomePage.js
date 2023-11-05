import { useEffect } from "react";
import { getRestaurant } from "../../services/restaurantService";
import Restaurants from "../../components/Restaurant/Restaurants";
import { useStateValue } from "../../utils/StateProvider";

import Hero from "./Hero";
import { getFoods } from "../../services/foodService";
export default function HomePage() {
  const [state, dispatch] = useStateValue();
  const { restaurants, foods } = state;
  useEffect(() => {
    getRestaurant().then(({ restaurants }) =>
      dispatch({ type: "RESTAURANT_LOADED", payload: restaurants })
    );
    getFoods().then(({ foods }) =>
      dispatch({ type: "FOODS_LOADED", payload: foods })
    );
    console.log(foods);
  }, []);
  return (
    <>
      <Hero />
      <Restaurants restaurants={restaurants} />
    </>
  );
}
