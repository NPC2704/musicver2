import store from "../app/store"
import { togglePlayer, togglePlayerInfo } from "../features/player/playerSlice"
import {
  IConfirmModal,
  IShareModal,
  setConfirmModal,
  setEditPlaylistModal,
  setLoginModalShow,
  setPlaylistSelect,
  setShareModal,
} from "../features/ui/uiSlice"
import { IPlayList } from "../types/item"

export const showPlayer = (value: boolean) => {
  store.dispatch(togglePlayer(value))
}

export const showPlayerInfo = (value: boolean) => {
  document.body.style.overflowY = value ? "hidden" : "scroll"

  store.dispatch(togglePlayerInfo(value))
}

interface IShowPlaylistSelect {
  callback?: (id: string) => void
  title?: string
}

export const ui = {
  showLoginModal: function () {
    store?.dispatch(setLoginModalShow(true))
  },
  hiddenLoginModal: function () {
    store?.dispatch(setLoginModalShow(false))
  },
  showPlaylistSelect: function ({ callback, title }: IShowPlaylistSelect) {
    store?.dispatch(
      setPlaylistSelect({
        isShow: true,
        callback: callback,
        title: title || "Chọn danh sách phát",
      }),
    )
  },
  hiddenPlaylistSelect: function () {
    store?.dispatch(
      setPlaylistSelect({
        isShow: false,
        callback: (id) => {},
        title: "",
      }),
    )
  },
  confirm: function ({
    callback,
    title,
    content = "",
    cancelText,
    confirmText,
  }: IConfirmModal) {
    store?.dispatch(
      setConfirmModal({
        isShow: true,
        callback: callback,
        title: title || "Xác nhận",
        content: content,
        cancelText: cancelText || "Huỷ",
        confirmText: confirmText || "Xoá",
      }),
    )
  },
  hiddenConfirmModal: function () {
    store?.dispatch(
      setConfirmModal({
        isShow: false,
        callback: () => {},
      }),
    )
    setTimeout(() => {
      store?.dispatch(
        setConfirmModal({
          isShow: false,
          callback: () => {},
          title: "",
          content: "",
          cancelText: "Huỷ",
          confirmText: "Đồng ý",
        }),
      )
    }, 1000)
  },

  share: function ({ link, type }: IShareModal) {
    store?.dispatch(
      setShareModal({
        isShow: true,
        link,
        type,
      }),
    )
  },

  hiddenShareModal: function () {
    store?.dispatch(
      setShareModal({
        isShow: false,
      }),
    )
    setTimeout(() => {
      store?.dispatch(
        setShareModal({
          link: "",
          isShow: false,
        }),
      )
    }, 1000)
  },

  editPlaylist: function ({ playlist }: { playlist: IPlayList }) {
    store?.dispatch(
      setEditPlaylistModal({
        isShow: true,
        playlist,
      }),
    )
  },

  hiddenEditPlaylist: function () {
    store?.dispatch(
      setEditPlaylistModal({
        isShow: false,
      }),
    )
  },
}

export const loginCallback = (callback: () => void | Promise<void>) => {
  const isLogin = store?.getState()?.user?.isLogin
  isLogin ? callback() : ui.showLoginModal()
}
