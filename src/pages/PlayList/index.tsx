import { useCallback, useEffect, useRef, useState } from "react"
import { useLocation, useParams, useSearchParams } from "react-router-dom"
import getPlayListInfoService from "../../services/playListService"
import PlayListBsInfo from "./components/PlayListBsInfo"
import { IPlayList } from "../../types/item"
import Loader from "../../components/Loader"
import setLoadingPage from "../../utils/setLoadingPage"
import { PlayListVariants } from "./components/PlayListVariants"
import { SongList } from "./components/SongList"
import routesConfig from "../../configs/routes"
import SectionTitle from "../../components/SectionTitle"
import { useAppSelector } from "../../app/hooks"

interface IProps {}

const PlayList: React.FC<IProps> = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { pathname } = useLocation()

  const id = useRef<string>("")
  const [data, setData] = useState<IPlayList>({})
  const [isLoading, setIsloading] = useState<boolean>(true)

  const setLoading = useCallback((type: boolean) => {
    setIsloading(type)
    setLoadingPage({ value: type ? 30 : 100 })
  }, [])

  useEffect(() => {
    const isValidRerender = pathname == routesConfig.playlist
    if (!isValidRerender) return
    const id_ = searchParams.get("id") || ""
    if (id.current == id_) return

    id.current = id_

    setLoading(true)
    getPlayListInfoService(id_)
      .then((fb) => {
        setLoading(false)
        if (fb?.result == 1) {
          setData(fb?.data?.data)
        } else setData({})
      })
      .catch((error) => {
        setLoading(false)
      })
  }, [searchParams])

  return (
    <div>
      {isLoading ? (
        <PlayListVariants />
      ) : data?.song ? (
        <div className="py-7">
          <PlayListBsInfo data={data} />
          <SongList list={data?.song?.items || []} id={id.current} />
        </div>
      ) : (
        <SectionTitle title="Playlist không tồn tại hoặc bị xoá" />
      )}
    </div>
  )
}

export default PlayList
