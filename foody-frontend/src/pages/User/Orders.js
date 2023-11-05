import React from "react";
import { useStateValue } from "../../utils/StateProvider";
export default function Orders() {
  const [state, dispatch] = useStateValue();
  return <div>Orders</div>;
}
