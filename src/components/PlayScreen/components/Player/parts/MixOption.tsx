import { CiRepeat, CiShuffle } from "react-icons/ci"
import { CirButton } from "../../../../Button"
import { useAppSelector } from "../../../../../app/hooks"
import { player_ } from "../../../../../utils/player_"
import { useState } from "react"

const MixOption: React.FC = () => {
  const isMix = useAppSelector((state) => state?.player?.status?.isMix)
  const [clickToggleListener, setClickToggleListener] = useState<boolean>(true)

  return (
    <div className="mr-3">
      <CirButton
        isTransparent
        onClick={() => {
          // player_.toggleMix()
          player_.mix()
          setClickToggleListener(!clickToggleListener)
        }}
      >
        <div
          className={`transition-all ${
            clickToggleListener ? "scale-y-100" : "-scale-y-100"
          }`}
        >
          <CiShuffle
            size={25}
            color={isMix ? "var(--turquoise)" : "var(--whiteT1)"}
          />
        </div>
      </CirButton>
    </div>
  )
}

export default MixOption
