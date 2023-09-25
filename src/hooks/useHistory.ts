import { useEffect, useRef } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { IPath } from "../types/item"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { setRoute } from "../features/routes/routesSlice"
import routesConfig from "../configs/routes"
import { playSong } from "../utils/playSong"
import { showPlayerInfo } from "../utils/ui"
import { history } from "../_helper"

const useHistory = () => {
  const dispatch = useAppDispatch()
  const prePath = useRef<IPath>({})
  const midlePath = useRef<IPath>({})
  const path: IPath = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  // const playListId = useAppSelector((state) => state.player?.playListId)

  history.navigate = navigate

  useEffect(() => {
    midlePath.current = path
    if (path?.pathname !== routesConfig.player) {
      dispatch(
        setRoute({
          prePath: prePath.current,
          currentPath: path,
        }),
      )
      showPlayerInfo(false)
    } else {
      const id = searchParams.get("id") || ""
      const playListId_ = searchParams.get("listId") || ""
      // console.log(playListId_)
      playSong({ id, playListId: playListId_ || "000" })
    }
  }, [path])

  if (midlePath.current?.pathname !== path?.pathname) {
    prePath.current = midlePath.current
  }

  return {
    prePath: prePath.current,
    currentPath: path,
  }
}

export default useHistory
