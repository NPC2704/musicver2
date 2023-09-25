import { NavLink, useLocation } from "react-router-dom"
import HEADER_ITEM from "../../../items/HEADER_ITEM"
import { useTranslation } from "react-i18next"
import { GoHomeFill, GoHome } from "react-icons/go"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { toggleSidebar } from "../../../features/ui/uiSlice"
import { IPath } from "../../../types/item"
import { useCallback, useEffect, useState } from "react"
import { Button } from "../../../components/Button"
import { GoogleLogin } from "@react-oauth/google"
import { loginMethod } from "../../../_helper"
import { ui } from "../../../utils/ui"
import PlaylistSb from "../../../components/PlaylistSb"

interface IProps {}

const Sidebar: React.FC<IProps> = ({}) => {
  const { t } = useTranslation()
  const dispath = useAppDispatch()
  const path: IPath = useLocation()
  const [isTop, setIsTop] = useState<boolean>(true)

  const isExpand = useAppSelector((state) => state?.ui?.sidebarExpand)
  const isPlayerShow = useAppSelector((state) => state?.player?.isShoaInfo)

  const isLogin = useAppSelector((state) => state?.user?.isLogin)

  const handleOnScroll = useCallback(() => {
    setIsTop(!document.documentElement.scrollTop)
  }, [])
  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll)
    // remove event scroll when unmount
    return () => window.removeEventListener("scroll", handleOnScroll)
  }, [])
  return (
    <div
      className={`transition-border flex flex-col fixed z-20 pt-header px-2 overflow-auto bottom-0 top-0 left-0 border-r border-neutral-800 ${
        isExpand
          ? "w-sidebar-width-expand bg-main-bg"
          : "w-sidebar-width-narrow"
      } ${isPlayerShow ? "bg-main-bg" : ""} ${
        !isExpand && isTop && !isPlayerShow
          ? "border-transparent"
          : "bg-main-bg"
      } `}
    >
      <div className="mt-2 pb-8">
        {HEADER_ITEM?.map((item, index) => {
          const Icon =
            path?.pathname == item?.href
              ? item?.iconActive
              : item.icon || GoHomeFill

          return (
            <div className={`mb-1`} key={index}>
              <NavLink
                to={item.href}
                className={({ isActive }) =>
                  `${isActive ? "group font-bold" : "font-semibold"}`
                }
              >
                <div
                  className={`rounded flex justify-between items-center group-[]:bg-white-opacity-17 hover:bg-white-opacity-30 ${
                    isExpand ? "px-3 py-3 h-12" : "flex-col px-1 py-3 h-16"
                  }`}
                >
                  <div className="w-10 flex justify-center">
                    <Icon size={22} />
                  </div>
                  <div
                    className={`text-white flex-1 ${
                      isExpand ? "text-base ml-2" : "text-[10px] text-center"
                    }`}
                  >
                    {t(item.title)}
                  </div>
                </div>
              </NavLink>
            </div>
          )
        })}
      </div>

      <div
        className={`overflow-auto pt-8 flex-1 flex flex-col border-t border-neutral-800 ${
          isExpand ? "" : "hidden"
        }`}
      >
        {isLogin ? (
          <PlaylistSb></PlaylistSb>
        ) : (
          <div className="px-4">
            <div>
              <Button
                isAnimated={false}
                isActiveBg={true}
                onClick={ui.showLoginModal}
              >
                Đăng nhập
              </Button>
            </div>
            <div className="py-3 text-xs text-whiteT1">
              Đăng nhập để tạo và chia sẻ danh sách phát, nhận các đề xuất được
              cá nhân hóa, v.v.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Sidebar
