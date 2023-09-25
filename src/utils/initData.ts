import { setPlayList } from "../features/player/playerSlice"
import { setIsLogin } from "../features/user/userSlice"
import { initData } from "../services/userServices"
import { IPlayList } from "../types/item"
import getTime from "./getTime"
import getToken from "./getToken"
import { handleLoginFalseGG, handleLoginSuccessGG } from "./login"
import { setPlayListfUser, setUser, setUserFavoriteListID } from "./setUser"
import storage from "./storage"
import { useGoogleOneTapLogin } from "@react-oauth/google"

const initDataUser = () => {
  const token = getToken()
  if (!token) {
    handleLoginFalseGG()
  }
  return initData().then((fb) => {
    if (fb?.result == 1) {
      if (fb?.data?.user?.id) {
        const favoriteList: IPlayList = fb?.data?.favoriteList || []
        const playlistUser = fb?.data?.playListData || []
        const favoriteListIDList = favoriteList?.song?.items?.map(
          (song) => song?.encodeId,
        )
        setUser({ ...fb?.data?.user, time: getTime?.currUnix() })
        favoriteListIDList?.length && setUserFavoriteListID(favoriteListIDList)
        playlistUser?.length && setPlayListfUser(playlistUser)
      } else {
        storage.remove("token")
        handleLoginFalseGG()
      }
    } else {
      setIsLogin(false)
      handleLoginFalseGG()
    }
  })
}
export default initDataUser
