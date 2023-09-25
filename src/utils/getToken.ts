import storage from "./storage"

export default function () {
  const token = storage.getItem("token") || ""
  return token
}
