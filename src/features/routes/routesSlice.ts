import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
import Home from "../../pages/Home"
import { ReactNode } from "react"
import { IPath } from "../../types/item"

export interface routeState {
  pay: {
    prePath: IPath
    currentPath: IPath
  }
}

const initialState: routeState = {
  pay: {
    prePath: {},
    currentPath: {},
  },
}

export const selectValue = (state: RootState) => state.loading.value

export const routesSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setRoute: (
      state,
      actions: {
        payload: {
          prePath: IPath
          currentPath: IPath
        }
      },
    ) => {
      state.pay = actions.payload
    },
  },
})

export const { setRoute } = routesSlice.actions

export default routesSlice.reducer
