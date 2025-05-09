import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./features/User/userSlice";
import uiReduser from "./features/uiSlice/uiSlice";
import langReducer from "./features/Language/LanguageSlice";
import { useDispatch, useSelector } from "react-redux";
import { userApi } from "./features/User/userApi";
export const store = configureStore({
  reducer: {
    user: userReduser,
    uiSlice: uiReduser,
    language: langReducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware), // إضافة middleware
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
