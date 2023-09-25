import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import loadingReducer from "../features/loading/loadingSlice"
import playerReducer from "../features/player/playerSlice"
import routesReducer from "../features/routes/routesSlice"
import uiReducer from "../features/ui/uiSlice"
import userReducer from "../features/user/userSlice"

export const store = configureStore({
  reducer: {
    loading: loadingReducer,
    player: playerReducer,
    routes: routesReducer,
    ui: uiReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
