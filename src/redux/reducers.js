import data from "../data.json";

const initialState = {
  selectedCategory: "All",
  categories: data.categories,
  cart: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SELECT_CATEGORY":
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload]: (state.cart[action.payload] || 0) + 1,
        },
      };
    case "INCREMENT_CART_ITEM":
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload]: state.cart[action.payload] + 1,
        },
      };
    case "DECREMENT_CART_ITEM":
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload]: state.cart[action.payload] - 1,
        },
      };
    case "REMOVE_CART_ITEM":
      const updatedCart = { ...state.cart };
      delete updatedCart[action.payload];
      return {
        ...state,
        cart: updatedCart,
      };
    default:
      return state;
  }
};

export default rootReducer;
