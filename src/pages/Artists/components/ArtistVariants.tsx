import Skeleton from "@mui/material/Skeleton"
import { grey } from "@mui/material/colors"

export const ArtistVariants: React.FC = () => {
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
      <div className="flex w-49/100 mb-11">
        {/* <div>
          <Skeleton
            sx={{ ...mainStyle }}
            variant="rounded"
            width={256}
            height={256}
            animation={animate}
            color=""
          />
        </div> */}
        <div className="flex flex-col justify-between">
          <div>
            <Skeleton
              sx={{ ...mainStyle }}
              variant="rounded"
              width={360}
              height={50}
              animation={animate}
              color=""
            />
            <Skeleton
              sx={{ ...mainStyle, marginTop: "20px" }}
              variant="rounded"
              width={360}
              height={20}
              animation={animate}
              color=""
            />
            <Skeleton
              sx={{ ...mainStyle, marginTop: "20px" }}
              variant="rounded"
              width={180}
              height={50}
              animation={animate}
              color=""
            />
          </div>
          {/* <div>
            <Skeleton
              sx={{ ...mainStyle }}
              variant="rounded"
              width={360}
              height={50}
              animation={animate}
              color=""
            />
          </div> */}
        </div>
      </div>
      <div>
        {arr.map((_, index) => {
          return (
            <div key={index} className="flex mb-2">
              <Skeleton
                sx={{ ...mainStyle, marginRight: "8px" }}
                variant="rounded"
                width={80}
                height={40}
                animation={animate}
                color=""
              />
              <Skeleton
                sx={{ ...mainStyle }}
                variant="rounded"
                width={"100%"}
                height={40}
                animation={animate}
                color=""
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
