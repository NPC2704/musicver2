import { useTranslation } from "react-i18next"
import { IPlayList } from "../../../types/item"
import { PlayListVariants } from "./PlayListVariants"
import getTime from "../../../utils/getTime"
import SectionTitle from "../../../components/SectionTitle"
import { PiPlaylistLight } from "react-icons/pi"
import { PlayListAction } from "../../../components/Action/PlayListAction"
import { Button } from "../../../components/Button"
import { CiShuffle } from "react-icons/ci"
import { useNavigate } from "react-router-dom"
import { createPlayerHref } from "../../../utils/createHref"
import { player_ } from "../../../utils/player_"

interface IProps {
  data: IPlayList
}

const PlayListBsInfo: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { encodeId } = data

  const handleMixPlay = () => {
    const songList = data?.song?.items
    const sLength = songList?.length || 0
    const random = Math.floor(Math.random() * (sLength - 1))
    const songId = songList?.length
      ? songList[random]?.encodeId || songList[0]?.encodeId
      : ""
    if (!encodeId || !songId) return
    const href = createPlayerHref(songId, encodeId)
    navigate(href)
    player_?.play()
  }

  return (
    <div className="flex">
      <div>
        {data?.thumbnailM ? (
          <div className="h-64 w-64 rounded">
            <img
              className="h-full w-full rounded"
              alt="playlist-thumbnail"
              src={data?.thumbnailM}
            />
          </div>
        ) : (
          <div className="h-64 w-64 bg-white-opacity-15 rounded flex flex-wrap">
            {data?.song?.items?.length ? (
              data?.song?.items?.map((song, index) => {
                return (
                  index < 4 && (
                    <div key={index} className="w-1/2 h-1/2">
                      <img
                        src={song?.thumbnailM}
                        alt="songthumb"
                        className="w-full h-full"
                      />
                    </div>
                  )
                )
              })
            ) : (
              <div className="flex h-full w-full justify-center items-center bg-white-opacity-15">
                <PiPlaylistLight className="text-lg text-whiteT1" />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="ml-9 flex flex-col justify-between">
        <div className="py-5">
          <SectionTitle title={data?.title || ""}></SectionTitle>
        </div>
        <div className="text-whiteT1">
          <div className="">
            <div className="py-1">{t("playlist")} • Solfive</div>
            <div className="py-1">
              {`${data?.song?.total} ${t("song")} • 
            ${
              data?.song?.totalDuration
                ? getTime.caculateTime(data?.song?.totalDuration)
                : ""
            }`}
            </div>
          </div>
          <div className="mt-3 text-sm">{data?.sortDescription}</div>
        </div>
        <div className="flex">
          {data?.song?.items?.length ? (
            <div className="mr-4">
              <Button
                onClick={handleMixPlay}
                isAnimated={false}
                isActiveBg={true}
                styles={{
                  borderRadius: 9999,
                  backgroundColor: "var(--color-white)",
                  color: "var(--black)",
                  fontWeight: 700,
                  fontSize: "14px",
                }}
              >
                <CiShuffle size={25} color={"var(--black)"} />
                <div className="ml-2">Phát ngẫu nhiên</div>
              </Button>
            </div>
          ) : null}

          <div>
            <PlayListAction isHoverShow={false} playList={data} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayListBsInfo
