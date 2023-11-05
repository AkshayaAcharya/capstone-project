// import statements
import React, { createContext, useReducer, useContext } from "react";
import Reducer from "./Reducer";

// State object initialization
const initialState = {
  cart: [],
  orders: [],
  restaurants: [],
  foods: [],
  currentRestaurant: {},
  currentUser: {},
  restaurantLoggedIn: false,
  userLoggedIn: false,
  newFood: false,
  loggedIn: false,
};

// Creating a state context and exporting it
export const AppContext = createContext(initialState);

// StateProvier function component
function StateProvider({ children }) {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <AppContext.Provider value={[state, dispatch]}>
      {children}
    </AppContext.Provider>
  );
}

export const useStateValue = () => useContext(AppContext);

// Exporting StateProvider component
export default StateProvider;
