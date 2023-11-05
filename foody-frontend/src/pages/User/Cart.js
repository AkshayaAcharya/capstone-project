import React, { useState, useEffect } from "react";
import { getCartData } from "../../services/cartService";
import { useStateValue } from "../../utils/StateProvider";
import classes from "./userpage.module.css";
export default function Cart() {
  const [state, dispatch] = useStateValue();
  const { currentUser, cart } = state;
  const token = localStorage.getItem("userAccessToken");
  const [sum, setSum] = useState(0);
  useEffect(() => {
    const sumValue = cart
      .map((i) => i.totalPrice)
      .reduce((acc, price) => acc + price, 0);
    setSum(sumValue);
  });
  return (
    <div>
      <div className={classes.item_grid}>
        <p>Item Name</p>
        <p>Qunatity</p>
        <p>Price</p>
      </div>
      {cart.map((item) => (
        <div className={classes.item_grid}>
          <p>{item.name}</p>
          <p>{item.quantity}</p>
          <p>{item.totalPrice}</p>
        </div>
      ))}
      <div className={classes.total_grid}>
        <p className={classes.p1}>Grand Total</p>
        <p className={classes.p2}>
          <strong>{sum}</strong>
        </p>
      </div>
    </div>
  );
}
