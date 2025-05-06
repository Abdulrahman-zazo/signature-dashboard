import { configureStore } from "@reduxjs/toolkit";
import userReduser from "./features/userSlice";
import langReducer from "./features/LanguageSlice";
import { useDispatch, useSelector } from "react-redux";
export const store = configureStore({
  reducer: {
    user: userReduser,
    language: langReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
