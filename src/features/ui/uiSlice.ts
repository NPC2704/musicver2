import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
import { IPlayList } from "../../types/item"

interface IPlaylistSelect {
  isShow: boolean
  callback?: (id: string) => void
  title: string
}

export interface IConfirmModal {
  isShow: boolean
  callback?: () => void
  title?: string
  content?: string
  cancelText?: string
  confirmText?: string
}

export interface IShareModal {
  isShow: boolean
  type?: string
  link?: string
}

export interface IUiState {
  sidebarExpand: boolean
  isLoginModalShow: boolean
  playlistSelect: IPlaylistSelect
  confirmModal: IConfirmModal
  shareModal: IShareModal
  editPlaylistModal: {
    isShow: boolean
    playlist: IPlayList
  }
}

const initialState: IUiState = {
  sidebarExpand: true,
  isLoginModalShow: false,
  playlistSelect: {
    isShow: false,
    title: "",
  },
  confirmModal: {
    isShow: false,
    title: "",
    content: "",
    cancelText: "Huỷ",
    confirmText: "Đồng ý",
  },

  editPlaylistModal: {
    isShow: false,
    playlist: {},
  },

  shareModal: {
    isShow: false,
    type: "",
    link: "",
  },
}

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    toggleSidebar: (state, actions: { payload: boolean }) => {
      state.sidebarExpand = actions.payload
    },
    setLoginModalShow: (state, actions: { payload: boolean }) => {
      state.isLoginModalShow = actions.payload
    },
    setPlaylistSelect: (state, actions: { payload: IPlaylistSelect }) => {
      state.playlistSelect = { ...actions.payload }
    },
    setConfirmModal: (state, actions: { payload: IConfirmModal }) => {
      state.confirmModal = { ...state.confirmModal, ...actions.payload }
    },

    setShareModal: (state, actions: { payload: IShareModal }) => {
      state.shareModal = { ...state.shareModal, ...actions.payload }
    },

    setEditPlaylistModal: (
      state,
      actions: {
        payload: {
          isShow: boolean
          playlist?: IPlayList
        }
      },
    ) => {
      state.editPlaylistModal = {
        ...state.editPlaylistModal,
        ...actions.payload,
      }
    },
  },
})

export const {
  toggleSidebar,
  setLoginModalShow,
  setPlaylistSelect,
  setConfirmModal,
  setShareModal,
  setEditPlaylistModal,
} = loadingSlice.actions

export default loadingSlice.reducer
