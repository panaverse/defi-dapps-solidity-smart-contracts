import { theme } from "../styles/theme";

export const initialState = {
  connection: null,
  network: null,
  account: null,
  balance: null,
  currentTheme: theme.dark,
  count: 0
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'WEB3_LOADED':
      return { ...state, connection: action.payload }
    case 'WEB3_NETWORK_LOADED':
      return { ...state, network: action.payload }
    case 'WEB3_ACCOUNT_LOADED':
      return { ...state, account: action.payload }
    case 'WEB3_BALANCE_LOADED':
      return { ...state, balance: action.payload }
    case 'increment':
      return { ...state, count: state.count + 1 }
    case 'decrement':
      return { ...state, count: state.count - 1 }
    case "setTheme":
      return { ...state, currentTheme: action.value };
    case "updateTheme":
      return {
        ...state,
        currentTheme: { ...theme[state.currentTheme.id], ...action.value }
      };
    case "toggleTheme": {
      const newThemeKey = state.currentTheme.id === "dark" ? "light" : "dark";
      return { ...state, currentTheme: theme[newThemeKey] };
    }
    default:
      return state;
  }
}