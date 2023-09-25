import { Link } from "react-router-dom"
import { IArtists, IPlayList, ISong } from "../../../types/item"
import {
  createArtistHref,
  createPlayListHref,
  createPlayerHref,
} from "../../../utils/createHref"
import Artists, { ArtistsDL } from "../../../components/Artists"
import getTime from "../../../utils/getTime"
import { AiOutlineMore } from "react-icons/ai"
import { CirButton } from "../../../components/Button"
import { PiHeartLight } from "react-icons/pi"
import { IoVolumeHighOutline } from "react-icons/io5"
import { useEffect, memo, useRef } from "react"

import { FaPause, FaPlay } from "react-icons/fa"

import { SONG_ACTION } from "../../../items/ACTION_ITEM"
import { useAppSelector } from "../../../app/hooks"
import { IoMdPause } from "react-icons/io"
import Loader from "../../../components/Loader"
import store from "../../../app/store"
import { SongAction } from "../../../components/Action/SongAction"
import { useState } from "react"

interface IProps {
  song: ISong
  handlePlaySong?: (song: ISong, isPlaying?: boolean) => void
  playListId: string
}

interface IInfoThumbProps {
  isFocus: boolean
  isPlaying: boolean
}

const InfoThumb: React.FC<IInfoThumbProps> = ({ isFocus, isPlaying }) => {
  const isLoading = useAppSelector((state) => state.player?.status?.isLoading)
  return isLoading && isFocus ? (
    <div
      className={`flex items-center justify-center opacity-100 h-full w-full top-0 absolute z-10 bg-opacity-60 bg-black`}
    >
      <Loader size={20} />
    </div>
  ) : (
    <>
      <div
        className={`flex items-center justify-center opacity-0 group-hover:opacity-100 h-full w-full top-0 absolute z-20 bg-opacity-60 bg-black`}
      >
        {isPlaying ? (
          <IoMdPause size={20} className="text-white" />
        ) : (
          <FaPlay className="text-white" />
        )}
      </div>

      {isFocus ? (
        <div
          className={`flex items-center justify-center opacity-100 group-hover:opacity-0 h-full w-full top-0 absolute z-10 bg-opacity-60 bg-black`}
        >
          <IoVolumeHighOutline size={20} className="text-white" />
        </div>
      ) : null}
    </>
  )
}

const SongItem: React.FC<IProps> = ({
  song,
  handlePlaySong = () => {},
  playListId,
}) => {
  const [ref, setRef] = useState<HTMLDivElement>()
  const comRef = useRef<HTMLDivElement>(null)
  const href = createPlayerHref(song?.encodeId, playListId)
  const songId = useAppSelector((state) => state.player.songId)
  const isPlaying_ = useAppSelector((state) => state.player.status.isPlaying)
  const isLoading = useAppSelector((state) => state.player?.status?.isLoading)

  const isPlaying = songId == song?.encodeId && isPlaying_
  const isFocus = songId == song?.encodeId

  useEffect(() => {
    if (comRef?.current) {
      setRef(comRef?.current)
    }
  }, [])

  return (
    <div
      ref={comRef}
      className={`group border-b border-neutral-900 h-12 px-2 flex items-center ${
        isFocus ? "bg-grayL" : ""
      }`}
    >
      <div className="flex items-center flex-a2 overflow-hidden mr-4">
        <div>
          <div
            onClick={() => handlePlaySong(song, isPlaying)}
            className="h-7 w-7 mr-4 relative cursor-pointer"
          >
            <img
              loading="lazy"
              src={song.thumbnailM}
              alt="song-thumbnail"
              className="rounded-sm h-full object-cover"
            />
            <InfoThumb isFocus={isFocus} isPlaying={isPlaying} />
          </div>
        </div>
        <Link to={href}>
          <div
            onClick={() => handlePlaySong(song)}
            className="font-semibold whitespace-nowrap cursor-pointer"
          >
            <div>{song?.title}</div>
          </div>
        </Link>
      </div>
      <div className="flex-a3 flex justify-between">
        <div className="text-whiteT1 text-sm flex items-center">
          <Artists artists={song?.artists} />
        </div>
        <div className="text-whiteT1 flex items-center">
          <div className="flex mr-3 text-white">
            <SongAction comRef={ref} song={song} playListId={playListId} />
          </div>
          <div className="text-sm">
            {getTime.caculateTimeFM(song?.duration)}
          </div>
        </div>
      </div>
    </div>
  )
}

