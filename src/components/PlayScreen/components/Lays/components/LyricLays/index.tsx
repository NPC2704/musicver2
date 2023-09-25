import { useAppSelector } from "../../../../../../app/hooks"
import { memo, useEffect, useState, useRef, Fragment } from "react"
import { getSongLyricService } from "../../../../../../services/getSongService"
import { ILyric } from "../../../../../../types/item"
import Loader from "../../../../../Loader"

interface IProps {
  isSingle?: boolean
}

const LyricLays: React.FC<IProps> = ({ isSingle = false }) => {
  const id = useAppSelector((state) => state.player?.songId)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [lyricData, setLyricData] = useState<ILyric[]>([])
  const [currIndexLyric, setCurrIndecLyric] = useState<number>(0)
  const indexRef = useRef<number>(0)
  const current = useAppSelector((state) => state.player?.status?.currTime)

  useEffect(() => {
    if (!lyricData?.length) return
    const curr = current * 1000 + 1000
    const index = lyricData?.findIndex((lyric) => {
      const words = lyric.words
      const start = words[0]?.startTime
      const end = words[words?.length - 1]?.endTime
      return curr < end && curr > start
    })
    if (index != -1) setCurrIndecLyric(index || 0)

    const lyricE = document.querySelector(`#lyric-word-${index}-${id}`)
    if (lyricE && index != indexRef.current) {
      lyricE.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })
    }
    indexRef.current = index
  }, [current])

  useEffect(() => {
    if (!id) return setIsLoading(false)
    setIsLoading(true)
    setLyricData([])
    setCurrIndecLyric(0)

    getSongLyricService(id)
      .then((fb) => {
        setIsLoading(false)
        if (fb?.result == 1) {
          setLyricData(fb?.data?.data?.sentences)
        } else {
          setLyricData([
            {
              words: [
                {
                  data: "Không có lời bài hát",
                  endTime: 9999999999,
                  startTime: 0,
                },
              ],
            },
          ])
        }
      })
      .catch((error) => setIsLoading(false))
  }, [id])

  return isLoading ? (
    <div className="w-full h-full py-5 flex justify-center">
      <Loader size={isSingle ? 15 : 30} />
    </div>
  ) : (
    <div className="my-5 px-5">
      {isSingle ? (
        <div key={currIndexLyric} className="animate-fadeIn text-center">
          {lyricData?.length
            ? lyricData[currIndexLyric]?.words?.map((word) => `${word?.data} `)
            : "Không có lời bài hát"}
        </div>
      ) : (
        lyricData?.map((lyric, index) => {
          return (
            <Fragment key={index}>
              {!(index % 8) && index ? <div className="h-8"></div> : null}
              <div
                id={`lyric-word-${index}-${id}`}
                key={`lyric-word-${index}`}
                className={`transition-all text-base ${
                  currIndexLyric == index
                    ? "text-turquoise font-bold"
                    : "text-white"
                }`}
              >
                {lyric?.words?.map((word) => `${word?.data} `)}
              </div>
            </Fragment>
          )
        })
      )}
    </div>
  )
}

export default memo(LyricLays)
