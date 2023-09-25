import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"

export interface LoadingState {
  value: number
  status: "idle" | "loading" | "failed"
}

const initialState: LoadingState = {
  value: 0,
  status: "idle",
}

export const selectValue = (state: RootState) => state.loading.value

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    changePercentLoading: (state, actions: { payload: number }) => {
      state.value = actions.payload
    },
  },
})

export const { changePercentLoading } = loadingSlice.actions

export default loadingSlice.reducer
