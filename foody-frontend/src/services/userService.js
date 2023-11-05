const API_URL = "http://127.0.0.1:3000/api/v1";

export const getusers = async () => {
  const res = await fetch(`${API_URL}/users`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error("Failed getting restaurants");

  const { data, token, status } = await res.json();
  return { data, token, status };
};

export const registerUser = async (newUser) => {
  try {
    const res = await fetch(`${API_URL}/users/signup`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const { data, status } = await res.json();
    return { data, status };
  } catch (err) {
    throw Error("Failed registration");
  }
};

export const loginUser = async (user) => {
  try {
    const res = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) throw Error();
    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    throw Error("Failed logging in!");
  }
};
