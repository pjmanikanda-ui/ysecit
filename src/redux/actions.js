export const selectCategory = (categoryName) => ({
  type: "SELECT_CATEGORY",
  payload: categoryName,
});

export const incrementCartItem = (itemName) => ({
  type: "INCREMENT_CART_ITEM",
  payload: itemName,
});

export const decrementCartItem = (itemName) => ({
  type: "DECREMENT_CART_ITEM",
  payload: itemName,
});

export const removeCartItem = (itemName) => ({
  type: "REMOVE_CART_ITEM",
  payload: itemName,
});
