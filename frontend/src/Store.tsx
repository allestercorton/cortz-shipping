import React, { createContext, useReducer, useEffect } from 'react';

interface AppState {
  mode: 'light' | 'dark';
}

type Action = { type: 'SWITCH_MODE' };

// Retrieve mode from localStorage or system preference
const getInitialMode = (): 'light' | 'dark' => {
  const storedMode = localStorage.getItem('mode');
  if (storedMode === 'light' || storedMode === 'dark') return storedMode;
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const initialState: AppState = {
  mode: getInitialMode(),
};

// Reducer function
function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SWITCH_MODE': {
      const newMode = state.mode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('mode', newMode); // Persist mode in localStorage
      return { mode: newMode };
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
