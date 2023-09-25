import Skeleton from "@mui/material/Skeleton"
import { grey } from "@mui/material/colors"

export const Variants: React.FC = () => {
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
      <div>
        <Skeleton
          sx={{ ...mainStyle, marginBottom: "16px" }}
          variant="rounded"
          width={192}
          height={60}
          animation={animate}
          color=""
        />
        <div className="flex w-49/100 mb-11">
          <div>
            <Skeleton
              sx={{ ...mainStyle, marginRight: "16px" }}
              variant="rounded"
              width={260}
              height={192}
              animation={animate}
              color=""
            />
          </div>

          <div>
            <Skeleton
              sx={{ ...mainStyle, marginRight: "16px" }}
              variant="rounded"
              width={260}
              height={192}
              animation={animate}
              color=""
            />
          </div>

          <div>
            <Skeleton
              sx={{ ...mainStyle, marginRight: "16px" }}
              variant="rounded"
              width={260}
              height={192}
              animation={animate}
              color=""
            />
          </div>

          <div>
            <Skeleton
              sx={{ ...mainStyle, marginRight: "16px" }}
              variant="rounded"
              width={260}
              height={192}
              animation={animate}
              color=""
            />
          </div>
        </div>
        {arr.map((_, index) => {
          return (
            <div key={index}>
              <Skeleton
                sx={{ ...mainStyle, marginBottom: "16px" }}
                variant="rounded"
                width={192}
                height={60}
                animation={animate}
                color=""
              />
              <div className="flex w-49/100 mb-11">
                <div>
                  <Skeleton
                    sx={{ ...mainStyle, marginRight: "16px" }}
                    variant="rounded"
                    width={192}
                    height={192}
                    animation={animate}
                    color=""
                  />
                  <Skeleton
                    sx={{ ...mainStyle, marginTop: "16px" }}
                    variant="rounded"
                    width={192}
                    height={50}
                    animation={animate}
                    color=""
                  />
                </div>

                <div>
                  <Skeleton
                    sx={{ ...mainStyle, marginRight: "16px" }}
                    variant="rounded"
                    width={192}
                    height={192}
                    animation={animate}
                    color=""
                  />
                  <Skeleton
                    sx={{ ...mainStyle, marginTop: "16px" }}
                    variant="rounded"
                    width={192}
                    height={50}
                    animation={animate}
                    color=""
                  />
                </div>

                <div>
                  <Skeleton
                    sx={{ ...mainStyle, marginRight: "16px" }}
                    variant="rounded"
                    width={192}
                    height={192}
                    animation={animate}
                    color=""
                  />
                  <Skeleton
                    sx={{ ...mainStyle, marginTop: "16px" }}
                    variant="rounded"
                    width={192}
                    height={50}
                    animation={animate}
                    color=""
                  />
                </div>

                <div>
                  <Skeleton
                    sx={{ ...mainStyle, marginRight: "16px" }}
                    variant="rounded"
                    width={192}
                    height={192}
                    animation={animate}
                    color=""
                  />
                  <Skeleton
                    sx={{ ...mainStyle, marginTop: "16px" }}
                    variant="rounded"
                    width={192}
                    height={50}
                    animation={animate}
                    color=""
                  />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
