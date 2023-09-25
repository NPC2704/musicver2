import { Link, useNavigate } from "react-router-dom"
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
import { useState, useEffect, memo, useCallback } from "react"
import React, { Component } from "react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { createPlayListHref, createPlayerHref } from "../../../utils/createHref"
import Artists from "../../../components/Artists"
import SongItem from "../../PlayList/components/SongItem"
import { Button } from "../../../components/Button"
import SectionTitle, {
  SectionTitle2xl,
  SectionTitleXl,
} from "../../../components/SectionTitle"

interface SongListProps {
  list: ISong[]
  id: string
}

const SongListArtistPage: React.FC<SongListProps> = ({ list, id }) => {
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
    <div className="mt-14 pb-5">
      <div className="mb-4">
        <SectionTitle2xl fontSize="2xl" title="Bài hát" />
      </div>
      {list.map(
        (song, index) =>
          index < 10 && (
            <SongItem
              handlePlaySong={handlePlaySong}
              key={index}
              song={song}
              playListId={id}
            />
          ),
      )}
      <Link to={createPlayListHref(id)}>
        <div className="flex mt-3">
          <Button isStopPropagation={false} styles={{ padding: "8px 16px" }}>
            <div className="text-sm font-bold">Xem tất cả bài hát</div>
          </Button>
        </div>
      </Link>
    </div>
  )
}

export { SongListArtistPage }
