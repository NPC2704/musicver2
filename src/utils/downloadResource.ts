import toast from "react-hot-toast"
import removeVietnameseTones from "./removeVietnameseTones"

function forceDownload(blob: string, filename: string) {
  var a = document.createElement("a")
  a.download = filename
  a.href = blob
  // For Firefox https://stackoverflow.com/a/32226068
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export default function downloadResource(url: string, filenameBs: string) {
  if (!filenameBs || !url) return false
  const filename = removeVietnameseTones(filenameBs?.replaceAll(" ", ""))
  const promise = fetch(url, {
    headers: new Headers({
      Origin: location.origin,
    }),
    mode: "cors",
  }).then((response) => response.blob())
  toast.promise(promise, {
    loading: `Đang chuẩn bị file: ${filename}.mp3`,
    success: (blob) => {
      try {
        let blobUrl = window.URL.createObjectURL(blob)
        forceDownload(blobUrl, filename)
      } catch (error) {}
      return "Sẵn sàng để lưu"
    },
    error: "Không thể tải",
  })
  // .then((response) => response.blob())
  // .then((blob) => {
  //   let blobUrl = window.URL.createObjectURL(blob)
  //   forceDownload(blobUrl, filename)
  // })
  // .catch((e) => console.error(e))
}
