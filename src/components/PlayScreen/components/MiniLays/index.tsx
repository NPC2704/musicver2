import { MdArrowLeft, MdArrowRight } from "react-icons/md"
import LyricLays from "../Lays/components/LyricLays"
import { CirButton } from "../../../Button"
import { useAppSelector } from "../../../../app/hooks"
import { useState } from "react"

interface IMiniLays {}

const MiniLays: React.FC = () => {
  const isShowInfo = useAppSelector((state) => state?.player?.isShoaInfo)
  const isShowPlayser = useAppSelector((state) => state?.player?.isShow)

  const [isShow, setIsShow] = useState(true)
  return (
    <div
      className={`animate__animated animate__fadeInUp animate__delay-1s fixed bottom-playcard right-0 py-3 px-3 ${
        !isShowInfo && isShowPlayser ? "block" : "hidden"
      }`}
    >
      <div
        className={`h-12 border border-neutral-800 bg-grayL flex items-center ${
          isShow ? "rounded-sm" : "rounded-full border-transparent"
        }`}
      >
        <div
          className={`flex-1 transition-all overflow-hidden h-full flex justify-center items-center ${
            isShow
              ? "w-80 opacity-100 whitespace-nowrap"
              : "w-0 whitespace-nowrap opacity-0"
          }`}
        >
          <LyricLays isSingle />
        </div>
        <div
          className={`transition-all h-full w-12 border-l border-neutral-800 flex justify-center items-center ${
            isShow ? "rotate-0" : "rotate-180 border-transparent"
          }`}
        >
          <CirButton
            isRadius={!isShow}
            isTransparent
            radius={"48px"}
            onClick={() => setIsShow(!isShow)}
          >
            <MdArrowRight size={30} />
          </CirButton>
        </div>
      </div>
    </div>
  )
}

export default MiniLays
