import { JSXElementConstructor, ReactNode } from "react"
import { GoHomeFill, GoHome } from "react-icons/go"
import { PiCompassLight, PiCompassFill, PiCompass } from "react-icons/pi"
import { MdOutlineVideoLibrary, MdVideoLibrary } from "react-icons/md"
import { AiFillPlaySquare, AiOutlinePlaySquare } from "react-icons/ai"
import { IconType } from "antd/es/notification/interface"
import routesConfig from "../configs/routes"

interface IHeaderItem {
  id: number
  href: string
  title: string
  icon?: ReactNode
  iconActive: IconType
}

const HEADER_ITEM: IHeaderItem[] = [
  {
    id: 1,
    href: routesConfig?.home,
    title: "home",
    icon: GoHome,
    iconActive: GoHomeFill,
  },
  {
    id: 2,
    href: routesConfig?.explore,
    title: "explore",
    icon: PiCompass,
    iconActive: PiCompassFill,
  },
  {
    id: 3,
    href: routesConfig?.library,
    title: "library",
    icon: AiOutlinePlaySquare,
    iconActive: AiFillPlaySquare,
  },
]

export default HEADER_ITEM
