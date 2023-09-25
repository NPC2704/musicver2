import { useCallback } from "react"
import { Link } from "react-router-dom"
import { createPlayListHref } from "../../../../../utils/createHref"
import { IArtists, IPlayList, ISong } from "../../../../../types/item"
import Artists from "../../../../../components/Artists"
import PlayListThumBs from "../../../../../components/PlayListThumBs"
import { getPerPlaylist } from "../../../../../utils/getString"
import { PlayListAction } from "../../../../../components/Action/PlayListAction"

interface IProps {
  item: IPlayList
}

const PlayListItem: React.FC<IProps> = ({ item }) => {
  const href = createPlayListHref(item?.encodeId || "")

  if (!item?.encodeId) return null

  return (
    <div className="group mr-6 w-28 mb-8 relative">
      <div className="group relative">
        <Link to={href} className="overflow-hidden">
          <PlayListThumBs data={item} />
          <div className="duration-300 transition-all opacity-0 group-hover:opacity-100 top-0 rounded absolute w-full h-full cursor-pointer bg-gradient-to-b from-from-body-bg-gradiant to-transparent"></div>
        </Link>
        <div className="text-whiteT1 text-sm absolute bottom-1 right-1">
          <div className="rounded-full bg-black bg-opacity-80 text-whiteT1 text-[10px] px-2 font-bold">
            {getPerPlaylist(Number(item?.per || 0))}
          </div>
        </div>
        <div className="absolute top-1 right-1">
          <PlayListAction playList={item} />
        </div>
      </div>

      <div className="mt-2 w-28 overflow-hidden"></div>
      <Link to={href}>
        <div className="font-bold mb-1 cursor-pointer hover:underline">
          {item?.title}
        </div>
      </Link>
      <div className="text-whiteT1 text-sm">
        {item?.song?.items?.length} bài hát
      </div>
    </div>
  )
}

export default PlayListItem
