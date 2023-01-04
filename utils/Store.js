import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

export const Store = createContext();

const initialState = {
  // to get value from Cookie we are searching for cart key and if it exists use JSON.parse to convert string to JS Object
  cart: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart"))
    : { cartItems: [], shippingAddress: {} },
};

function reducer(state, action) {
  switch (action.type) {
    case "CART_ADD_ITEM": {
      const newItem = action.payload;

      // checking if the same item already exists in the cart using unique key (slug) property
      const existItem = state.cart.cartItems.find(
        (product) => product.slug === newItem.slug
      );
      //only update quantity if item already exists
      const cartItems = existItem
        ? state.cart.cartItems.map((product) =>
            product.name === existItem.name ? newItem : product
          )
        : [...state.cart.cartItems, newItem]; // if item already doesn't exist  in the cart we assume it as a newItem and we are appending that newItem to the cart
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems })); //objects cannot be saved into cookie, so we need to convert into string to save them
      return { ...state, cart: { ...state.cart, cartItems } }; // now the cart state will be updated with the cartItems (resulted from line: 19)
    }
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (product) => product.slug !== action.payload.slug
      );
      Cookies.set("cart", JSON.stringify({ ...state.cart, cartItems }));
      return { ...state, cart: { ...state.cart, cartItems } }; //
    }
    case "CART_RESET": {
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: "",
        },
      };
    }
    case "SAVE_SHIPPING_ADDRESS": {
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: { ...state.cart.shippingAddress, ...action.payload },
        },
      };
    }
    default:
      return state;
  }
}

// we will import this StoreProvider to wrap our entire application in _app.js
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState); // useReducer accepts reducer function and initialState as params
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
};
