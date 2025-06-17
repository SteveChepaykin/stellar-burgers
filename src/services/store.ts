import {
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { burgerIngredients } from './slices/burgerIngredients';
import { burgerConstructor } from './slices/burgerConstructor';
import { feed } from './slices/feed';
import { userS } from './slices/user';
import { orders } from './slices/orders';

const rootReducer = combineReducers({
  burgerIngredients: burgerIngredients.reducer,
  burgerConstructor: burgerConstructor.reducer,
  feeds: feed.reducer,
  user: userS.reducer,
  orders: orders.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const reducer = rootReducer;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
