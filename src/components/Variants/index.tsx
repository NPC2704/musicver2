import Skeleton from "@mui/material/Skeleton"
import { grey } from "@mui/material/colors"
import Loader from "../Loader"

export const SongImgThumbVariant: React.FC = () => {
  // create empty array have 4 items
  const arr = Array(Math.floor(4)).fill(0)

  // const animate = "pulse"
  const animate = "wave"

  const mainStyle = {
    bgcolor: "#ffffff10",
    // opaticy: 0.5,
  }

  return (
    <div className="w-full h-full px-6 relative flex justify-center items-center">
      <Skeleton
        sx={{ ...mainStyle }}
        variant="rounded"
        width={"100%"}
        height={"100%"}
        animation={animate}
        color=""
      />
      <div className="absolute ">
        <Loader size={50} />
      </div>
    </div>
  )
}
export const SongPlayerThumbVariant: React.FC = () => {
  // create empty array have 4 items
  const arr = Array(Math.floor(4)).fill(0)

  // const animate = "pulse"
  const animate = "wave"

  const mainStyle = {
    bgcolor: "#ffffff10",
    // opaticy: 0.5,
  }

  return (
    <div className="justify-between w-full relative">
      <div className="flex w-49/100">
        <div>
          <Skeleton
            sx={{ ...mainStyle }}
            variant="rounded"
            width={44}
            height={44}
            animation={animate}
            color=""
          />
        </div>
        <div className="ml-3 flex flex-col justify-between">
          <div>
            <Skeleton
              sx={{ ...mainStyle }}
              variant="rounded"
              width={150}
              height={20}
              animation={animate}
              color=""
            />
          </div>
          <div>
            <Skeleton
              sx={{ ...mainStyle }}
              variant="rounded"
              width={100}
              height={20}
              animation={animate}
              color=""
            />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  )
}
