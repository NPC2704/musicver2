import store from "../app/store"
import { changePercentLoading } from "../features/loading/loadingSlice"

interface IState {
  value: number
}

const setLoadingPage = ({ value }: IState) => {
  store.dispatch(changePercentLoading(value))
}

export default setLoadingPage
