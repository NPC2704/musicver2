import { useEffect, useState, Fragment } from "react"
import { useDispatch } from "react-redux"
import discoverPageService from "../../services/discoverPageService"
import Banner from "../Home/components/Banner"
import PlayList from "./components/PlayList"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { changePercentLoading } from "../../features/loading/loadingSlice"
import setLoadingPage from "../../utils/setLoadingPage"
import { Variants } from "../Home/components/Variants"
import { useSearchParams } from "react-router-dom"
import { SectionTitle2xl } from "../../components/SectionTitle"
import AddPlaylistModal from "../../components/Modal/AddPlaylistModal"

interface IProps {}

const Library: React.FC<IProps> = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const id = searchParams.get("id") || ""
  const playlist = useAppSelector((state) => state?.user?.playList)
  const user = useAppSelector((state) => state?.user?.data)
  const isShow = useAppSelector((state) => state?.player?.isShow)

  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(!true)

  // useEffect(() => {
  //   setLoadingPage({ value: 30 })
  //   setIsLoading(true)
  //   discoverPageService()
  //     .then((fb) => {
  //       setIsLoading(false)
  //       if (fb?.result == 1) {
  //         setData(fb.data?.data?.items)
  //       } else {
  //         setData([])
  //       }
  //       setLoadingPage({ value: 100 })
  //     })
  //     .catch((error) => {
  //       setData([])
  //       setLoadingPage({ value: 100 })
  //       setIsLoading(false)
  //     })
  // }, [])

  return isLoading ? (
    <Variants />
  ) : (
    <div className="">
      <div>
        <div className="my-7">
          <SectionTitle2xl title="Danh sách phát của bạn"></SectionTitle2xl>
        </div>
        <PlayList data={playlist || []} />
      </div>
    </div>
  )
}

export default Library
