import React, { useState } from "react";
import classes from "./restaurantpage.module.css";
import { useStateValue } from "../../utils/StateProvider";
import FoodForm from "./FoodForm";
import Details from "./Details";
import Foods from "./Foods";
import Orders from "./Orders";
export default function RestaurantHome() {
  const [state, dispatch] = useStateValue();
  const { currentRestaurant } = state;
  console.log(currentRestaurant);
  const [detail, setDetail] = useState(true);
  const [foods, setFoods] = useState(false);
  const [form, setForm] = useState(false);
  const [orders, setOrders] = useState(false);
  function handleMenu() {
    setDetail(false);
    setFoods(false);
    setForm(false);
    setOrders(false);
  }
  function handleDetail() {
    handleMenu();
    setDetail((d) => !d);
  }
  function handleFoods() {
    handleMenu();
    setFoods((f) => !f);
  }
  function handleForm() {
    handleMenu();
    setForm((fr) => !fr);
  }
  function handleOrders() {
    handleMenu();
    setOrders((o) => !o);
  }
  return (
    <div className={classes.container}>
      <h3>{currentRestaurant.name}</h3>
      <nav className={classes.res}>
        <ul className={classes.tracker}>
          <li className={detail ? classes.active : null} onClick={handleDetail}>
            Details
          </li>
          <li className={foods ? classes.active : null} onClick={handleFoods}>
            Foods
          </li>
          <li className={form ? classes.active : null} onClick={handleForm}>
            Add Food
          </li>
          <li className={orders ? classes.active : null} onClick={handleOrders}>
            Orders
          </li>
        </ul>
      </nav>

      {detail && <Details restaurant={currentRestaurant} />}
      {foods && <Foods />}
      {form && <FoodForm />}
      {orders && <Orders />}
    </div>
  );
}
