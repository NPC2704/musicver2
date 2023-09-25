import { useCallback } from "react"
import { Link } from "react-router-dom"
import { createPlayListHref } from "../../../../../utils/createHref"
import { IArtists } from "../../../../../types/item"
import Artists from "../../../../../components/Artists"

interface IItem {
  thumbnailM: string
  title: string
  artists: IArtists[]
  encodeId: string
}

interface IProps {
  item: IItem
}

const PlayListItem: React.FC<IProps> = ({ item }) => {
  const href = createPlayListHref(item?.encodeId)

  return (
    <div className="mr-6 w-44">
      <Link to={href}>
        <div className="group w-44 h-44 rounded relative">
          <img
            loading="lazy"
            className="rounded h-full object-cover cursor-pointer"
            src={item.thumbnailM}
            alt="playlist-thumbnail"
          />
          <div className="duration-300 transition-all opacity-0 group-hover:opacity-100 top-0 rounded absolute w-full h-full cursor-pointer bg-gradient-to-b from-from-body-bg-gradiant to-transparent"></div>
        </div>
      </Link>
      <div className="mt-4 w-44 overflow-hidden">
        <Link to={href}>
          <div className="font-bold mb-2 cursor-pointer hover:underline">
            {item?.title}
          </div>
        </Link>
        <div className="text-whiteT1 text-sm">
          <Artists artists={item?.artists} />
        </div>
      </div>
    </div>
  )
}

export default PlayListItem
