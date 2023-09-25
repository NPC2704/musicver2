import { AiOutlineMore } from "react-icons/ai"
import {
  PiHeartFill,
  PiHeartLight,
  PiListPlus,
  PiListPlusLight,
  PiPencilSimpleLineLight,
  PiPlayCircleLight,
  PiShareFatLight,
  PiTrashLight,
  PiUserLight,
} from "react-icons/pi"
import { IPlayList, ISong, ISongInfo } from "../types/item"
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
import {
  createArtistHref,
  createPlayListHref,
  createPlayerHref,
} from "../utils/createHref"
import initDataUser from "../utils/initData"
import { updatePlayListService } from "../services/createPlayListService"
import routesConfig from "../configs/routes"

interface ISongActionCallback {
  playList: IPlayList
  isLike?: boolean
}

export const PLAYLIST_ACTION = [
  {
    id: "options",
    icon: AiOutlineMore,
    isActive: false,
    isLoginedAction: true,
    callback: function ({ playList }: ISongActionCallback) {},
  },
]

interface ISongOptionsCallback {
  playList: IPlayList
  isLike?: boolean
  playlistId?: string
  comRef?: HTMLDivElement | null
}

export const OPTIONS_PLAYLIST_OWNER = [
  {
    id: "add-to-playlist",
    icon: PiTrashLight,
    iconSize: 22,
    isLoginedAction: true,
    title: "Xoá danh sách phát",
    isConfirm: true,
    callback: function ({ playList }: ISongOptionsCallback) {
      ui.confirm({
        callback: () => {
          if (!playList?.encodeId) return
          updatePlayListService({
            is_deleted: 1,
            encodeId: playList?.encodeId,
          })
            .then((fb) => {
              if (fb?.result == 1) {
                toast("Đã xoá")
                initDataUser()
                const { navigate } = history
                navigate && navigate(routesConfig?.library)
              } else {
                toast("Xoá thất bại")
              }
            })
            .catch((error) => {
              toast("Xoá thất bại")
            })
        },
        title: "Xoá danh sách phát",
        isShow: true,
        content: "Bạn có chắc chắn muốn xóa danh sách phát này không?",
      })
    },
  },
  {
    id: "options",
    icon: PiPencilSimpleLineLight,
    iconSize: 22,
    title: "Chỉnh sửa",
    isLoginedAction: false,
    callback: function ({ playList }: ISongOptionsCallback) {
      if (!playList?.encodeId) return
      ui.editPlaylist({ playlist: playList })
    },
  },
  {
    id: "options",
    icon: PiShareFatLight,
    iconSize: 22,
    title: "Chia sẻ",
    isLoginedAction: false,
    callback: function ({ playList }: ISongOptionsCallback) {
      if (!playList?.encodeId) return
      const sLink = `${window.location.protocol}//${
        window.location.host
      }${createPlayListHref(playList?.encodeId)}`

      ui.share({
        link: sLink,
        type: "song",
        isShow: true,
      })
    },
  },
]

export const OPTIONS_PLAYLIST = [
  // {
  //   id: "add-to-playlist",
  //   icon: PiTrashLight,
  //   iconSize: 22,
  //   isLoginedAction: true,
  //   title: "Xoá danh sách phát",
  //   isConfirm: true,
  //   callback: function ({ playList }: ISongOptionsCallback) {
  //     ui.confirm({
  //       callback: () => {
  //         if (!playList?.encodeId) return
  //         updatePlayListService({
  //           is_deleted: 1,
  //           encodeId: playList?.encodeId,
  //         })
  //           .then((fb) => {
  //             if (fb?.result == 1) {
  //               toast("Đã xoá")
  //               initDataUser()
  //               const { navigate } = history
  //               navigate && navigate(routesConfig?.library)
  //             } else {
  //               toast("Xoá thất bại")
  //             }
  //           })
  //           .catch((error) => {
  //             toast("Xoá thất bại")
  //           })
  //       },
  //       title: "Xoá danh sách phát",
  //       isShow: true,
  //       content: "Bạn có chắc chắn muốn xóa danh sách phát này không?",
  //     })
  //   },
  // },
  {
    id: "options",
    icon: PiShareFatLight,
    iconSize: 22,
    title: "Chia sẻ",
    isLoginedAction: false,
    callback: function ({ playList }: ISongOptionsCallback) {
      if (!playList?.encodeId) return
      const sLink = `${window.location.protocol}//${
        window.location.host
      }${createPlayListHref(playList?.encodeId)}`

      ui.share({
        link: sLink,
        type: "song",
        isShow: true,
      })
    },
  },
]
