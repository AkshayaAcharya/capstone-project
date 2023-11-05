export default function formatTime(time) {
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
