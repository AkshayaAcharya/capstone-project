import React, { useEffect, useState } from "react";
import foodImg from "../../images/foods/food.jpg";
import classes from "./userpage.module.css";
import { useStateValue } from "../../utils/StateProvider";
import {
  addCart,
  deleteCart,
  getCartData,
  getCarts,
} from "../../services/cartService";

export default function Food({ food }) {
  const [state, dispatch] = useStateValue();
  const { currentUser, cart, foods } = state;
  const token = localStorage.getItem("userAccessToken");
  const [qty, setQty] = useState(1);
  const [status, setStatus] = useState(false);
  const [cartId, setCartId] = useState("");

  async function handleCart() {
    const newCart = {
      name: food.name,
      totalPrice: food.price * qty,
      quantity: qty,
      food: food._id,
      user: currentUser._id,
    };
    try {
      const res = cart.find((c) => c.name === newCart.name);
      if (res) {
        setStatus(true);
        setCartId(res._id);
      }
      const { data, status } = await addCart(newCart, token);
      const id = data.cart._id;
      updateCart();
      setCartId(id);
      setStatus(true);
    } catch (err) {
      setStatus(false);
    }
  }

  function updateCart() {
    getCarts(token).then(({ carts }) =>
      dispatch({ type: "CART_DATA", payload: carts })
    );
  }

  async function handleDelete() {
    setStatus(false);
    try {
      console.log(cartId);
      const result = await deleteCart(cartId, token);
      console.log(result);
      updateCart();
    } catch (err) {
      console.log(2);
      console.log(err);
    }
  }

  useEffect(() => {
    const res = cart.find((c) => c.name === food.name);
    if (res) {
      setStatus(true);
      setCartId(res._id);
    }
  }, []);

  return (
    <div className={classes.food_item}>
      <div className={classes.food_thumbnail}>
        <img src={foodImg} alt={food.name} />
      </div>
      <div className={classes.food_desc}>
        <p className={classes.food_name}>{food.name}</p>
        <p>{food.description}</p>
        <div className={classes.food_info}>
          <p>Price: Rs. {food.price * qty}</p>
          <p>
            Qunatity:
            {!status && (
              <span
                className={classes.quantity_btn}
                onClick={() => qty > 1 && setQty((q) => q - 1)}
              >
                -
              </span>
            )}
            {qty}
            {!status && (
              <span
                className={classes.quantity_btn}
                onClick={() => qty < food.quantity && setQty((q) => q + 1)}
              >
                +
              </span>
            )}
          </p>
        </div>
        <p className={classes.restaurant_name}>{food.restaurant[0].name}</p>
        <div className={classes.ctrls}>
          {!status && (
            <button className={classes.ctrl_btn} onClick={handleCart}>
              Add to Cart
            </button>
          )}
          {status && (
            <button className={classes.ctrl_btn} onClick={handleDelete}>
              Delete Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
