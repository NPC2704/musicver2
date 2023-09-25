import store from "../app/store"
import {
  setFavoriteListID,
  setIsLogin,
  setPlayListUser,
  setUserData,
} from "../features/user/userSlice"
import { IPlayList } from "../types/item"
import getTime from "./getTime"
import storage from "./storage"

interface ISetUSer {
  isLogin: boolean
  name: string
  email: string
  picture?: string
  token?: string
  time?: number
  id?: number
}

export const setUser = ({
  isLogin,
  name,
  email,
  picture,
  token,
  time,
  id,
}: ISetUSer) => {
  store.dispatch(setIsLogin(true))

  token && storage?.setItem("token", token)

  store.dispatch(
    setUserData({
      name,
      email,
      picture,
      time: getTime?.currUnix(),
      id,
    }),
  )
}

export const pushFvPlaylist = (encodeId: string) => {
  const arr = [...(store?.getState()?.user?.favoriteListID || [])]

  if (!arr.includes(encodeId)) {
    arr.push(encodeId)
  }

  setUserFavoriteListID(arr)
}

export const removeFvPlaylist = (encodeId: string) => {
  const arr = [...(store?.getState()?.user?.favoriteListID || [])]

  const index = arr.indexOf(encodeId)
  if (index > -1) {
    arr.splice(index, 1)
  }

  setUserFavoriteListID(arr)
}

export const setUserFavoriteListID = (list: string[]) => {
  if (typeof list == "object" && list?.length) {
    store.dispatch(setFavoriteListID(list))
  }
}

export const setPlayListfUser = (list: IPlayList[]) => {
  if (typeof list == "object" && list?.length) {
    store.dispatch(setPlayListUser(list))
  }
}
