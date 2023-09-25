import { IoIosExpand } from "react-icons/io"
import { NavLink, useSearchParams } from "react-router-dom"
import { createPlayListHref } from "../../utils/createHref"
import { AiFillPlayCircle } from "react-icons/ai"
import { Button } from "../Button"
import { BsPlusLg } from "react-icons/bs"
import AddPlaylistModal from "../Modal/AddPlaylistModal"
import { useAppSelector } from "../../app/hooks"
import PlayListSelectModal from "../Modal/PlayListSelectModal"
import { getPerPlaylist } from "../../utils/getString"
import handleData from "../../utils/handleData"
import { PiPushPinLight } from "react-icons/pi"

const PlaylistSb: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get("id") || ""
  const playlist = useAppSelector((state) => state?.user?.playList)
  const user = useAppSelector((state) => state?.user?.data)
  const isShow = useAppSelector((state) => state?.player?.isShow)

  return (
    <>
      <div
        className={`flex-1 flex flex-col h-full overflow-auto ${
          isShow ? "mb-playcard" : "mb-6"
        }`}
      >
        <div className="mb-3">
          <AddPlaylistModal
            button={
              <Button
                isAnimated={false}
                isActiveBg={true}
                isStopPropagation={false}
              >
                <div className="flex items-center">
                  <BsPlusLg className="text-white text-xl" />
                </div>
                <div className="text-sm font-bold ml-2">Danh sách phát mới</div>
              </Button>
            }
          />
        </div>
        <div className="flex-1 overflow-hidden pr-2 hover:mini-overflow-scrollbar scrollbar-small">
          <NavLink
            to={createPlayListHref("favorite")}
            className={({ isActive }) =>
              `${isActive && id == "favorite" ? "group" : ""}`
            }
          >
            <div
              className={`group rounded relative px-3 h-14 flex flex-col justify-center group-[]:bg-white-opacity-17 hover:bg-white-opacity-30`}
            >
              <div className="font-bold text-sm">Danh sách bạn yêu thích</div>
              <div className="text-xs text-whiteT1">Danh sách tự động</div>
              <div className={`absolute right-2`}>
                <PiPushPinLight color={"var(--whiteT1)"} size={15} />
              </div>
            </div>
          </NavLink>
          {playlist?.map((pl, index) => {
            return (
              <NavLink
                key={index}
                to={createPlayListHref(pl?.encodeId || "")}
                className={({ isActive }) =>
                  `${isActive && id == pl?.encodeId ? "group" : ""}`
                }
              >
                <div
                  className={`group rounded my-2 relative px-3 h-14 flex flex-col justify-center group-[]:bg-white-opacity-17 hover:bg-white-opacity-30`}
                >
                  <div className="font-bold text-sm mb-1">
                    <div>{handleData.stringLimit(pl?.title || "", 20)}</div>
                  </div>
                  <div className="text-xs flex items-center">
                    <div className="text-whiteT1">
                      {handleData.stringLimit(user?.name || "", 15)}
                    </div>

                    <div className="rounded-full bg-white-opacity-25 text-whiteT1 text-[10px] ml-2 px-1 font-bold">
                      {pl?.song?.items?.length}{" "}
                      {getPerPlaylist(Number(pl?.per || 0))}
                    </div>
                  </div>
                  {/* <div
                    className={`absolute right-2  ${
                      id == pl?.encodeId ? "opacity-100" : "opacity-0"
                    } `}
                  >
                    <AiFillPlayCircle color={"white"} size={25} />
                  </div> */}
                  <div></div>
                </div>
              </NavLink>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default PlaylistSb
