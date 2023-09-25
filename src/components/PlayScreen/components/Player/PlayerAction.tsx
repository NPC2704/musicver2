import { useAppSelector } from "../../../../app/hooks"
import { MdOutlineArrowDropDown } from "react-icons/md"
import { CirButton } from "../../../Button"
import { Slider } from "antd"
import VolumeTrack from "./parts/VolumeTrack"
import { IoVolumeHighOutline } from "react-icons/io5"
import { CiRepeat } from "react-icons/ci"
import RepeatOption from "./parts/RepeatOption"
import MixOption from "./parts/MixOption"

interface IProps {}

const PlayerAction: React.FC<IProps> = () => {
  const songId = useAppSelector((state) => state?.player?.songId)
  const isShowInfo = useAppSelector((state) => state.player.isShoaInfo)
  return (
    <div className="h-full flex items-center justify-center px-3">
      <VolumeTrack />

      <RepeatOption />

      <MixOption />

      <div className={` transition-all ${isShowInfo ? "rotate-180" : ""}`}>
        <CirButton isStopPropagation={false} isTransparent={true}>
          <MdOutlineArrowDropDown size={40} />
        </CirButton>
      </div>
    </div>
  )
}

export default PlayerAction
