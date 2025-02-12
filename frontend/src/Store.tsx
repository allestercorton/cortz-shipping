import React, { createContext, useReducer, useEffect } from 'react';
import { Cart, CartItem } from './types/Cart';

interface AppState {
  mode: 'light' | 'dark';
  cart: Cart;
}

type Action =
  | { type: 'SWITCH_MODE' }
  | { type: 'CART_ADD_ITEM'; payload: CartItem };

const getInitialMode = (): 'light' | 'dark' => {
  const storedMode = localStorage.getItem('mode');
  return storedMode === 'light' || storedMode === 'dark'
    ? storedMode
    : window.matchMedia('(prefers-color-scheme: dark)').matches
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
function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SWITCH_MODE': {
      const newMode = state.mode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('mode', newMode);
      return { ...state, mode: newMode };
    }
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
}

const Store = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => {} });

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
