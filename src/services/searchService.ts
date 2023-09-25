import { get, post } from "../utils/request"
import API from "./API"

function searchService(id: string) {
  const API_ = `${API.SEARCH_API}?id=${id}`
  return get(API_).then((data) => {
    return data
  })
}

export default searchService
