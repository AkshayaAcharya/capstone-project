const API_URL = "http://127.0.0.1:3000/api/v1";

export const getCarts = async (token) => {
  const res = await fetch(`${API_URL}/carts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting cart data");

  const { data } = await res.json();
  return data;
};

export const addCart = async (newCart, token) => {
  console.log(newCart);
  try {
    const res = await fetch(`${API_URL}/carts`, {
      method: "POST",
      body: JSON.stringify(newCart),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw Error();
    const { data, status } = await res.json();
    return { data, status };
  } catch (err) {
    throw Error("Failed creating your cart");
  }
};

export const deleteCart = async (cartId, token) => {
  try {
    const res = await fetch(`${API_URL}/carts/${cartId}`, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw Error("Failed");
    const resp = await res;
    return resp;
  } catch (err) {
    throw Error(err);
  }
};
