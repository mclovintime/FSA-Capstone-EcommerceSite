// const BASE_URL = "http://localhost:3000/api/"
const BASE_URL = "https://backend-dot-capstone-380221.uc.r.appspot.com/api/";

export async function getProductsById(productId) {
  try {
    const response = await fetch(`${BASE_URL}products/${productId}`);
    const result = await response.json();
    console.log(result, "result from getProductsById");
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getProducts() {
  try {
    const response = await fetch(`${BASE_URL}products`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function authUser(token) {
  try {
    const response = await fetch(`${BASE_URL}users/me`, {
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

export async function registerUser(email, username, password, setRegisterUser) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      username,
      password,
    }),
  };
  try {
    const response = await fetch(`${BASE_URL}users/register`, options);
    const result = await response.json();
    console.log(result);
    if (result.message) {
      setRegisterUser(result.message);
    }
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function loginUser(username, password, setLoginMessage) {
  console.log(username);
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
    const response = await fetch(`${BASE_URL}users/login`, options);
    const result = await response.json();
    console.log(result);

    if (result.message) {
      setLoginMessage(result.message);
    }

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getUserCart() {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await fetch(`${BASE_URL}users/mycart/cart_items`, options);
    const result = await response.json();
    console.log(result);

    // if (result.message) {
    //   setLoginMessage(result.message);
    // }

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getOrderHistory() {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const response = await fetch(`${BASE_URL}users/orderHistory`, options);
    const result = await response.json();
    console.log(result);

    if (result.message) {
      setLoginMessage(result.message);
    }

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function addProductToUserCart(productId, price, quantity) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      productId,
      price,
      quantity,
    }),
  };
  try {
    const response = await fetch(`${BASE_URL}users/mycart/cart_items`, options);
    const result = await response.json();
    console.log(result);

    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteCartItem(cartItemId) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")} `,
    },
  };
  console.log(cartItemId, "cartItemId in delete fetch call");
  const response = await fetch(
    `${BASE_URL}users/mycart/cart_items/${cartItemId}`,
    options
  );
  const result = await response.json();
  console.log(result);

  return result;
}

export async function updateProduct(
  id,
  { name, description, detailed_description, stock, image_url, price }
) {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")} `,
    },
    body: JSON.stringify({
      name: name,
      description: description,
      detailed_description: detailed_description,
      stock: stock,
      image_url: image_url,
      price: price,
    }),
  };
  try {
    const response = await fetch(`${BASE_URL}products/${id}`, options);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteProduct(id) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")} `,
    },
  };
  try {
    const response = await fetch(`${BASE_URL}products/${id}`, options);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {}
}

export async function createProduct(
  name,
  description,
  detailed_description,
  stock,
  image_url,
  price
) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      description,
      detailed_description,
      stock,
      image_url,
      price,
    }),
  };
  try {
    const response = await fetch(`${BASE_URL}products`, options);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {}
}

export async function updateQuantity(id, quantity) {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      quantity,
    }),
  };
  try {
    const response = await fetch(`${BASE_URL}cart_items/${id}`, options);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {}
}

export async function checkoutCart() {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")} `,
    },
  };
  try {
    const response = await fetch(`${BASE_URL}users/mycart/checkout`, options);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllUsers() {
  try {
    const response = await fetch(`${BASE_URL}users`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllEmails() {
  try {
    const response = await fetch("http://localhost:3000/api/users");
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function makePayment(token) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      token,
      product,
    }),
  };
  try {
    const response = await fetch(`${BASE_URL}payment`, options);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updateUser(id, { username, email, address }) {
  console.log(username, email, address);
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")} `,
    },
    body: JSON.stringify({
      username: username,
      email: email,
      address: address,
    }),
  };
  try {
    const response = await fetch(`${BASE_URL}users/me/${id}`, options);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}
