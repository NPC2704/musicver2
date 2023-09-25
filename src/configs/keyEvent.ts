import store from "../app/store"
import { player_ } from "../utils/player_"

function keyEventConfig() {
  document.body.onkeydown = function (e) {
    const element = e?.target as HTMLElement
    const _TAG = element?.tagName

    if (_TAG?.toLowerCase() == "input") {
      return
    }

    if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
      e.preventDefault()
      player_?.toggle()
    }

    // if (e.keyCode == 38) {
    //   e.preventDefault()

    //   // up arrow
    // }
    // if (e.keyCode == 40) {
    //   e.preventDefault()

    //   // down arrow
    // }
    if (e.key == "ArrowLeft" || e.code == "ArrowLeft" || e.keyCode == 37) {
      e.preventDefault()

      const status = store?.getState()?.player?.status
      const duration = status?.duration
      const current = status?.currTime
      const _next = current - 5
      let next = _next < 0 ? 0 + Math?.random() : _next

      player_?.rewind({ to: Number(next || 0) })
      // left arrow
    }
    if (e.key == "ArrowRight" || e.code == "ArrowRight" || e.keyCode == 39) {
      e.preventDefault()

      const status = store?.getState()?.player?.status
      const duration = status?.duration
      const current = status?.currTime
      const _next = current + 5
      let next = _next < 0 + Math?.random() ? 0 : _next

      // right arrow
      player_?.rewind({ to: Number(next || 0) })
    }
  }
}
export default keyEventConfig
