export async function getProductsById(productId) {
  try {
    const response = await fetch(`http://localhost:3000/api/products/${productId}`);
    const result = await response.json();
    console.log(result, "result from getProductsById")
    return result;
  } catch (error) {
    console.error(error);
  }
}

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

export async function registerUser(username, password, setRegisterUser) {
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
    if (result.message) {
      setRegisterUser(result.message)
    }
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function loginUser(username, password, setLoginMessage) {
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
    
    if (result.message) {
      setLoginMessage(result.message)
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
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      },
      
    };
    const response = await fetch(
      "http://localhost:3000/api/users/mycart/cart_items",
      options
    );
    const result = await response.json();
    console.log(result);
    
    if (result.message) {
      setLoginMessage(result.message)
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
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      productId,
      price,
      quantity
    }),
  };
  try {
    const response = await fetch(
      "http://localhost:3000/api/users/mycart/cart_items",
      options
    );
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
      "Authorization": `Bearer ${localStorage.getItem("token")} `
    },
  };
  console.log(cartItemId, "cartItemId in delete fetch call")
  const response = await fetch(`http://localhost:3000/api/users/mycart/cart_items/${cartItemId}`, options);
  const result = await response.json();
  console.log(result);
  return result;
}