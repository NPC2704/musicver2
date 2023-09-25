import Carousel from "../../../../components/Carousel"
import { useTranslation } from "react-i18next"
import PlayListItem from "./components/PlayListItem"
import { IBanner, IPlayList } from "../../../../types/item"
import { HomeSectionWrapper } from "../../../../components/Wrapper/SectionWrapper"
import AddPlaylistModal from "../../../../components/Modal/AddPlaylistModal"
import { PiPlusLight } from "react-icons/pi"

interface IProps {
  data: IPlayList[]
}

const PlayList: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslation()
  return (
    <HomeSectionWrapper>
      <div className="flex flex-wrap">
        {data?.map((item, index) => {
          return <PlayListItem key={index} item={item} />
        })}
        <AddPlaylistModal
          button={
            <div className="cursor-pointer h-28 w-28 bg-white-opacity-15 hover:bg-white-opacity-25 rounded flex justify-center items-center overflow-hidden">
              <PiPlusLight className="text-whiteT1 text-3xl" />
            </div>
          }
        />
      </div>
    </HomeSectionWrapper>
  )
}

export default PlayList
