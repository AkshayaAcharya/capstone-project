import React, { useEffect, useState } from "react";
import classes from "./userpage.module.css";
import { useStateValue } from "../../utils/StateProvider";
import Cart from "./Cart";
import Details from "./Details";
import Foods from "./Foods";
import Orders from "./Orders";
import { getCarts } from "../../services/cartService";
export default function UserHome() {
  const [state, dispatch] = useStateValue();
  const { currentUser } = state;

  const [detail, setDetail] = useState(true);
  const [foods, setFoods] = useState(false);
  const [cart, setCart] = useState(false);
  const [orders, setOrders] = useState(false);
  const token = localStorage.getItem("userAccessToken");
  function handleMenu() {
    setDetail(false);
    setFoods(false);
    setCart(false);
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
  function handleCart() {
    handleMenu();
    setCart((fr) => !fr);
  }
  function handleOrders() {
    handleMenu();
    setOrders((o) => !o);
  }
  useEffect(() => {
    getCarts(token).then(({ carts }) =>
      dispatch({ type: "CART_DATA", payload: carts })
    );
  }, []);
  return (
    <div className={classes.container}>
      <h3>{currentUser.name}</h3>
      <nav className={classes.res}>
        <ul className={classes.tracker}>
          <li className={detail ? classes.active : null} onClick={handleDetail}>
            Details
          </li>
          <li className={foods ? classes.active : null} onClick={handleFoods}>
            Foods
          </li>
          <li className={cart ? classes.active : null} onClick={handleCart}>
            Cart
          </li>
          <li className={orders ? classes.active : null} onClick={handleOrders}>
            Orders
          </li>
        </ul>
      </nav>

      {detail && <Details user={currentUser} />}
      {foods && <Foods />}
      {cart && <Cart />}
      {orders && <Orders />}
    </div>
  );
}
