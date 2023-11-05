import React, { useState, useEffect } from "react";
import classes from "./restaurantpage.module.css";
import res from "../../images/restaurants/res.jpg";
import { useStateValue } from "../../utils/StateProvider";
import { addFood } from "../../services/foodService";
import { getRestaurant } from "../../services/restaurantService";
import Status from "./Status";

export default function FoodForm() {
  const [state, dispatch] = useStateValue("");
  const { currentRestaurant, restaurants, newFood } = state;
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  // const [placeholder, setPlaceHolder] = useState();
  const [foodStatus, setFoodStatus] = useState("");
  const [description, setDescription] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const token = localStorage.getItem("restaurantAccessToken");
    const food = {
      name,
      price,
      quantity,
      description,
      restaurant: currentRestaurant._id,
    };
    try {
      await addFood(food, token).then(({ data, status }) => {
        setFoodStatus(status);
        currentRestaurant.foods.push(data.food);
      });
    } catch (err) {
      setFoodStatus("fail");
    }
    clearFields();
  }
  function clearFields() {
    setName("");
    setPrice("");
    setQuantity("");
    setDescription("");
  }

  return (
    <>
      {foodStatus === "success" && (
        <Status notification="Food added Successfully" color="#37b24d" />
      )}
      {foodStatus === "fail" && (
        <Status notification="Failed ! Try again" color="#e03131" />
      )}
      <form
        className={`${classes.add_form__item} ${classes.modal_form}`}
        onSubmit={(e) => handleSubmit(e)}
      >
        <label>Name of Item:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Price</label>
        <input
          type="text"
          value={price}
          name="price"
          onChange={(e) => setPrice(e.target.value)}
        />
        <label>Quantity</label>
        <input
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <label>Image</label>
        {/* <input
        type="text"
        value={placeholder}
        onChange={(e) => setPlaceHolder(e.target.value)}
      /> */}
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add Food</button>
      </form>
    </>
  );
}
