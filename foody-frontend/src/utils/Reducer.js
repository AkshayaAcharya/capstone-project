function Reducer(state, action) {
  const { payload } = action;
  switch (action.type) {
    case "RESTAURANT_LOADED":
      return { ...state, restaurants: payload };
    case "RESTAURANT_LOGGEDIN":
      return { ...state, restaurantLoggedIn: payload };
    case "CURRENT_RESTAURANT":
      return { ...state, currentRestaurant: payload };
    case "USER_LOGGEDIN":
      return { ...state, userLoggedIn: payload };
    case "CURRENT_USER":
      return { ...state, currentUser: payload };
    case "LOGGED_IN":
      return { ...state, loggedIn: payload };
    case "FOODS_LOADED":
      return { ...state, foods: payload };
    case "CART_DATA":
      return { ...state, cart: payload };
    case "ORDER_DETIALS":
      return { ...state, order: payload };
    case "NEW_FOOD":
      return { ...state, newFood: payload };

    default:
      return state;
  }
}

export default Reducer;
