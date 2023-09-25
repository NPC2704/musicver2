import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
import Home from "../../pages/Home"
import { ReactNode } from "react"
import { IPlayList, ISong, ISongInfo } from "../../types/item"

export interface IState {
  isShow: boolean
  isShoaInfo: boolean
  songId: string
  playListId: string
  playList: ISong[]
  playListInfo: IPlayList
  songInfo: ISongInfo
  status: {
    isPlaying: boolean
    currTime: number
    duration: number
    isLoading: boolean
    volume: number
    isRepeat: boolean
    isMix: boolean
  }
  rewindListener: {
    isScroll: boolean
    to: number
    key: number
  }
}

const initialState: IState = {
  isShow: false,
  isShoaInfo: false,
  songId: "",
  playListId: "",
  playList: [],
  playListInfo: {},
  songInfo: {},
  status: {
    isPlaying: false,
    currTime: 0,
    duration: 0,
    isLoading: false,
    volume: 0.7,
    isRepeat: false,
    isMix: false,
  },
  rewindListener: {
    isScroll: false,
    to: 0,
    key: 0,
  },
}

export const selectValue = (state: RootState) => state.loading.value

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    togglePlayer: (state, actions: { payload: boolean }) => {
      state.isShow = actions.payload
    },
    togglePlayerInfo: (state, actions: { payload: boolean }) => {
      state.isShoaInfo = actions.payload
    },
    setVolume: (state, actions: { payload: number }) => {
      state.status.volume = actions.payload
    },
    setIsRepeat: (state, actions: { payload: boolean }) => {
      state.status.isRepeat = actions.payload
    },
    setIsMix: (state, actions: { payload: boolean }) => {
      state.status.isMix = actions.payload
    },
    setSongId: (state, actions: { payload: string }) => {
      const isLoading =
        !(state?.songId == actions?.payload) || state?.status?.isLoading
      state.songId = actions.payload
      state.status.isLoading = isLoading
    },
    setPlayListId: (state, actions: { payload: string }) => {
      state.playListId = actions.payload
    },
    setPlayList: (state, actions: { payload: ISong[] }) => {
      state.playList = actions.payload
    },
    setPlayListInfo: (state, actions: { payload: IPlayList }) => {
      state.playListInfo = actions.payload
    },
    setSongInfo: (state, actions: { payload: ISongInfo }) => {
      state.songInfo = actions.payload
    },
    setStatus: (
      state,
      actions: {
        payload: {
          isPlaying?: boolean
          currTime?: number
          duration?: number
          isLoading?: boolean
        }
      },
    ) => {
      state.status = { ...state.status, ...actions.payload }
    },
    rewindSong: (
      state,
      actions: { payload: { isScroll?: boolean; to?: number } },
    ) => {
      state.rewindListener = {
        ...state.rewindListener,
        ...actions.payload,
      }
    },
    resetAudio: (state) => {
      state.rewindListener.key = Math.random()
    },
  },
})

export const {
  togglePlayer,
  togglePlayerInfo,
  setSongId,
  setStatus,
  rewindSong,
  resetAudio,
  setPlayListId,
  setPlayList,
  setVolume,
  setIsRepeat,
  setIsMix,
  setPlayListInfo,
  setSongInfo,
} = playerSlice.actions

export default playerSlice.reducer
