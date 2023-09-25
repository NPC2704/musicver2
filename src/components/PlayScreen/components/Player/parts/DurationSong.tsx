import { useEffect, useState, memo, useRef, ReactNode } from "react"
import getTime from "../../../../../utils/getTime"
import { Slider } from "antd"
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks"
import { setStatus } from "../../../../../features/player/playerSlice"
import { player_ } from "../../../../../utils/player_"
import Tippy from "@tippyjs/react"
import { followCursor } from "tippy.js"
import "tippy.js/dist/tippy.css"
import store from "../../../../../app/store"

interface IDurationSong {
  audio: HTMLAudioElement | null
}
export const DurationSong: React.FC<IDurationSong> = ({ audio }) => {
  const dispath = useAppDispatch()
  const current = useAppSelector((state) => state?.player?.status?.currTime)
  const duration = useAppSelector((state) => state?.player?.status?.duration)
  const isScrolling = useAppSelector(
    (state) => state.player?.rewindListener?.isScroll,
  )

  useEffect(() => {
    if (audio) {
      audio.ontimeupdate = () => {
        const currentTime = Math.floor(audio?.currentTime || 0)
        !isScrolling && dispath(setStatus({ currTime: currentTime }))
      }
      audio.onended = () => {
        const isRepeat = store?.getState()?.player?.status?.isRepeat
        isRepeat ? player_?.replay() : player_.next()
      }
    }
  }, [audio, isScrolling])

  return (
    <div className="text-whiteT1 text-xs ml-3">
      {`${getTime.caculateTimeFM(current)} / ${getTime.caculateTimeFM(
        Math.floor(duration || 0),
      )}`}
    </div>
  )
}

interface IDurationSongSlider {}

export const DurationSongSlider: React.FC<IDurationSongSlider> = memo(() => {
  const current = useAppSelector((state) => state?.player?.status?.currTime)
  const duration = useAppSelector((state) => state?.player?.status?.duration)
  const songId = useAppSelector((state) => state?.player?.songId)

  const [value, setValue] = useState(current)

  const onChange = (value: number) => {
    setValue(value)
    player_.rewind({ isScroll: true })
  }

  const handleRewind = (value: number) => {
    player_.rewind({ to: value, isScroll: false })
  }

  useEffect(() => {
    songId && setValue(0)
  }, [songId])

  useEffect(() => {
    setValue(current)
  }, [current])

  return (
    <DurationSongSliderWrapper duration={duration}>
      <Slider
        style={{ margin: 0 }}
        trackStyle={{ backgroundColor: "#43bcff", height: 2 }}
        railStyle={{ backgroundColor: "#515151", height: 2 }}
        defaultValue={0}
        value={value}
        onChange={onChange}
        onAfterChange={handleRewind}
        max={duration}
        tooltip={{
          open: false,
        }}
      />
    </DurationSongSliderWrapper>
  )
})

interface IDurationSongSliderWrapper {
  children: ReactNode
  duration: number
}

const DurationSongSliderWrapper: React.FC<IDurationSongSliderWrapper> = ({
  children,
  duration = 0,
}) => {
  const barRef = useRef<HTMLDivElement>(null)
  const [tooltipValue, setTooktipValue] = useState<number>(0)

  const handleOver = (e: React.MouseEvent<HTMLElement>) => {
    if (barRef?.current) {
      const rect = barRef?.current?.getBoundingClientRect()
      const w: number = barRef?.current?.offsetWidth
      const x: number = e.clientX - rect.left
      setTooktipValue(Math.floor((x / w) * duration))
    }
  }

  return (
    <Tippy
      followCursor="horizontal"
      content={
        <div className="text-xs">{getTime.caculateTimeFM(tooltipValue)}</div>
      }
      plugins={[followCursor]}
      arrow={false}
      duration={500}
    >
      <div
        ref={barRef}
        onMouseMove={handleOver}
        className="absolute top-[-4px] left-0 right-0 h-3 bg-transparent"
      >
        {children}
      </div>
    </Tippy>
  )
}
