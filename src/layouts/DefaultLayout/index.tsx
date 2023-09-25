import { ReactNode } from "react"
import Header from "./components/Header"
import TopLoader from "../../components/TopLoader"
import { PlayScreen } from "../../components/PlayScreen"
import useHistory from "../../hooks/useHistory"
import { useAppSelector } from "../../app/hooks"
import Sidebar from "./components/Sidebar"
import MaskColor from "./components/MaskColor"
import { LoginModal } from "../../components/Modal/LoginModal"
import PlayListSelectModal from "../../components/Modal/PlayListSelectModal"
import Confirm from "../../components/Confirm"
import ShareModal from "../../components/Modal/ShareModal"
import EditPlaylistModal from "../../components/Modal/EditPlaylistModal"

interface IProps {
  children: ReactNode
}

const DefaultLayout: React.FC<IProps> = ({ children }) => {
  useHistory()

  const isShowInfo = useAppSelector((state) => state.player.isShoaInfo)
  const isShow = useAppSelector((state) => state.player.isShow)
  const isSidebarExpand = useAppSelector((state) => state?.ui?.sidebarExpand)

  return (
    <>
      <div
        className={`${isShowInfo ? "bg-main-bg pr-[12px]" : ""} ${
          isShow ? "pb-playcard" : ""
        }`}
      >
        <TopLoader />
        <MaskColor />
        <Header />
        <Sidebar />
        <LoginModal />
        <PlayScreen />
        <PlayListSelectModal />
        <EditPlaylistModal />
        <Confirm />
        <ShareModal />
        <div
          className={`pt-20 px-24 relative z-10 flex flex-col items-center ${
            isSidebarExpand
              ? "ml-sidebar-width-expand"
              : "ml-sidebar-width-narrow"
          }`}
        >
          <div className="max-w-7xl w-full">{children}</div>
        </div>
      </div>
    </>
  )
}

export default DefaultLayout
