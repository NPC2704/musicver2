import { get, post } from "../utils/request"
import API from "./API"

type SoT = string | number

function getSongService(id: SoT) {
  const API_ = `${API.SONG_INFO_API}?id=${id}`

  return get(API_).then((data) => {
    return data
  })
}

function getSongInfoService(id: SoT) {
  const API_ = `${API.SONG_INFO_DETAILT_API}?id=${id}`

  return get(API_).then((data) => {
    return data
  })
}

function getSongLyricService(id: SoT) {
  const API_ = `${API.SONG_INFO_LYRIC_API}?id=${id}`

  return get(API_).then((data) => {
    return data
  })
}

export default getSongService
export { getSongInfoService, getSongLyricService }
