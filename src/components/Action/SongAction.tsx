import { ReactNode, useEffect, useRef, useState } from "react"
import {
  OPTIONS_SONG,
  OPTIONS_SONG_OWNER,
  SONG_ACTION,
} from "../../items/ACTION_ITEM"
import {
  IArtistInfo,
  IPlayList,
  IPlayListArr,
  ISong,
  ISongInfo,
} from "../../types/item"
import { CirButton } from "../Button"
import { useAppSelector } from "../../app/hooks"
import { loginCallback } from "../../utils/ui"
import { Button, Typography } from "@mui/material"
import { Popover } from "antd"
import Popup from "reactjs-popup"
import "reactjs-popup/dist/index.css"
import { PopupActions } from "reactjs-popup/dist/types"
import getSongService, {
  getSongInfoService,
} from "../../services/getSongService"
import getArtistInfoService from "../../services/artistService"
import getPlayListInfoService from "../../services/playListService"
import { popoverPosition } from "../../constant"
import { use } from "i18next"

interface IProps {
  song: ISong | ISongInfo
  isHoverShow?: boolean
  playListId?: string
  comRef?: HTMLDivElement | null
}

export const SongAction: React.FC<IProps> = ({
  song,
  isHoverShow = true,
  playListId,
  comRef,
}) => {
  const fvList = useAppSelector((state) => state?.user?.favoriteListID)
  const [useAnimate, setUseAnimate] = useState(false)
  const [isLike, setIsLike] = useState(
    fvList?.includes(song?.encodeId || "000"),
  )

  useEffect(() => {
    setIsLike(fvList?.includes(song?.encodeId || "000"))
  }, [fvList])

  return SONG_ACTION.map((item, index) => {
    const isHeart = item.id == "heart"
    const isOptions = item.id == "options"
    const isHeartLike = isLike && isHeart
    const random = Math?.random()
    const Icon = isHeartLike ? item?.activeIcon : item?.icon
    const color = isHeartLike ? "var(--heart-color)" : "#ffffff"
    const callback = item?.callback
    const cb = () => {
      !isLike && setUseAnimate(true)
      callback({ song, isLike })
      isHeart && setIsLike(!isLike)
    }
    return (
      <div
        key={index}
        className={`mr-1 ${
          isHoverShow && !isHeartLike ? "opacity-0" : ""
        } group-hover:opacity-100`}
      >
        {isHeart && (
          <CirButton
            useSAnimate
            isTransparent={true}
            onClick={() => {
              item?.isLoginedAction ? loginCallback(cb) : cb()
            }}
          >
            <div
              className={`toggle-heart ${
                isHeartLike
                  ? `${useAnimate ? "is-liked" : "is-liked-not-animate"}`
                  : ""
              }`}
            >
              <Icon color={color} />
            </div>
          </CirButton>
        )}

        {isOptions && (
          <SongOption
            comRef={comRef}
            song={song}
            playListId={playListId}
            button={
              <CirButton
                useSAnimate
                isStopPropagation={false}
                isTransparent={true}
                onClick={() => {
                  item?.isLoginedAction ? loginCallback(cb) : cb()
                }}
              >
                <Icon className="text-2xl" color={color} />
              </CirButton>
            }
          />
        )}
      </div>
    )
  })
}

interface ISongOption {
  song: ISong | ISongInfo
  button?: ReactNode
  playListId?: string
  comRef?: HTMLDivElement | null
}

const SongOption: React.FC<ISongOption> = ({
  song,
  button,
  playListId,
  comRef,
}) => {
  const ref = useRef<PopupActions>(null)
  const user = useAppSelector((state) => state?.user?.data)

  const OPTION =
    playListId?.length == 10 && user?.id == song?.userId && user?.id
      ? OPTIONS_SONG_OWNER
      : OPTIONS_SONG
  return (
    <Popup
      ref={ref}
      arrow={false}
      trigger={<div>{button}</div>}
      position={popoverPosition}
    >
      {OPTION?.map((option, index) => {
        const Icon = option?.icon

        return (
          <div
            onClick={() => {
              const cb = option?.callback
              const params = { song, playlistId: playListId || "", comRef }
              if (option?.isLoginedAction) {
                cb && loginCallback(() => cb(params))
              } else {
                cb && cb(params)
              }
              ref.current && ref.current?.close()
            }}
            key={index}
            className="h-12 hover:bg-grayL2 px-4 flex items-center cursor-pointer"
          >
            <div className="w-7 flex items-center justify-center">
              <Icon className="text-whiteT1" size={option?.iconSize} />
            </div>
            <div className="whitespace-nowrap text-sm font-semibold ml-3">
              {option?.title}
            </div>
          </div>
        )
      })}
    </Popup>
  )
}

// if (song?.encodeId) {
//   getSongInfoService(song?.encodeId)
//   getSongService(song?.encodeId)
//   song?.artists && getPlayListInfoService(song?.artists[0]?.playlistId)
//   song?.artists?.map((artist) => {
//     getPlayListInfoService(artist?.playlistId).then((fb) => {
//       if (fb?.result == 1) {
//         const song = fb?.data?.data?.song?.items?.map((s: ISong) => {
//           getSongInfoService(s?.encodeId)
//           getSongService(s?.encodeId)
//         })
//       }
//     })
//     getArtistInfoService(artist?.alias)
//     .then((fb) => {
//       const data: IArtistInfo = fb?.data?.data
//       const l =
//         data?.sections
//           ?.filter((pl) => pl?.sectionType == "playlist")
//           ?.reduce((arr: any[], item) => {
//             return [...arr, ...item?.items]
//           }, []) || []
//       l?.map((s: IPlayList) => {
//         s?.encodeId && getPlayListInfoService(s?.encodeId)
//       })
//     })
//   })
// }
