import { CiRepeat } from "react-icons/ci"
import { CirButton } from "../../../../Button"
import { useAppSelector } from "../../../../../app/hooks"
import { player_ } from "../../../../../utils/player_"

const RepeatOption: React.FC = () => {
  const isRepeat = useAppSelector((state) => state?.player?.status?.isRepeat)

  return (
    <div className="mr-3">
      <CirButton
        isTransparent
        onClick={() => {
          player_.toggleRepeat()
        }}
      >
        <CiRepeat
          size={25}
          color={isRepeat ? "var(--turquoise)" : "var(--whiteT1)"}
        />
      </CirButton>
    </div>
  )
}

export default RepeatOption
