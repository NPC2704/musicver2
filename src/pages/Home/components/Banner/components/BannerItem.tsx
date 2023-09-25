import { Link } from "react-router-dom"
import {
  createPlayListHref,
  createPlayerHref,
} from "../../../../../utils/createHref"

interface IItem {
  banner: string
  type: number
  encodeId: string
}

interface IProps {
  item: IItem
}

const BannerItem: React.FC<IProps> = ({ item }) => {
  let href
  switch (item.type) {
    case 1:
      href = createPlayerHref(item?.encodeId)
      break
    case 4:
      href = createPlayListHref(item?.encodeId)
      break
    default:
      href = createPlayListHref(item?.encodeId)
  }
  return (
    <Link to={href}>
      <div className="group relative w-80 h-44 mr-6 br rounded flex justify-center items-center overflow-hidden cursor-pointer">
        <img
          className="rounded object-cover"
          src={item.banner}
          alt="banner-thumb"
        />
        <div className="duration-300 transition-all opacity-0 group-hover:opacity-100 top-0 rounded absolute w-full h-full cursor-pointer bg-gradient-to-b from-from-body-bg-gradiant to-transparent"></div>
      </div>
    </Link>
  )
}

export default BannerItem
