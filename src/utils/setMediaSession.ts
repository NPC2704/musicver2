import { player_ } from "./player_"

interface MediaSessionProps {
  title?: string
  artist?: string
  thumb?: string
}

function setMediaSession({ title, artist, thumb = "" }: MediaSessionProps) {
  if ("mediaSession" in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: title,
      artist: artist,
      //   album: "Whenever You Need Somebody",
      artwork: [
        {
          src: thumb,
          sizes: "96x96",
          type: "image/png",
        },
        {
          src: thumb,
          sizes: "128x128",
          type: "image/png",
        },
        {
          src: thumb,
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: thumb,
          sizes: "256x256",
          type: "image/png",
        },
        {
          src: thumb,
          sizes: "384x384",
          type: "image/png",
        },
        {
          src: thumb,
          sizes: "512x512",
          type: "image/png",
        },
      ],
    })

    navigator.mediaSession.setActionHandler("play", function () {
      player_?.play()
    })
    navigator.mediaSession.setActionHandler("pause", function () {
      player_?.pause()
    })
    // navigator.mediaSession.setActionHandler("seekbackward", function () {
    //   player_?.next()
    // })
    // navigator.mediaSession.setActionHandler("seekforward", function () {
    //   player_?.pre()
    // })
    navigator.mediaSession.setActionHandler("previoustrack", function () {
      player_?.pre()
    })
    navigator.mediaSession.setActionHandler("nexttrack", function () {
      player_?.next()
    })
  }
}

export default setMediaSession
