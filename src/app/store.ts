import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
//slices
import userReduser from "./features/auth/userSlice";
import uiReduser from "./features/uiSlice/uiSlice";
import langReducer from "./features/Language/LanguageSlice";
import complaintsSlice from "./features/complaints/complaintsSlice";
//apis
import { userApi } from "./features/auth/userApi";
import { adsApi } from "./features/Ads/adsApi";
import { countriesApi } from "./features/address/countries/countriesApi";
import { citiesApi } from "./features/address/cities/citiesApi";
import { regionsApi } from "./features/address/regions/regionsApi";
import { complaintsApi } from "./features/complaints/complaintsApi";
import { ordersApi } from "./features/orders/ordersApi";
import { usersApi } from "./features/users/usersApi";
export const store = configureStore({
  reducer: {
    user: userReduser,
    uiSlice: uiReduser,
    language: langReducer,
    complaints: complaintsSlice,
    // user Api for auth
    [userApi.reducerPath]: userApi.reducer,
    [adsApi.reducerPath]: adsApi.reducer,
    [countriesApi.reducerPath]: countriesApi.reducer,
    [citiesApi.reducerPath]: citiesApi.reducer,
    [regionsApi.reducerPath]: regionsApi.reducer,
    [complaintsApi.reducerPath]: complaintsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      adsApi.middleware,
      countriesApi.middleware,
      citiesApi.middleware,
      regionsApi.middleware,
      complaintsApi.middleware,
      ordersApi.middleware,
      usersApi.middleware
    ), // إضافة middleware
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
