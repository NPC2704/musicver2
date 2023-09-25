import storage from "./storage"

export const getHeaderToken = () => {
  const token = storage.getItem("token") || ""

  return token
    ? {
        "authentication-token": `Bearer ${token}`,
      }
    : {}
}

export default getHeaderToken
