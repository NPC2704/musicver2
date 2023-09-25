import { get, post } from "../utils/request"
import API from "./API"

function getArtistInfoService(id: string | number) {
  const API_ = `${API.ARTIST_INFO_API}?id=${id}`
  return get(API_).then((data) => {
    return data
  })
}

export default getArtistInfoService
