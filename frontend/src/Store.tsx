import React, { createContext, useReducer, useEffect } from 'react';
import { Cart, CartItem } from './types/Cart';

interface AppState {
  mode: 'light' | 'dark';
  cart: Cart;
}

type Action =
  | { type: 'SWITCH_MODE' }
  | { type: 'CART_ADD_ITEM'; payload: CartItem }
  | { type: 'CART_REMOVE_ITEM'; payload: CartItem };

const getInitialMode = (): 'light' | 'dark' => {
  const storedMode = localStorage.getItem('mode');
  if (storedMode === 'light' || storedMode === 'dark') return storedMode;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const initialState: AppState = {
  mode: getInitialMode(),
  cart: {
    cartItems: JSON.parse(localStorage.getItem('cartItems') || '[]'),
    shippingAddress: JSON.parse(
      localStorage.getItem('shippingAddress') || '{}'
    ),
    paymentMethod: localStorage.getItem('paymentMethod') || 'PayPal',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
};

// Reducer function
const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SWITCH_MODE': {
      const newMode = state.mode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('mode', newMode);
      return { ...state, mode: newMode };
    }
    case 'CART_ADD_ITEM': {
      const { payload } = action;
      const cartItems = state.cart.cartItems.some(
        (item) => item._id === payload._id
      )
        ? state.cart.cartItems.map((item) =>
            item._id === payload._id ? payload : item
          )
        : [...state.cart.cartItems, payload];

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
};

const Store = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('mode', state.mode);
  }, [state.mode]);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

export { Store, StoreProvider };
