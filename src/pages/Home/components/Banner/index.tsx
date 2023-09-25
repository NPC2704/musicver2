import Carousel from "../../../../components/Carousel"
import { useTranslation } from "react-i18next"
import BannerItem from "./components/BannerItem"
import { IBanner } from "../../../../types/item"
import { HomeSectionWrapper } from "../../../../components/Wrapper/SectionWrapper"

interface ISong {
  items: IBanner[]
  title: string
}

interface IProps {
  data: ISong
}

const Banner: React.FC<IProps> = ({ data }) => {
  const { t } = useTranslation()
  return (
    <HomeSectionWrapper>
      <Carousel
        title={t("popular")}
        items={data?.items}
        renderItem={(item, index) => {
          return <BannerItem key={index} item={item} />
        }}
      />
    </HomeSectionWrapper>
  )
}

export default Banner
