import { CirButton } from "../Button"
import SectionTitle from "../SectionTitle"
import { ReactNode, useEffect, useRef, useCallback, useState } from "react"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs"

interface Iprops {
  title: string
  items: any[]
  renderItem: (item: any, index: number) => ReactNode
  titleSize?: string
  titleCenter?: boolean
}

interface IScrollActive {
  left: boolean
  right: boolean
}

interface IOffset {
  left: number
  offset: number
  offsetW: number
  width: number
  currIndex: number
}

const Carousel: React.FC<Iprops> = ({
  title,
  titleSize = "3xl",
  items,
  renderItem,
  titleCenter = false,
}) => {
  const scrollRef = useRef<HTMLInputElement>(null)
  const offsetRef = useRef<HTMLInputElement>(null)

  const offsetState = useRef<IOffset>({
    left: 0,
    offset: 0,
    offsetW: 0,
    width: 0,
    currIndex: 0,
  })

  const [scrollActive, setScrollActive] = useState<IScrollActive>({
    right: true,
    left: false,
  })

  const getScrollState = () => {
    const l = Number(scrollRef?.current?.scrollLeft)
    const ow = Number(offsetRef?.current?.offsetWidth)
    const sw = Number(scrollRef?.current?.offsetWidth)
    offsetState.current = {
      left: l,
      offset: l + sw,
      offsetW: ow,
      width: sw,
      currIndex: l / sw,
    }
  }

  const handleOnScroll = useCallback(() => {
    getScrollState()
    const oState = offsetState.current

    setScrollActive({
      right: oState.offsetW - oState.offset > 100,
      left: oState.left > 10,
    })
  }, [])

  const handleScrollPress = (type: string) => {
    const oState: IOffset = offsetState.current
    const currIndex: number =
      type == "left"
        ? Math.floor(oState.currIndex - 0.2)
        : Math.ceil(oState.currIndex + 0.2)

    scrollRef.current?.scrollTo({
      left: currIndex * oState.width,
      behavior: "smooth",
    })
    // oState.currIndex = type == "left" ? currIndex - 1 : currIndex + 1
  }

  useEffect(() => {
    scrollRef?.current?.addEventListener("scroll", handleOnScroll)
    getScrollState()
    setScrollActive({
      right:
        Number(offsetRef?.current?.offsetWidth) >
        Number(scrollRef?.current?.offsetWidth),
      left: false,
    })
    // remove event scroll when unmount
    return () =>
      scrollRef?.current?.removeEventListener("scroll", handleOnScroll)
  }, [])

  return items?.length ? (
    <div className="overscroll-x-none">
      <div className="py-6 flex justify-between relative">
        <SectionTitle title={title} fontSize={titleSize} />
        <div
          className={`flex right-0 bottom-3 ${titleCenter ? "" : "absolute"}`}
        >
          <CirButton
            disabled={!scrollActive.left}
            onClick={() => handleScrollPress("left")}
            radius={"40px"}
          >
            <BsChevronLeft size={14} />
          </CirButton>
          <CirButton
            disabled={!scrollActive.right}
            onClick={() => handleScrollPress("right")}
            radius={"40px"}
            styles={{ marginLeft: "12px" }}
          >
            <BsChevronRight size={14} />
          </CirButton>
        </div>
      </div>
      <div ref={scrollRef} className="flex overflow-auto w-full no-scrollbar">
        <div ref={offsetRef} className="flex">
          {items?.map((item, index) => renderItem(item, index))}
        </div>
      </div>
    </div>
  ) : null
}

export default Carousel
