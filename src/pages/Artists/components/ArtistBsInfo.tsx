import { useTranslation } from "react-i18next"
import { IArtistInfo, IPlayList } from "../../../types/item"
import getTime from "../../../utils/getTime"
import SectionTitle from "../../../components/SectionTitle"
import handleData from "../../../utils/handleData"
import { useState } from "react"
import { useAppSelector } from "../../../app/hooks"

interface IProps {
  artistInfo: IArtistInfo
}

const PlayListBsInfo: React.FC<IProps> = ({ artistInfo }) => {
  const { t } = useTranslation()
  const [isShowAll, setIsShowAll] = useState(false)
  const isShowInfo = useAppSelector((state) => state?.player?.isShoaInfo)
  return (
    <div className="flex">
      <div
        className={`fixed flex justify-center -z-30 top-0 bottom-0  left-0  ${
          isShowInfo ? "right-[12px]" : "right-0"
        }`}
      >
        <img
          className="w-full rounded"
          alt="playlist-thumbnail"
          src={artistInfo?.thumbnailM}
          // style={{
          //   backdropFilter: "blur(5px)",
          //   filter: "blur(5px)",
          // }}
        />
      </div>

      <div
        className={`fixed flex justify-center -z-30 top-0 bottom-0 left-0 right-0 ${
          isShowInfo ? "right-[12px]" : "right-0"
        }`}
      >
        <img
          className="h-full rounded"
          alt="playlist-thumbnail"
          src={artistInfo?.thumbnailM}
        />
      </div>

      <div className="fixed -z-20 top-0 bottom-0 left-0 right-0  bg-gradient-to-b from-from-body-bg-gradiant to-to-body-bg-gradiant"></div>

      <div className="">
        <div className="py-5">
          <SectionTitle title={artistInfo?.name || ""}></SectionTitle>
        </div>
        <div>
          <div className="mt-4 text-sm">
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

            {artistInfo?.biography && (
              <>
                <div
                  className="text-justify text-base mt-1"
                  dangerouslySetInnerHTML={{
                    __html: isShowAll
                      ? artistInfo?.biography
                      : handleData?.stringLimit(artistInfo?.biography, 300),
                  }}
                ></div>
                <div
                  className="mt-3 font-bold cursor-pointer"
                  onClick={() => setIsShowAll(!isShowAll)}
                >
                  {isShowAll ? "ẨN BỚT" : "HIỆN THÊM"}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlayListBsInfo
