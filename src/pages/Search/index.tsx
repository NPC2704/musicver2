import { useCallback, useEffect, useRef, useState } from "react"
import { useLocation, useParams, useSearchParams } from "react-router-dom"
import getPlayListInfoService from "../../services/playListService"
import ArtistBsInfo from "./components/ArtistBsInfo"
import { IArtistInfo, IPlayList, ISearchRs, ISong } from "../../types/item"
import Loader from "../../components/Loader"
import setLoadingPage from "../../utils/setLoadingPage"
import { ArtistVariants } from "./components/ArtistVariants"
import routesConfig from "../../configs/routes"
import SectionTitle, { SectionTitle2xl } from "../../components/SectionTitle"
import getArtistInfoService from "../../services/artistService"
import { SongListArtistPage } from "./components/SongListArtistPage"
import { SectionWrapper } from "../../components/Wrapper/SectionWrapper"
import PlayListItem from "../Home/components/PlayList/components/PlayListItem"
import Carousel from "../../components/Carousel"
import searchService from "../../services/searchService"
import { TitleRs } from "../../components/Search/components/searchItem"
import SongItem, {
  ArtistLinkItem,
  PlaylistLinkItem,
  SongLinkItem,
} from "../PlayList/components/SongItem"
import { ArtistsItem } from "../../components/Artists"
import { showPlayer } from "../../utils/ui"
import { setSong } from "../../utils/playSong"
import { player_ } from "../../utils/player_"

interface IProps {}

const Search: React.FC<IProps> = ({}) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { pathname } = useLocation()

  const id = useRef<string>("")
  const [searchRs, setSearchRs] = useState<ISearchRs>({})

  const [isLoading, setIsloading] = useState<boolean>(true)

  const setLoading = useCallback((type: boolean) => {
    setIsloading(type)
    setLoadingPage({ value: type ? 30 : 100 })
  }, [])

  useEffect(() => {
    const isValidRerender = pathname == routesConfig.search

    if (!isValidRerender) return
    const id_ = searchParams.get("q") || ""
    if (!id_) {
      setLoading(false)
      setSearchRs({})
      return
    }
    if (id.current == id_) return

    id.current = id_

    setLoading(true)
    searchService(id_)
      .then((fb) => {
        setLoading(false)
        if (fb?.result == 1) {
          const rs = fb?.data?.data
          if (
            !rs?.artists?.length &&
            !rs?.playlists?.length &&
            !rs?.songs?.length
          ) {
            setSearchRs({})
            return
          }
          setSearchRs(rs)
        } else {
          setSearchRs({})
        }
      })
      .catch((error) => {
        setLoading(false)
      })
  }, [searchParams])

  const handlePlaySong = (song: ISong, isPlaying?: boolean) => {
    showPlayer(true)
    if (!isPlaying) {
      setSong({ id: song.encodeId, playListId: "000" })
      player_.play()
    } else {
      player_.pause()
    }
  }

  return (
    <div>
      {isLoading ? (
        <ArtistVariants />
      ) : Object.values(searchRs)?.length ? (
        <>
          {searchRs?.artists?.length ? (
            <SectionWrapper>
              <Carousel
                titleCenter
                titleSize="2xl"
                items={searchRs?.artists || []}
                title="Nghệ sỹ"
                renderItem={(artist, index) => (
                  <div key={index}>
                    <ArtistsItem artist={artist} />
                  </div>
                )}
              />
            </SectionWrapper>
          ) : null}
          {searchRs?.songs?.length ? (
            <div>
              <div className="mb-4">
                <SectionTitle2xl fontSize="2xl" title="Bài hát" />
              </div>
              {searchRs?.songs?.map((song, index) => {
                return (
                  <SongItem
                    playListId=""
                    handlePlaySong={handlePlaySong}
                    key={index}
                    song={song}
                  />
                )
              })}
            </div>
          ) : null}

          {searchRs?.playlists?.length ? (
            <SectionWrapper>
              <Carousel
                titleCenter
                titleSize="2xl"
                items={searchRs?.playlists || []}
                title="Danh sách phát"
                renderItem={(playlist, index) => (
                  <div key={index}>
                    <PlayListItem item={playlist} />
                  </div>
                )}
              />
            </SectionWrapper>
          ) : null}
        </>
      ) : (
        <SectionTitle title="Không tìm thấy kết quả"></SectionTitle>
      )}
    </div>
  )
}

export default Search
