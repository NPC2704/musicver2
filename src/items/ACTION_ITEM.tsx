import { AiOutlineMore } from "react-icons/ai"
import {
  PiDownloadSimpleLight,
  PiHeartFill,
  PiHeartLight,
  PiListPlus,
  PiListPlusLight,
  PiPlayCircleLight,
  PiShareFatLight,
  PiTrashLight,
  PiUserLight,
} from "react-icons/pi"
import { ISong, ISongInfo } from "../types/item"
import {
  addToPlaylist,
  initData,
  likeSong,
  removeToPlaylist,
} from "../services/userServices"
import { loginCallback, ui } from "../utils/ui"
import { pushFvPlaylist, removeFvPlaylist } from "../utils/setUser"
import toast from "react-hot-toast"
import { InfoToast } from "../components/Toast"
import { BsPlayCircle } from "react-icons/bs"
import { TbUserHeart } from "react-icons/tb"
import { history } from "../_helper"
import { createArtistHref, createPlayerHref } from "../utils/createHref"
import initDataUser from "../utils/initData"
import { TfiDownload } from "react-icons/tfi"
import getSongService from "../services/getSongService"
import downloadResource from "../utils/downloadResource"

interface ISongActionCallback {
  song: ISong | ISongInfo
  isLike?: boolean
}

export const SONG_ACTION = [
  {
    id: "heart",
    icon: PiHeartLight,
    activeIcon: PiHeartFill,
    isActive: false,
    isLoginedAction: true,
    callback: function ({ song, isLike }: ISongActionCallback) {
      if (!song?.encodeId) return
      if (isLike) {
        removeFvPlaylist(song?.encodeId)
      } else {
        pushFvPlaylist(song?.encodeId)
        toast(`Đã thêm '${song?.title}' vào danh sách yêu thích`)
      }

      loginCallback(() =>
        likeSong({ ...song, is_liked: isLike ? 0 : 1 }).then((fb) => {}),
      )
    },
  },
  {
    id: "options",
    icon: AiOutlineMore,
    isActive: false,
    callback: function ({ song }: ISongActionCallback) {},
  },
]

interface ISongOptionsCallback {
  song: ISong | ISongInfo
  isLike?: boolean
  playlistId?: string
  comRef?: HTMLDivElement | null
}

export const OPTIONS_SONG = [
  {
    id: "options",
    icon: PiPlayCircleLight,
    iconSize: 24,
    title: "Bắt đầu phát",
    callback: function ({ song }: ISongOptionsCallback) {
      if (!song?.encodeId) return
      const { navigate } = history
      navigate && navigate(createPlayerHref(song?.encodeId))
    },
  },
  {
    id: "add-to-playlist",
    icon: PiListPlusLight,
    iconSize: 22,
    isLoginedAction: true,
    title: "Thêm vào danh sách phát",
    callback: function ({ song }: ISongOptionsCallback) {
      if (!song?.encodeId) return

      ui.showPlaylistSelect({
        title: "Lưu vào danh sách phát",
        callback: (id) => {
          if (!id) return
          ui.hiddenPlaylistSelect()
          addToPlaylist({ ...song, playlistId: id }).then((fb) => {
            if (fb?.result == 1) {
              toast("Đã thêm")
              initDataUser()
            } else {
              toast("Thất bại")
            }
          })
        },
      })
    },
  },
  {
    id: "options",
    icon: PiUserLight,
    iconSize: 22,
    title: "Chuyển đến trang nghệ sĩ",
    callback: function ({ song }: ISongOptionsCallback) {
      if (!song?.artists) return
      const { navigate } = history
      navigate && navigate(createArtistHref(song?.artists[0]?.alias))
    },
  },
  {
    id: "options",
    icon: TfiDownload,
    iconSize: 20,
    title: "Tải nhạc",
    callback: function ({ song }: ISongOptionsCallback) {
      if (!song?.encodeId) return

      getSongService(song?.encodeId)
        .then((fb) => {
          const mp3 = fb?.data?.data?.[128]
          if (mp3) {
            downloadResource(mp3, song?.title || `${Math.random()}`)
          } else {
            return toast.error("Tải thất bại !")
          }
        })
        .catch((error) => {
          return toast.error("Tải thất bại !")
        })
    },
  },
  {
    id: "options",
    icon: PiShareFatLight,
    iconSize: 22,
    title: "Chia sẻ",
    callback: function ({ song }: ISongOptionsCallback) {
      if (!song?.encodeId) return
      const sLink = `${window.location.protocol}//${
        window.location.host
      }${createPlayerHref(song?.encodeId)}`

      ui.share({
        link: sLink,
        type: "song",
        isShow: true,
      })
    },
  },
]

export const OPTIONS_SONG_OWNER = [
  {
    id: "options",
    icon: PiPlayCircleLight,
    iconSize: 24,
    title: "Bắt đầu phát",
    callback: function ({ song }: ISongOptionsCallback) {
      if (!song?.encodeId) return
      const { navigate } = history
      navigate && navigate(createPlayerHref(song?.encodeId))
    },
  },
  {
    id: "add-to-playlist",
    icon: PiTrashLight,
    iconSize: 22,
    isLoginedAction: true,
    title: "Xoá khỏi danh sách phát",
    callback: function ({ song, playlistId, comRef }: ISongOptionsCallback) {
      if (!song?.encodeId) return

      ui.hiddenPlaylistSelect()
      removeToPlaylist({ ...song, playlistId: playlistId }).then((fb) => {
        if (fb?.result == 1) {
          toast("Đã xoá")
          if (comRef) {
            comRef.style.display = "none"
          }
          initDataUser()
        } else {
          toast("Thất bại")
        }
      })
    },
  },
  {
    id: "options",
    icon: PiUserLight,
    iconSize: 22,
    title: "Chuyển đến trang nghệ sĩ",
    callback: function ({ song }: ISongOptionsCallback) {
      if (!song?.artists) return
      const { navigate } = history
      navigate && navigate(createArtistHref(song?.artists[0]?.alias))
    },
  },
  {
    id: "options",
    icon: TfiDownload,
    iconSize: 20,
    title: "Tải nhạc",
    callback: function ({ song }: ISongOptionsCallback) {
      if (!song?.encodeId) return

      getSongService(song?.encodeId)
        .then((fb) => {
          const mp3 = fb?.data?.data?.[128]
          if (mp3) {
            downloadResource(mp3, song?.title || `${Math.random()}`)
          } else {
            return toast.error("Tải thất bại !")
          }
        })
        .catch((error) => {
          return toast.error("Tải thất bại !")
        })
    },
  },
  {
    id: "options",
    icon: PiShareFatLight,
    iconSize: 22,
    title: "Chia sẻ",
    callback: function ({ song }: ISongOptionsCallback) {
      if (!song?.encodeId) return
      const sLink = `${window.location.protocol}//${
        window.location.host
      }${createPlayerHref(song?.encodeId)}`

      ui.share({
        link: sLink,
        type: "song",
        isShow: true,
      })
    },
  },
]
