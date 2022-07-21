import { createStore, combineReducers } from "redux";
import rootReducer  from "../reducers/rootReducer";
const configureStore = () => {
  const finalReducer = combineReducers({
    rootReducer: rootReducer,
  });
  const initialState = {
    rootReducer: {
      cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
    },
  };
  const store = createStore(finalReducer,initialState);
  return store;
};

export default configureStore;
