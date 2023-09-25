import { useAppSelector } from "../../../../app/hooks"
import { SONG_ACTION } from "../../../../items/ACTION_ITEM"
import { ISong, ISongInfo } from "../../../../types/item"
import { SongAction } from "../../../Action/SongAction"
import { CirButton } from "../../../Button"
import { SongPlayerThumbVariant } from "../../../Variants"
import { DurationSongSlider } from "./parts/DurationSong"
import { useState } from "react"

interface IProps {
  info: ISongInfo
  isLoading: boolean
}

const PlayerInfo: React.FC<IProps> = ({ info, isLoading }) => {
  return isLoading ? (
    <SongPlayerThumbVariant />
  ) : (
    <div className="h-11 flex">
      <div className="mr-3">
        <img alt="song-thumb" src={info?.thumbnailM} className="h-11" />
      </div>
      <div className="flex flex-col justify-between">
        <div className="font-bold">{info?.title}</div>
        <div className="text-whiteT1 font-semibold">{info?.artistsNames}</div>
      </div>
      <div className="ml-3 flex mr-3 text-white">
        {/* {SONG_ACTION.map((item, index) => {
          const Icon = item?.icon
          return (
            <div key={index} className="mr-1">
              <CirButton isTransparent={true}>
                <Icon className="text-2xl" />
              </CirButton>
            </div>
          )
        })} */}
        <SongAction isHoverShow={false} song={info} />
      </div>
    </div>
  )
}

export default PlayerInfo
