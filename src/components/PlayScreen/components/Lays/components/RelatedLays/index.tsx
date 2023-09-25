import { useCallback, useEffect, useState } from "react"
import { useAppSelector } from "../../../../../../app/hooks"
import Carousel from "../../../../../Carousel"
import { SectionWrapper } from "../../../../../Wrapper/SectionWrapper"
import getPlayListInfoService from "../../../../../../services/playListService"
import Loader from "../../../../../Loader"
import { IArtistInfo, IPlayListArr, ISong } from "../../../../../../types/item"
import SongItem, {
  SongItemCard,
  SongItemRelated,
} from "../../../../../../pages/PlayList/components/SongItem"
import { showPlayer } from "../../../../../../utils/ui"
import { setSong } from "../../../../../../utils/playSong"
import { useNavigate } from "react-router-dom"
import { player_ } from "../../../../../../utils/player_"
import { createPlayerHref } from "../../../../../../utils/createHref"
import handleData from "../../../../../../utils/handleData"
import { history } from "../../../../../../_helper"
import { ArtistsItem } from "../../../../../Artists"
import getArtistInfoService from "../../../../../../services/artistService"
import SectionTitle from "../../../../../SectionTitle"
import PlayListItem from "../../../../../../pages/Home/components/PlayList/components/PlayListItem"

interface IProps {}

const RelatedLays: React.FC<IProps> = ({}) => {
  const { navigate } = history
  const songInfo = useAppSelector((state) => state?.player?.songInfo)
  const playlistInfo = useAppSelector((state) => state?.player?.playListInfo)
  const [relatedSong, setRelatedSong] = useState<ISong[][]>([])
  const [artistInfo, setArtistInfo] = useState<IArtistInfo>({})

  const playListId =
    typeof songInfo?.artists !== "object"
      ? ""
      : songInfo?.artists[0]?.playlistId

  const artistId =
    typeof songInfo?.artists !== "object" ? "" : songInfo?.artists[0]?.alias

  const [isLoading, setIsLoading] = useState(true)

  const handlePlaySong = useCallback(
    (song: ISong, isPlaying?: boolean) => {
      if (!playListId) return

      showPlayer(true)

      if (!isPlaying) {
        setSong({ id: song.encodeId, playListId: String(playListId) || "" })
        navigate(createPlayerHref(song?.encodeId, String(playListId)))
        player_.play()
      } else {
        player_.pause()
      }
    },
    [playListId],
  )

  useEffect(() => {
    // console.log(playListId)
    setIsLoading(true)
    if (!playListId) return setIsLoading(false)
    getPlayListInfoService(playListId).then((fb) => {
      setIsLoading(false)
      if (fb?.result == 1) {
        const songList = fb?.data?.data?.song?.items

        setRelatedSong(handleData.chunkArray(songList, 4))
      } else {
        setRelatedSong([])
      }
    })

    getArtistInfoService(artistId).then((fb) => {
      if (fb?.result == 1) {
        setArtistInfo(fb?.data?.data)
      } else {
        setArtistInfo({})
      }
    })
  }, [songInfo])

  return isLoading ? (
    <div className="w-full h-full py-5 flex justify-center">
      <Loader size={30} />
    </div>
  ) : (
    <div className="pb-5">
      {relatedSong?.length ? (
        <div>
          <SectionWrapper>
            <Carousel
              titleCenter
              titleSize="2xl"
              items={relatedSong || []}
              title="Có thể bạn cũng thích"
              renderItem={(songArr, index) => (
                <div key={index} className="w-96">
                  {songArr?.map((song: ISong, index: number) => {
                    return (
                      <SongItemRelated
                        playListId={String(playListId)}
                        key={`song-item-${index}`}
                        song={song}
                        handlePlaySong={handlePlaySong}
                      />
                    )
                  })}
                </div>
              )}
            />
          </SectionWrapper>
        </div>
      ) : null}
      {artistInfo?.sections ? (
        <div>
          <SectionWrapper>
            <Carousel
              titleCenter
              titleSize="2xl"
              items={
                artistInfo?.sections
                  ?.filter((pl) => pl?.sectionType == "playlist")
                  ?.reduce((arr: any[], item) => {
                    return [...arr, ...item?.items]
                  }, [])
                  ?.reverse() || []
              }
              title="Danh sách phát đề xuất"
              renderItem={(playlist, index) => (
                <div key={index}>
                  <PlayListItem item={playlist} />
                </div>
              )}
            />
          </SectionWrapper>
        </div>
      ) : null}
      {playlistInfo?.artists ? (
        <div>
          <SectionWrapper>
            <Carousel
              titleCenter
              titleSize="2xl"
              items={playlistInfo?.artists || []}
              title="Nghệ sỹ tương tự"
              renderItem={(artist, index) => (
                <div key={index}>
                  <ArtistsItem artist={artist} />
                </div>
              )}
            />
          </SectionWrapper>
        </div>
      ) : null}

      {artistInfo?.biography ? (
        <div>
          <SectionTitle fontSize="2xl" title="Giới thiệu về nghệ sỹ" />
          <div className="mt-4">
            {artistInfo?.national && (
              <div
                className="text-justify text-base mt-1"
                dangerouslySetInnerHTML={{
                  __html: `Quốc gia: ${artistInfo?.national}`,
                }}
              ></div>
            )}
            {artistInfo?.realname && (
              <div
                className="text-justify text-base mt-1"
                dangerouslySetInnerHTML={{
                  __html: `Tên thật: ${artistInfo?.realname}`,
                }}
              ></div>
            )}

            {artistInfo?.birthday && (
              <div
                className="text-justify text-base mt-1"
                dangerouslySetInnerHTML={{
                  __html: `Năm sinh: ${artistInfo?.birthday}`,
                }}
              ></div>
            )}

            <div
              className="text-justify text-base mt-1"
              dangerouslySetInnerHTML={{ __html: artistInfo?.biography }}
            ></div>
            <div className="text-justify text-base mt-1">Nguồn: ZingMp3</div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default RelatedLays
