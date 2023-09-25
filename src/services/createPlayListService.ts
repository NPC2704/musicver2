import { get, post } from "../utils/request"
import storage from "../utils/storage"
import API from "./API"
import getHeaderToken from "../utils/getHeaderToken"

async function createPlayListService(body: object) {
  const API_ = API.CREATE_PLAYLIST

  return post(
    API_,
    { ...body },
    {
      headers: {
        ...getHeaderToken(),
      },
    },
  ).then((data) => {
    return data
  })
}

async function updatePlayListService(body: object) {
  const API_ = API.UPDATE_PLAYLIST

  return post(
    API_,
    { ...body },
    {
      headers: {
        ...getHeaderToken(),
      },
    },
  ).then((data) => {
    return data
  })
}

export default createPlayListService

export { updatePlayListService }
