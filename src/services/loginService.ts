import { get, post } from "../utils/request"
import storage from "../utils/storage"
import API from "./API"

async function googleLoginService(body: object) {
  const API_ = API.GOOGLE_AUTH_LOGIN

  return post(API_, { ...body }).then((data) => {
    return data
  })
}

export { googleLoginService }
