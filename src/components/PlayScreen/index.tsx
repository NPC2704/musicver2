import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { showPlayerInfo } from "../../utils/ui"
import { createPlayerHref } from "../../utils/createHref"
import React, { useEffect, useState, memo, ReactNode } from "react"
import getSongService, {
  getSongInfoService,
} from "../../services/getSongService"
import PlayerInfo from "./components/Player/PlayerInfo"
import { ISongInfo } from "../../types/item"
import PlayerControl from "./components/Player/PlayerControl"
import PlayerAction from "./components/Player/PlayerAction"
import { DurationSongSlider } from "./components/Player/parts/DurationSong"
import { player_ } from "../../utils/player_"
import Lays from "./components/Lays"
import usePlaylistFw from "../../hooks/usePlaylistFw"
import { setSongInfo } from "../../features/player/playerSlice"
import store from "../../app/store"
import setMediaSession from "../../utils/setMediaSession"

interface IProps {}

export const PlayScreen: React.FC<IProps> = memo(() => {
  const navigate = useNavigate()
  const dispath = useAppDispatch()
  usePlaylistFw()
  const isShowInfo = useAppSelector((state) => state.player.isShoaInfo)
  const isShow = useAppSelector((state) => state.player.isShow)
  const songId = useAppSelector((state) => state.player.songId)
  const route = useAppSelector((state) => state.routes.pay)
  const isSidebarExpand = useAppSelector((state) => state.ui.sidebarExpand)

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [song, setSong] = useState<ISongInfo>({})

  const handleToggleShowInfo = () => {
    isShowInfo
      ? navigate(
          route?.currentPath?.pathname
            ? `${route?.currentPath?.pathname}` + `${route.currentPath.search}`
            : "/",
        )
      : navigate(
          createPlayerHref(songId, store?.getState()?.player?.playListId),
        )
  }

  useEffect(() => {
    if (!songId) return
    player_.reset()
    setIsLoading(true)
    getSongInfoService(songId)
      .then((fb) => {
        if (fb?.result == 1) {
          const song: ISongInfo = fb?.data?.data
          setSong(song)
          dispath(setSongInfo(song))
          document.title = store?.getState()?.player?.status?.isPlaying
            ? song?.title
              ? `${song?.title} - ${song?.artistsNames}`
              : "Solfive"
            : "Solfive"

          setMediaSession({
            artist: song?.artistsNames,
            title: song?.title || "Solfive",
            thumb: song?.thumbnailM,
          })
        } else {
        }
        setIsLoading(false)
      })
      .catch((error) => {
        setIsLoading(false)
      })
  }, [songId])

  return (
    isShow && (
      <>
        <div
          className={`transition-top duration-300 fixed z-40 ${
            isShowInfo ? "top-header" : "top-[100vh]"
          } ${
            isSidebarExpand
              ? "left-sidebar-width-expand"
              : "left-sidebar-width-narrow"
          } right-0 bottom-playcard bg-black flex justify-center`}
        >
          <Lays song={song} isLoading={isLoading} />
        </div>

        <div
          onClick={handleToggleShowInfo}
          className={` animate__animated animate__slideInUp h-playcard fixed z-40 bg-grayL bottom-0 left-0 right-0  ${
            isShowInfo ? "pr-[12px]" : ""
          }`}
        >
          <div className="flex justify-center items-center relative h-full">
            <div className="absolute left-0 top-0 bottom-0">
              <PlayerControl />
            </div>
            <div>
              <PlayerInfo info={song} isLoading={isLoading} />
            </div>
            <div className={`absolute right-0 top-0 bottom-0`}>
              <PlayerAction />
            </div>
            <div
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                e.stopPropagation()
              }
              className="absolute top-0 right-0 left-0"
            >
              <DurationSongSlider key={songId} />
            </div>
          </div>
        </div>
      </>
    )
  )
})
