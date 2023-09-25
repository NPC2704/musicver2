import { PiPlaylistLight } from "react-icons/pi"
import { IPlayList } from "../../types/item"

interface IProps {
  data: IPlayList
}

const PlayListThumBs: React.FC<IProps> = ({ data }) => {
  return data?.thumbnailM ? (
    <div className="h-28 w-28 rounded overflow-hidden">
      <img
        className="h-full w-full rounded"
        alt="playlist-thumbnail"
        src={data?.thumbnailM}
      />
    </div>
  ) : (
    <div className="h-28 w-28 bg-white-opacity-15 rounded flex flex-wrap overflow-hidden">
      {data?.song?.items?.length ? (
        data?.song?.items?.map((song, index) => {
          return (
            index < 4 && (
              <div key={index} className="w-1/2 h-1/2">
                <img
                  src={song?.thumbnailM}
                  alt="songthumb"
                  className="w-full h-full"
                />
              </div>
            )
          )
        })
      ) : (
        <div className="flex h-full w-full justify-center items-center bg-white-opacity-15">
          <PiPlaylistLight className="text-lg text-whiteT1" />
        </div>
      )}
    </div>
  )
}

export default PlayListThumBs
