import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import store from "../../../app/store"
import DragDrop from "../../../components/DragDrop"
import Loader from "../../../components/Loader"
import { setPlayList, togglePlayer } from "../../../features/player/playerSlice"
import getPlayListInfoService from "../../../services/playListService"
import { ISong } from "../../../types/item"
import { playSong, setSong } from "../../../utils/playSong"
import { player_ } from "../../../utils/player_"
import { showPlayer } from "../../../utils/ui"
import SongItem, { SongItemCard } from "./SongItem"
import { useState, useEffect, memo, useCallback } from "react"
import React, { Component } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { createPlayerHref } from "../../../utils/createHref"
import Artists from "../../../components/Artists"

interface SongListProps {
  list: ISong[]
  id: string
}

const SongList: React.FC<SongListProps> = ({ list, id }) => {
  const handlePlaySong = (song: ISong, isPlaying?: boolean) => {
    showPlayer(true)
    if (!isPlaying) {
      setSong({ id: song.encodeId, playListId: id })
      player_.play()
    } else {
      player_.pause()
    }
  }

  return (
    <div className="mt-14">
      {list.map((song, index) => (
        <SongItem
          handlePlaySong={handlePlaySong}
          key={index}
          song={song}
          playListId={id}
        />
      ))}
    </div>
  )
}

interface SongListLaysProps {
  id: string
}

// const SongListLays: React.FC<SongListLaysProps> = ({ id }) => {
//   // const [list, setList] = useState<ISong[]>([])
//   const list = useAppSelector((state) => state?.player?.playList)
//   const [isLoading, setIsLoading] = useState<boolean>(true)

//   // useEffect(() => {
//   //   if (!id) return setIsLoading(false)
//   //   setIsLoading(true)
//   //   setList([])
//   //   setTimeout(() => {
//   //     getPlayListInfoService(id)
//   //       .then((fb) => {
//   //         setIsLoading(false)
//   //         if (fb?.result == 1) {
//   //           setList(fb?.data?.data?.song?.items || [])
//   //         }
//   //       })
//   //       .catch((error) => {
//   //         setIsLoading(false)
//   //       })
//   //   }, 500)
//   // }, [id])

//   useEffect(() => {
//     setIsLoading(false)
//   }, [list])

//   useEffect(() => {
//     if (!id) return setIsLoading(false)
//     setIsLoading(true)
//   }, [id])

//   const handlePlaySong = (song: ISong, isPlaying?: boolean) => {
//     showPlayer(true)

//     if (!isPlaying) {
//       setSong({ id: song.encodeId, playListId: id })
//       player_.play()
//     } else {
//       player_.pause()
//     }
//   }

//   return isLoading ? (
//     <div className="w-full h-full py-5 flex justify-center items-center">
//       <Loader />
//     </div>
//   ) : (
//     <div className="mt-0">
//       {list.map((song, index) => (
//         <SongItemCard handlePlaySong={handlePlaySong} key={index} song={song} />
//       ))}
//     </div>
//   )
// }

////////////////////////////////////////////////////////////////////////////////////////////
const SongListLaysTitle: React.FC = () => {
  const listInfo = useAppSelector((state) => state?.player?.playListInfo)
  const list = useAppSelector((state) => state?.player?.playList)
  const songId = useAppSelector((state) => state?.player?.songId)
  const index = list?.findIndex((s) => s?.encodeId == songId)
  return listInfo?.title && list?.length ? (
    <div className="">
      <div className="h-12 text-sm px-2 text-whiteT1 rounded-tl-none rounded-tr-none border border-t-0 border-neutral-800 flex items-center justify-between relative z-10">
        <div className="pr-5">
          {index + 1}/{list?.length}
        </div>
        <div className="overflow-hidden h-full whitespace-nowrap flex flex-col justify-center">
          <div>Playlist ‧ {listInfo?.title}</div>
          <div>{/* <Artists artists={listInfo?.artists || []} /> */}</div>
        </div>
      </div>
    </div>
  ) : null
}

const SongListLays: React.FC<SongListLaysProps> = memo(function SongListLays({
  id,
}) {
  const list = useAppSelector((state) => state?.player?.playList)
  const currSong = useAppSelector((state) => state?.player?.songId)
  const isPlaying_ = useAppSelector((state) => state.player.status.isPlaying)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const dispath = useAppDispatch()
  const navigate = useNavigate()

  const handlePlaySong = useCallback(
    (song: ISong, isPlaying?: boolean) => {
      showPlayer(true)

      if (!isPlaying) {
        setSong({ id: song.encodeId, playListId: id })
        navigate(
          createPlayerHref(
            song?.encodeId,
            store?.getState()?.player?.playListId,
          ),
        )
        player_.play()
      } else {
        player_.pause()
      }
    },
    [id],
  )

  const onDragEnd = (newList: ISong[]) => {
    if (newList?.length) {
      dispath(setPlayList(newList))
    }
  }

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 500)
    // setIsLoading(false)
  }, [list])

  useEffect(() => {
    if (!id) return setIsLoading(false)
    setIsLoading(true)
  }, [id])

  return isLoading ? (
    <div className="w-full h-full py-5 flex justify-center">
      <Loader />
    </div>
  ) : (
    <div className="mt-0">
      <DragDrop
        dropId="song-player-list"
        onDragEnd={onDragEnd}
        renderList={list}
        renderItem={(song, index) => {
          const isPlaying = currSong == song?.encodeId && isPlaying_
          return (
            <SongItemCard
              isPlaying={isPlaying}
              isFocus={currSong == song?.encodeId}
              handlePlaySong={handlePlaySong}
              key={index}
              id={song?.encodeId}
              // song={song}
            />
          )
        }}
      />
    </div>
  )
})

export { SongList, SongListLays, SongListLaysTitle }
