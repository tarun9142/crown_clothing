import { createContext, useReducer } from "react";

const addCartItem = (cartItems, productToAdd) => {
  const ItemAlreadyExists = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  if (ItemAlreadyExists) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const ItemAlreadyExists = cartItems.find(
    (item) => item.id === cartItemToRemove.id
  );

  if (ItemAlreadyExists.quantity === 1) {
    return cartItems.filter((item) => item.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const deleteCartItem = (cartItems, cartItemToDelete) => {
  const ItemAlreadyExists = cartItems.find(
    (item) => item.id === cartItemToDelete.id
  );

  if (ItemAlreadyExists) {
    return cartItems.filter((item) => item.id !== cartItemToDelete.id);
  }
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0 
});


const CART_ACTION_TYPES = {
  SET_ISCART_OPEN: "SET_ISCART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS"
}
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0 
}



const cartReducer = (state, action)=>{
  const {type, payload} = action;

  switch(type){
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return{
        ...state,
        ...payload
      }
    case CART_ACTION_TYPES.SET_ISCART_OPEN:
      return{
        ...state,
        isCartOpen:payload
      }
    default:
      throw new Error(`Unhandled type ${type} in userReducer`)
  }
}

export const CartProvider = ({ children }) => {
  const [{cartItems, cartCount, cartTotal, isCartOpen}, dispatch] = useReducer(cartReducer,INITIAL_STATE);
  const updateCartItems = (newCartItems)=>{
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    dispatch({
      type: CART_ACTION_TYPES.SET_CART_ITEMS,
      payload : {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal
      }
    });
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItems(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItems(newCartItems);
  };

  const deleteItemFromCart = (cartItemToDelete) => {
    const newCartItems = deleteCartItem(cartItems, cartItemToDelete);
    updateCartItems(newCartItems);
  };

  const setIsCartOpen = (bool)=>{
    dispatch({
      type: CART_ACTION_TYPES.SET_ISCART_OPEN,
      payload:bool
  })
  }
  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
    cartItems,
    cartCount,
    cartTotal
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
