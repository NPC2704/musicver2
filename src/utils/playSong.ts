import store from "../app/store"
import {
  setPlayListId,
  setSongId,
  setStatus,
} from "../features/player/playerSlice"
import { getSongInfoService } from "../services/getSongService"
import { player_ } from "./player_"
import { showPlayer, showPlayerInfo } from "./ui"

interface IPlaySongProps {
  id: string
  playListId?: string
}

export const playSong = ({ id = "", playListId = "" }: IPlaySongProps) => {
  showPlayer(true)
  showPlayerInfo(true)
  setSong({ id, playListId })
}

export const setSong = ({ id = "", playListId = "" }: IPlaySongProps) => {
  store.dispatch(setSongId(id))
  if (playListId == "000") {
    getSongInfoService(id).then((fb) => {
      if (fb?.result == 1) {
        const song = fb?.data?.data
        const playListId = song?.album?.encodeId

        store.dispatch(setPlayListId(playListId || ""))
      } else {
        store.dispatch(setPlayListId(""))
      }
    })
  } else
    store.dispatch(
      setPlayListId(playListId || store?.getState()?.player?.playListId),
    )
}
