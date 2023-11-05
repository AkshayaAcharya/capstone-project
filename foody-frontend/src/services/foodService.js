const API_URL = "http://127.0.0.1:3000/api/v1";

export const getFoods = async () => {
  const res = await fetch(`${API_URL}/foods`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting foods");

  const { data } = await res.json();
  console.log(data);
  return data;
};

export const addFood = async (newFood, token) => {
  console.log(newFood);
  try {
    const res = await fetch(`${API_URL}/foods`, {
      method: "POST",
      body: JSON.stringify(newFood),
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
    throw Error("Failed creating your food");
  }
};

export const deleteFood = async (foodId, token) => {
  try {
    const res = await fetch(`${API_URL}/foods/${foodId}`, {
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
