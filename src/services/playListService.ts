import { get, post } from "../utils/request"
import API from "./API"
import getHeaderToken from "../utils/getHeaderToken"

function getPlayListInfoService(id: string | number) {
  let API_ = `${API.PLAYLIST_INFO_API}?id=${id}`
  if (id == "favorite") {
    API_ = API.USER_FAVORITE_LIST
  }
  return get(
    API_,
    {},
    {
      ...getHeaderToken(),
    },
  ).then((data) => {
    return data
  })
}

export default getPlayListInfoService
