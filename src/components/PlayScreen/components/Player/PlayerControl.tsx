import { memo, useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../app/hooks"
import getSongService from "../../../../services/getSongService"
import { ISongMP3 } from "../../../../types/item"
import { ImPause2, ImPlay3 } from "react-icons/im"
import { CirButton } from "../../../Button"
import { player_ } from "../../../../utils/player_"
import { AiOutlineStepBackward, AiOutlineStepForward } from "react-icons/ai"
import { IoMdPause } from "react-icons/io"
import getTime from "../../../../utils/getTime"
import { DurationSong, DurationSongSlider } from "./parts/DurationSong"
import Loader from "../../../Loader"
import { setStatus } from "../../../../features/player/playerSlice"
import { VolumeListenner } from "./parts/VolumeTrack"
import toast, { Toaster } from "react-hot-toast"
import { InfoToast } from "../../../Toast"

interface IProps {}

const PlayerControl: React.FC<IProps> = memo(() => {
  const dispath = useAppDispatch()
  const songId = useAppSelector((state) => state?.player?.songId)
  const isPlaying = useAppSelector((state) => state.player?.status?.isPlaying)
  const rewind = useAppSelector((state) => state.player?.rewindListener?.to)
  const key = useAppSelector((state) => state.player?.rewindListener?.key)
  const isLoading = useAppSelector((state) => state.player.status?.isLoading)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [audioElement, setAudioElement] = useState<HTMLAudioElement>()

  const [audio, setAudio] = useState<ISongMP3>({})
  const CONTROL_ITEM = [
    {
      icon: AiOutlineStepBackward,
      size: 20,
      bRadius: 40,
      callback: (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        player_.pre()
      },
    },
    {
      icon: isLoading ? Loader : isPlaying ? IoMdPause : ImPlay3,
      size: 32,
      fill: "#43bcff",
      bRadius: 50,
      callback: (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        if (isLoading) return
        isPlaying ? player_.pause() : player_.play()
      },
    },
    {
      icon: AiOutlineStepForward,
      size: 20,
      bRadius: 40,
      callback: (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        player_.next()
      },
    },
  ]

  useEffect(() => {
    if (!songId) return
    setAudio({})
    getSongService(songId).then((fb) => {
      if (fb?.result == 1) {
        setAudio(fb?.data?.data)
      } else {
        setAudio({})

        setTimeout(() => {
          toast("Không thể phát bài hát")
          player_.next()
        }, 3000)
      }
    })
  }, [songId])

  useEffect(() => {
    if (audioRef.current?.src) {
      isPlaying ? audioRef?.current?.play() : audioRef?.current?.pause()
    }
  }, [isPlaying, audio])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = rewind || 0
    }
  }, [rewind, key])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0
    }
  }, [key])

  useEffect(() => {
    if (!audioRef.current) return
    setAudioElement(audioRef.current)
    audioRef.current.oncanplay = () => {
      if (!audioRef.current?.src) return
      dispath(setStatus({ duration: audioRef.current?.duration }))
      player_.ready()
    }
  }, [audio[128]])

  return (
    <>
      <div className="flex h-full justify-center items-center px-3">
        <audio key={audio[128]} src={audio[128]} ref={audioRef} />
        <div className="flex justify-center items-center">
          {CONTROL_ITEM?.map((item, index) => {
            const Icon = item.icon
            const loadingProps =
              isLoading && item?.fill ? { fill: item.fill } : {}
            return (
              <CirButton
                key={index}
                onClick={item.callback}
                radius={item.bRadius}
                isTransparent
                useSAnimate
                styles={{ margin: "0 8px" }}
              >
                <Icon {...loadingProps} size={item.size} />
              </CirButton>
            )
          })}
          <DurationSong audio={audioElement || null} key={songId} />
          <VolumeListenner audio={audioElement || null} />
        </div>
      </div>
    </>
  )
})

export default PlayerControl
