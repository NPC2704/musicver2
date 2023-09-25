import store from "../app/store"
import {
  resetAudio,
  rewindSong,
  setIsMix,
  setIsRepeat,
  setPlayList,
  setStatus,
  setVolume,
} from "../features/player/playerSlice"
import handleData from "./handleData"
import { setSong } from "./playSong"
import { history } from "../_helper"
import { createPlayerHref } from "./createHref"
import { constant } from "../constant"

export const player_ = {
  toggle: function () {
    const song = store?.getState()?.player?.songInfo

    store?.dispatch(
      setStatus({
        isPlaying: !store?.getState()?.player?.status?.isPlaying,
      }),
    )

    document.title = store?.getState()?.player?.status?.isPlaying
      ? song?.title
        ? `${song?.title} - ${song?.artistsNames}`
        : constant.appName
      : constant.appName
  },
  toggleRepeat: function () {
    store?.dispatch(setIsRepeat(!store?.getState()?.player?.status?.isRepeat))
  },
  toggleMix: function () {
    store?.dispatch(setIsMix(!store?.getState()?.player?.status?.isMix))
  },
  mix: function () {
    const playlist_ = handleData.shuffle(store?.getState()?.player?.playList)
    store?.dispatch(setPlayList(playlist_))
  },
  setVolume: function (volume: number) {
    store?.dispatch(setVolume(volume || 0))
  },
  play: function () {
    const song = store?.getState()?.player?.songInfo
    store?.dispatch(setStatus({ isPlaying: true }))
    document.title = song?.title
      ? `${song?.title} - ${song?.artistsNames}`
      : "Solfive"
  },
  pause: function () {
    store?.dispatch(setStatus({ isPlaying: false }))
    document.title = "Solfive"
  },
  rewind: function (props: { to?: number; isScroll?: boolean }) {
    store?.dispatch(rewindSong(props))
  },
  reset: function () {
    store?.dispatch(resetAudio())
  },
  replay: function () {
    this.rewind({ to: 0 })
    this.pause()
    setTimeout(() => {
      this.play()
    }, 500)
  },
  next: function () {
    const navigate = history?.navigate
    const playerState = store?.getState()?.player
    const isShowing = playerState?.isShoaInfo
    const isMix = playerState?.status?.isMix
    const playlist = playerState?.playList || []
    let nextSong
    if (isMix) {
      const currSong = playerState?.songId
      const playlistLength = playlist?.length
      let index = -1
      do {
        index = Math.round(Math.random() * (playlistLength - 1))
      } while (playlist[index]?.encodeId == currSong)

      nextSong = playlist[index]
    } else {
      const currSong = playerState?.songId
      nextSong = playlist?.find(
        (_, index) => playlist[index - 1]?.encodeId == currSong,
      )
    }

    isShowing
      ? navigate(
          createPlayerHref(
            nextSong?.encodeId || playlist[0]?.encodeId,
            store?.getState()?.player?.playListId,
          ),
        )
      : setSong({ id: nextSong?.encodeId || playlist[0]?.encodeId })
  },
  pre: function () {
    const navigate = history?.navigate
    const playerState = store?.getState()?.player
    const isShowing = playerState?.isShoaInfo
    const currSong = playerState?.songId
    const playlist = playerState?.playList || []
    const nextSong = playlist?.find(
      (_, index) => playlist[index + 1]?.encodeId == currSong,
    )

    isShowing
      ? navigate(
          createPlayerHref(
            nextSong?.encodeId || playlist[playlist?.length - 1]?.encodeId,
            store?.getState()?.player?.playListId,
          ),
        )
      : setSong({
          id: nextSong?.encodeId || playlist[playlist?.length - 1]?.encodeId,
        })
  },
  ready: function () {
    store?.dispatch(setStatus({ isLoading: false }))
  },
}
