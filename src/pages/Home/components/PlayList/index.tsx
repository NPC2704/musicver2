import Carousel from "../../../../components/Carousel"
import { useTranslation } from "react-i18next"
import PlayListItem from "./components/PlayListItem"
import { IBanner } from "../../../../types/item"
import { HomeSectionWrapper } from "../../../../components/Wrapper/SectionWrapper"

interface ISong {
  items: IBanner[]
  title: string
}

interface IProps {
  data: ISong
}

const PlayList: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslation()
  return (
    <HomeSectionWrapper>
      <Carousel
        title={data?.title}
        items={data?.items}
        renderItem={(item, index) => {
          return <PlayListItem key={index} item={item} />
        }}
      />
    </HomeSectionWrapper>
  )
}

export default PlayList