interface ISongItemCard {
  id: string
  handlePlaySong?: (song: ISong, isPlaying?: boolean) => void
  isFocus: boolean
  isPlaying: boolean
}

export const SongItemCard: React.FC<ISongItemCard> = memo(
  ({ id, isFocus, isPlaying, handlePlaySong = () => {} }) => {
    // console.log("render-song-item-card")
    const song = useAppSelector((state) =>
      state.player?.playList?.find((songItem) => songItem?.encodeId == id),
    )
    if (!song) return null

    const href = createPlayerHref(
      song?.encodeId,
      store?.getState()?.player?.playListId,
    )
    useEffect(() => {
      if (isFocus) {
        const element = document.querySelector(
          `.song-playlist-item-player-${song?.encodeId}`,
        )
        element &&
          element.scrollIntoView({
            behavior: "smooth",
            block: "center",
          })
      }
    }, [isFocus])

    return (
      <div
        className={`group song-playlist-item-player-${
          song?.encodeId
        } border-b border-neutral-900 h-16 px-2 flex items-center justify-between cursor-all-scroll ${
          isFocus ? "bg-grayL" : ""
        }`}
      >
        <div className="flex items-center overflow-hidden mr-4">
          <div>
            <div
              onClick={() => handlePlaySong(song, isPlaying)}
              className="h-10 w-10 mr-4 relative cursor-pointer"
            >
              <img
                loading="lazy"
                src={song.thumbnailM}
                alt="song-thumbnail"
                className="rounded-sm h-full object-cover"
              />
              <InfoThumb isFocus={isFocus} isPlaying={isPlaying} />
            </div>
          </div>
          <div>
            <Link to={href}>
              <div
                onClick={() => handlePlaySong(song)}
                className="font-semibold whitespace-nowrap cursor-pointer"
              >
                <div>{song?.title}</div>
              </div>
            </Link>
            <div className="text-whiteT1 text-sm flex items-center whitespace-nowrap">
              <Artists artists={song?.artists} />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-whiteT1 flex items-center">
            <div className="flex text-white">
              <SongAction song={song} />
            </div>
            <div className="text-sm group-hover:hidden">
              {getTime.caculateTimeFM(song?.duration)}
            </div>
          </div>
        </div>
      </div>
    )
  },
)

interface IPropsSongRelated {
  song: ISong
  handlePlaySong?: (song: ISong, isPlaying?: boolean) => void
  playListId: string
}

export const SongItemRelated: React.FC<IPropsSongRelated> = ({
  song,
  playListId,
  handlePlaySong = () => {},
}) => {
  // console.log("related-song-rerender")
  const href = createPlayerHref(song?.encodeId, playListId)
  const songId = useAppSelector((state) => state.player.songId)
  const isPlaying_ = useAppSelector((state) => state.player.status.isPlaying)
  const isLoading = useAppSelector((state) => state.player?.status?.isLoading)

  const isPlaying = songId == song?.encodeId && isPlaying_
  const isFocus = songId == song?.encodeId

  return (
    <div
      className={`group border-b border-neutral-900 h-16 px-2 flex items-center justify-between ${
        isFocus ? "bg-grayL" : ""
      }`}
    >
      <div className="flex items-center flex-a2 overflow-hidden mr-4">
        <div>
          <div
            onClick={() => handlePlaySong(song, isPlaying)}
            className="h-10 w-10 mr-4 relative cursor-pointer"
          >
            <img
              loading="lazy"
              src={song.thumbnailM}
              alt="song-thumbnail"
              className="rounded-sm h-full object-cover"
            />
            <InfoThumb isFocus={isFocus} isPlaying={isPlaying} />
          </div>
        </div>
        <div>
          <Link to={href}>
            <div
              onClick={() => handlePlaySong(song)}
              className="font-semibold whitespace-nowrap cursor-pointer"
            >
              <div>{song?.title}</div>
            </div>
          </Link>
          <div className="text-whiteT1 text-sm flex items-center whitespace-nowrap">
            <Artists artists={song?.artists} />
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-whiteT1 flex items-center">
          <div className="flex mr-3 text-white">
            <SongAction song={song} />
          </div>
          {/* <div className="text-sm">
            {getTime.caculateTimeFM(song?.duration)}
          </div> */}
        </div>
      </div>
    </div>
  )
}

