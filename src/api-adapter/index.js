export async function getProducts() {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function authUser(token) {
  try {
    const response = await fetch("http://localhost:3000/api/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function registerUser(username, password) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  };
  try {
    const response = await fetch(
      "http://localhost:3000/api/users/register",
      options
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function loginUser(username, password) {
  console.log(username)
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  };
  try {
    const response = await fetch(
      "http://localhost:3000/api/users/login",
      options
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
