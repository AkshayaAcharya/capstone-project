import classes from "./restaurant.module.css";
import res from "../../images/restaurants/res.jpg";
export default function Restaurant({ restaurant }) {
  function formatTime(time) {
    // time = time.split(":")[0] <= 12 ? `${time} AM` : `${time} PM`;
    let hh = time.split(":")[0];
    let mm = time.split(":")[1];
    let ap;
    if (hh > 12) {
      hh -= 11;
      ap = "PM";
    } else {
      ap = "AM";
    }
    time = `${hh}:${mm} ${ap}`;
    return time;
  }
  return (
    <div className={classes.card}>
      <img src={res} alt="" />
      <div className={classes.card_content}>
        <p>{restaurant.name}</p>
        <p>🏨 {restaurant.address}</p>
        <p className={classes.time}>
          <span>⌛ Open: {formatTime(restaurant.openTime)}</span>
          <span>⏳ CLosed: {formatTime(restaurant.closeTime)}</span>
        </p>
      </div>
      <button>Explore</button>
    </div>
  );
}
