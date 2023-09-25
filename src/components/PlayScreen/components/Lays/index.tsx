import { useAppSelector } from "../../../../app/hooks"
import { ISongInfo } from "../../../../types/item"
import { player_ } from "../../../../utils/player_"
import { SongImgThumbVariant } from "../../../Variants"
import MainArea from "./components/MainArea"
import PlayListLays from "./components/PlayListLays"
import ThumbMain from "./components/ThumbMain"
import { memo } from "react"

interface IProps {
  song: ISongInfo
  isLoading: boolean
}

const Lays: React.FC<IProps> = memo(function Lays({ song, isLoading }) {
  const isShowInfo = useAppSelector((state) => state.player.isShoaInfo)

  return (
    <div
      className={`w-full h-full pt-6 px-14 z-10 flex justify-center ${
        isShowInfo ? "pr-[68px]" : ""
      }`}
    >
      <div className="w-full h-full max-w-7xl flex">
        <div className="w-3/5 flex">
          {isShowInfo && <ThumbMain song={song} isLoading={isLoading} />}
        </div>
        <div className="w-2/5 flex flex-col">
          <MainArea />
        </div>
      </div>
    </div>
  )
})

export default Lays