interface IPropsSongLinkItem {
  song: ISong
  handlePlaySong?: (song: ISong, isPlaying?: boolean) => void
  isShowDuration?: boolean
}

export const SongLinkItem: React.FC<IPropsSongLinkItem> = ({
  song,
  isShowDuration = false,
}) => {
  // console.log("related-song-rerender")
  if (!song?.encodeId) return null

  const href = createPlayerHref(song?.encodeId)

  return (
    <Link to={href}>
      <div
        className={`group border-b border-neutral-900 h-14 px-2 flex items-center justify-between hover:bg-grayL`}
      >
        <div className="flex items-center flex-a2 overflow-hidden mr-4">
          <div>
            <div className="h-9 w-9 mr-4 relative cursor-pointer">
              <img
                loading="lazy"
                src={song.thumbnailM}
                alt="song-thumbnail"
                className="rounded-sm h-full object-cover"
              />
            </div>
          </div>
          <div>
            <div className="font-semibold whitespace-nowrap cursor-pointer">
              <div>{song?.title}</div>
            </div>

            <div className="text-whiteT1 text-sm flex items-center whitespace-nowrap">
              <ArtistsDL artists={song?.artists} />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-whiteT1 flex items-center">
            <div className="flex mr-3 text-white">
              {/* <SongAction song={song} /> */}
            </div>
            {isShowDuration && (
              <div className="text-sm">
                {getTime.caculateTimeFM(song?.duration)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

interface IPropsPlaylistLinkItem {
  playlist: IPlayList
  handlePlaySong?: (song: ISong, isPlaying?: boolean) => void
}

export const PlaylistLinkItem: React.FC<IPropsPlaylistLinkItem> = ({
  playlist,
}) => {
  // console.log("related-song-rerender")
  if (!playlist?.encodeId) return null

  const href = createPlayListHref(playlist?.encodeId || "")

  return (
    <Link to={href}>
      <div
        className={`group border-b border-neutral-900 h-14 px-2 flex items-center justify-between hover:bg-grayL`}
      >
        <div className="flex items-center flex-a2 overflow-hidden mr-4">
          <div>
            <div className="h-9 w-9 mr-4 relative cursor-pointer">
              <img
                loading="lazy"
                src={playlist.thumbnailM}
                alt="song-thumbnail"
                className="rounded-sm h-full object-cover"
              />
            </div>
          </div>
          <div>
            <div className="font-semibold whitespace-nowrap cursor-pointer">
              <div>{playlist?.title}</div>
            </div>

            <div className="text-whiteT1 text-sm flex items-center whitespace-nowrap">
              <ArtistsDL artists={playlist?.artists || []} />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-whiteT1 flex items-center">
            <div className="flex mr-3 text-white">
              {/* <SongAction song={song} /> */}
            </div>
            {/* <div className="text-sm">
            {getTime.caculateTimeFM(song?.duration)}
          </div> */}
          </div>
        </div>
      </div>
    </Link>
  )
}

interface IPropsArtistLinkItem {
  artist: IArtists
  handlePlaySong?: (song: ISong, isPlaying?: boolean) => void
}

export const ArtistLinkItem: React.FC<IPropsArtistLinkItem> = ({ artist }) => {
  // console.log("related-song-rerender")
  if (!artist?.alias) return null
  const href = createArtistHref(artist?.alias || "")

  return (
    <Link to={href}>
      <div
        className={`group border-b border-neutral-900 h-14 px-2 flex items-center justify-between hover:bg-grayL`}
      >
        <div className="flex items-center flex-a2 overflow-hidden mr-4">
          <div>
            <div className="h-9 w-9 mr-4 relative cursor-pointer">
              <img
                loading="lazy"
                src={artist.thumbnailM}
                alt="song-thumbnail"
                className="rounded-full h-full object-cover"
              />
            </div>
          </div>
          <div>
            <div className="font-semibold whitespace-nowrap cursor-pointer">
              <div>{artist?.name}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="text-whiteT1 flex items-center">
            <div className="flex mr-3 text-white">
              {/* <SongAction song={song} /> */}
            </div>
            {/* <div className="text-sm">
            {getTime.caculateTimeFM(song?.duration)}
          </div> */}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default SongItem
