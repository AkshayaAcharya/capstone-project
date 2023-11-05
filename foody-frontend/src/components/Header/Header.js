import { Link } from "react-router-dom";
import classes from "./header.module.css";
import { useStateValue } from "../../utils/StateProvider";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const [state, dispatch] = useStateValue();
  const {
    restaurantLoggedIn,
    currentRestaurant,
    userLoggedIn,
    currentUser,
    loggedIn,
  } = state;
  console.log(state);
  const navigate = useNavigate();
  function handleLogoutRestaurant() {
    dispatch({
      type: "RESTAURANT_LOGGEDIN",
      payload: false,
    });
    dispatch({
      type: "CURRENT_RESTAURANT",
      payload: null,
    });
    localStorage.removeItem("restaurantAccessToken");
    navigate("/");
  }
  function handleLogoutUser() {
    dispatch({
      type: "USER_LOGGEDIN",
      payload: false,
    });
    dispatch({
      type: "CURRENT_USER",
      payload: null,
    });
    dispatch({
      type: "CART_DATA",
      payload: [],
    });
    dispatch({
      type: "ORDER_DETIALS",
      payload: [],
    });
    localStorage.removeItem("userAccessToken");
    navigate("/");
  }
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <Link to="/" className={classes.logo}>
          Food Express
        </Link>
        <nav>
          <ul>
            {restaurantLoggedIn ? (
              <li>
                <Link to="/restaurant">{currentRestaurant.name}</Link>
              </li>
            ) : userLoggedIn ? (
              <li>
                <Link to="/user">{currentUser.name}</Link>
              </li>
            ) : (
              <li>
                <Link to="/restaurants">Add Restaurant</Link>
              </li>
            )}
            {restaurantLoggedIn ? (
              <li onClick={handleLogoutRestaurant} className={classes.logout}>
                Logout
              </li>
            ) : userLoggedIn ? (
              <li onClick={handleLogoutUser} className={classes.logout}>
                Logout
              </li>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}

            {/* {!loggedIn? (
              <>
                <li>
                  <Link to="/restaurants">Add Restaurant</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </>
            ) : (
              { restaurantLoggedIn}  && (
                <>
                  <li>
                    <Link to="/restaurant">{currentRestaurant.name}</Link>
                  </li>
                  <li
                    onClick={handleLogoutRestaurant}
                    className={classes.logout}
                  >
                    Logout
                  </li>
                </>
              )
            )
            : ( {userLoggedIn} && (<>
              <li>
                <Link to="/user">{currentUser.name}</Link>
              </li>
              <li onClick={handleLogoutUser} className={classes.logout}>
                Logout
              </li>
            </>)
            
            ) */}
          </ul>
        </nav>
      </div>
    </header>
  );
}
