import { useAppSelector } from "../../../../../../app/hooks"
import { memo } from "react"
import { SongListLays } from "../../../../../../pages/PlayList/components/SongList"

interface IProps {}

const PlayListLays: React.FC<IProps> = () => {
  const id = useAppSelector((state) => state.player?.playListId)

  return <SongListLays id={id} />
}

export default memo(PlayListLays)
