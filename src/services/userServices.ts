import { get, post } from "../utils/request"
import storage from "../utils/storage"
import API from "./API"
import getHeaderToken from "../utils/getHeaderToken"

async function likeSong(body: object) {
  const API_ = API.LIKE_SONG
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

async function addToPlaylist(body: object) {
  const API_ = API.ADD_TO_PLAYLIST

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

async function removeToPlaylist(body: object) {
  const API_ = API.REMOVE_TO_PLAYLIST
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

async function initData() {
  const API_ = API.INIT_DATA

  const data = await get(
    API_,
    {},
    {
      ...getHeaderToken(),
    },
  )
  return data
}

export { likeSong, initData, addToPlaylist, removeToPlaylist }
