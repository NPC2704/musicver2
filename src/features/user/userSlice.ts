import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
import {
  IPlayList,
  IPlayListArr,
  IPlayListItem,
  IUserData,
} from "../../types/item"
import getToken from "../../utils/getToken"
import getTime from "../../utils/getTime"

export interface IUserState {
  isLogin: boolean
  data?: IUserData
  playList?: IPlayList[]
  favoriteListID?: string[]
}

const initialState: IUserState = {
  isLogin: !!getToken(),
  favoriteListID: [],
  playList: [],
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLogin: (state, actions: { payload: boolean }) => {
      state.isLogin = actions.payload
    },
    setUserData: (state, actions: { payload: IUserData }) => {
      state.data = actions.payload
    },
    setFavoriteListID: (state, actions: { payload: string[] }) => {
      state.favoriteListID = actions.payload
    },
    setPlayListUser: (state, actions: { payload: IPlayList[] }) => {
      state.playList = actions.payload
    },
  },
})

export const { setIsLogin, setUserData, setFavoriteListID, setPlayListUser } =
  userSlice.actions

export default userSlice.reducer
