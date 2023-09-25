import { ReactNode } from "react"
import toast, { Toaster } from "react-hot-toast"
import { TfiClose } from "react-icons/tfi"

interface IProps {
  infoText: string | ReactNode
  t: any
}

export const InfoToast: React.FC<IProps> = ({ infoText, t }) => {
  return (
    <div
      className={`${
        t.visible ? "animate-fadeIn" : "animate-fadeIn"
      } max-w-md w-full bg-grayL shadow-lg rounded pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="mt-1 text-base text-white">{infoText}</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={() => {
            toast.remove(t?.id)
          }}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-whiteT1 hover:text-white"
        >
          <TfiClose size={15} />
        </button>
      </div>
    </div>
  )
}

export const MiniToast: React.FC<IProps> = ({ infoText, t }) => {
  return (
    <div
      className={`${
        t.visible ? "animate-fadeIn" : "animate-fadeIn"
      } max-w-md w-full bg-grayL shadow-lg rounded pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-2">
        <div className="flex items-start">
          <div className="ml-2 flex-1">
            <p className="text-sm text-white">{infoText}</p>
          </div>
        </div>
      </div>
      <div className="flex">
        <button
          onClick={() => {
            toast.remove(t?.id)
          }}
          className="w-full border border-transparent rounded-none rounded-r-lg p-2 flex items-center justify-center text-sm font-medium text-whiteT1 hover:text-white"
        >
          <TfiClose size={15} />
        </button>
      </div>
    </div>
  )
}
