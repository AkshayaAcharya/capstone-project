const API_URL = "http://127.0.0.1:3000/api/v1";

export const getRestaurant = async () => {
  const res = await fetch(`${API_URL}/restaurants`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting restaurants");

  const { data } = await res.json();
  return data;
};

export const addRestaurant = async (newRestaurant) => {
  try {
    const res = await fetch(`${API_URL}/restaurants/signup`, {
      method: "POST",
      body: JSON.stringify(newRestaurant),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { data, status } = await res.json();
    return { data, status };
  } catch (err) {
    throw Error("Failed creating your restaurant");
  }
};

export const loginRestaurant = async (restaurant) => {
  try {
    const res = await fetch(`${API_URL}/restaurants/login`, {
      method: "POST",
      body: JSON.stringify(restaurant),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { token, status, data } = await res.json();
    return { token, status, data };
  } catch (err) {
    throw Error("Failed creating your restaurant");
  }
};
