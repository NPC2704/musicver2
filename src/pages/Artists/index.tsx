import { useCallback, useEffect, useRef, useState } from "react"
import { useLocation, useParams, useSearchParams } from "react-router-dom"
import getPlayListInfoService from "../../services/playListService"
import ArtistBsInfo from "./components/ArtistBsInfo"
import { IArtistInfo, IPlayList } from "../../types/item"
import Loader from "../../components/Loader"
import setLoadingPage from "../../utils/setLoadingPage"
import { ArtistVariants } from "./components/ArtistVariants"
import routesConfig from "../../configs/routes"
import SectionTitle from "../../components/SectionTitle"
import getArtistInfoService from "../../services/artistService"
import { SongListArtistPage } from "./components/SongListArtistPage"
import { SectionWrapper } from "../../components/Wrapper/SectionWrapper"
import PlayListItem from "../Home/components/PlayList/components/PlayListItem"
import Carousel from "../../components/Carousel"

interface IProps {}

const ArtistsPage: React.FC<IProps> = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { pathname } = useLocation()

  const id = useRef<string>("")
  const [data, setData] = useState<IArtistInfo>({})
  const [isLoading, setIsloading] = useState<boolean>(true)

  const setLoading = useCallback((type: boolean) => {
    setIsloading(type)
    setLoadingPage({ value: type ? 30 : 100 })
  }, [])

  useEffect(() => {
    const isValidRerender = pathname == routesConfig.artist
    if (!isValidRerender) return
    const id_ = searchParams.get("id") || ""
    if (id.current == id_) return

    id.current = id_

    setLoading(true)
    getArtistInfoService(id_)
      .then((fb) => {
        setData({})
        if (fb?.result == 1) {
          const aData = fb?.data?.data
          getPlayListInfoService(fb?.data?.data?.playlistId)
            .then((fb1) => {
              setLoading(false)
              if (fb1?.result == 1) {
                setData({
                  ...aData,
                  song: { items: fb1?.data?.data?.song?.items },
                  playListInfo: fb1?.data?.data,
                })
              } else setData({})
            })
            .catch((error) => {
              setLoading(false)
            })
        } else {
          setLoading(false)

          setData({})
        }
      })
      .catch((error) => {
        setLoading(false)
      })
  }, [searchParams])

  return (
    <div>
      {isLoading ? (
        <ArtistVariants />
      ) : data?.name ? (
        <div className="py-7">
          <ArtistBsInfo artistInfo={data} />
          <SongListArtistPage
            list={data?.song?.items || []}
            id={data?.playListInfo?.encodeId || ""}
          />
          {data?.sections ? (
            <div>
              <SectionWrapper>
                <Carousel
                  titleCenter
                  titleSize="2xl"
                  items={
                    data?.sections
                      ?.filter((pl) => pl?.sectionType == "playlist")
                      ?.reduce((arr: any[], item) => {
                        return [...arr, ...item?.items]
                      }, []) || []
                  }
                  title="Album"
                  renderItem={(playlist, index) => (
                    <div key={index}>
                      <PlayListItem item={playlist} />
                    </div>
                  )}
                />
              </SectionWrapper>
            </div>
          ) : null}
        </div>
      ) : (
        <SectionTitle title="Trang không tồn tại"></SectionTitle>
      )}
    </div>
  )
}

export default ArtistsPage
