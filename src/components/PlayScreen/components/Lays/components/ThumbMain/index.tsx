import { IoMdPause } from "react-icons/io"
import { useAppSelector } from "../../../../../../app/hooks"
import { ISong, ISongInfo } from "../../../../../../types/item"
import { player_ } from "../../../../../../utils/player_"
import { SongImgThumbVariant } from "../../../../../Variants"
import { memo } from "react"
import { FaPlay } from "react-icons/fa"

interface IThumbMain {
  song: ISongInfo
  isLoading: boolean
}

const ThumbMain: React.FC<IThumbMain> = memo(({ isLoading, song }) => {
  const isPlaying = useAppSelector((state) => state?.player?.status?.isPlaying)

  const handleClickThumb = () => {
    player_?.toggle()
  }
  return (
    <div
      className={`flex-1 mr-4 relative h-full flex justify-center items-center `}
    >
      {isLoading ? (
        <SongImgThumbVariant />
      ) : (
        <div
          onClick={handleClickThumb}
          className="group cursor-pointer h-full w-full relative overflow-hidden flex justify-center items-center"
        >
          <img
            alt="song-thumbnail"
            src={song?.thumbnailM}
            className="w-full"
            style={{
              backdropFilter: "blur(5px)",
              filter: "blur(5px)",
            }}
          />
          <div className="transition-all absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-b from-from-body-bg-gradiant to-transparent"></div>
          <div className="absolute h-1/2">
            <img
              alt="song-thumbnail"
              src={song?.thumbnailM}
              className="h-full rounded"
            />
          </div>
          <div className="transition-all opacity-0 group-hover:opacity-100 absolute top-0 left-0 bottom-0 right-0 bg-gradient-to-b from-from-body-bg-gradiant-l1 to-transparent"></div>
          {isPlaying ? (
            <>
              <div className="control-thumb-style">
                <IoMdPause size={40} className="text-white" />
                <div
                  key={String(isPlaying)}
                  className="control-thumb-style-h animate-zomOutControlThumB"
                >
                  <FaPlay size={40} className="text-white" />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="control-thumb-style">
                <FaPlay size={40} className="text-white" />
                <div
                  key={String(isPlaying)}
                  className="control-thumb-style-h animate-zomOutControlThumB"
                >
                  <IoMdPause size={40} className="text-white" />
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
})

export default ThumbMain
