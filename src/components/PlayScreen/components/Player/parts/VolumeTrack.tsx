import { Slider } from "antd"
import { useState } from "react"
import { CirButton } from "../../../../Button"
import { IoVolumeHighOutline, IoVolumeMuteOutline } from "react-icons/io5"
import { player_ } from "../../../../../utils/player_"
import { useAppSelector } from "../../../../../app/hooks"

interface IVolumeListenner {
  audio: HTMLAudioElement | null
}

export const VolumeListenner: React.FC<IVolumeListenner> = ({ audio }) => {
  const volume = useAppSelector((state) => state.player.status.volume)

  if (audio?.src) {
    volume < 0 && volume == 0
    volume > 1 && volume == 1
    audio.volume = volume
  }
  return null
}

const VolumeTrack: React.FC = ({}) => {
  const volume = useAppSelector((state) => state.player.status.volume)

  const onChange = (value: number) => {
    player_.setVolume(value)
  }

  const handleVolumeClick = () => {
    volume ? player_.setVolume(0) : player_.setVolume(0.7)
  }

  return (
    <div
      onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
      className="group mr-3 flex justify-center items-center"
    >
      <div className="invisible flex items-center justify-center opacity-0 transition-all w-0 group-hover:volume-track-hover">
        <Slider
          style={{ margin: 0, width: "100%" }}
          trackStyle={{ backgroundColor: "white", height: 3 }}
          railStyle={{ backgroundColor: "#515151", height: 3 }}
          defaultValue={0}
          step={0.1}
          value={volume}
          onChange={onChange}
          max={1}
          tooltip={{
            open: false,
          }}
        />
      </div>
      <div className="">
        <CirButton isTransparent={true} onClick={handleVolumeClick}>
          {volume ? (
            <IoVolumeHighOutline size={25} className="text-whiteT1" />
          ) : (
            <IoVolumeMuteOutline size={25} className="text-whiteT1" />
          )}
        </CirButton>
      </div>
    </div>
  )
}

export default VolumeTrack
