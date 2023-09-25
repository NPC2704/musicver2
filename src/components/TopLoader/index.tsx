import { useSelector, useDispatch } from "react-redux"
import LoadingBar from "react-top-loading-bar"
import { memo } from "react"
import { useAppSelector } from "../../app/hooks"

const TopLoader: React.FC = () => {
  // const dispatch = useDispatch();
  const progress = useAppSelector((state) => state.loading.value)
  return (
    <LoadingBar
      waitingTime={500}
      progress={progress}
      // onLoaderFinished={() => dispatch(setToploaderProgress(0))}
      color="var(--turquoise)"
    />
  )
}

export default memo(TopLoader)
