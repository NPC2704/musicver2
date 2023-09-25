import { useAppDispatch, useAppSelector } from "../../../app/hooks"

const MaskColor: React.FC = () => {
  const songInfo = useAppSelector((state) => state?.player?.songInfo)
  const isShowInfo = useAppSelector((state) => state?.player?.isShoaInfo)
  return (
    <>
      <div
        style={{
          backgroundImage: songInfo?.thumbnailM
            ? `url(${songInfo?.thumbnailM})`
            : "url(/static/images/body-bg.jpg)",
          boxShadow: "inset 0 0 30px 15px #212121",
        }}
        className={`absolute h-80 top-0 left-0 bg-no-repeat bg-cover ${
          isShowInfo ? "right-[12px]" : "right-0"
        }`}
      ></div>
      <div className="absolute h-80 top-0 left-0 right-0 bg-gradient-to-b from-from-body-bg-gradiant to-to-body-bg-gradiant"></div>
    </>
  )
}

export default MaskColor
