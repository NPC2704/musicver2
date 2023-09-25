import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import { ReactNode, useState, useRef } from "react"
import { useAppSelector } from "../../../app/hooks"
import { SectionTitleXl } from "../../SectionTitle"
import { ui } from "../../../utils/ui"
import { Button, CirButton } from "../../Button"
import { TfiClose } from "react-icons/tfi"
import handleData from "../../../utils/handleData"
import toast from "react-hot-toast"
const ShareModal: React.FC = () => {
  const { isShow, type, link } = useAppSelector(
    (state) => state?.ui?.shareModal,
  )

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

  const handleClose = () => {
    ui?.hiddenShareModal()
  }

  const handleCoppy = () => {
    if (!link) return
    navigator.clipboard.writeText(link)
    toast.success("Đã sao chép đường liên kết")
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={isShow}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        PaperProps={{
          style: {
            backgroundColor: "var(--grayL)",
            boxShadow: "none",
            border: "1px solid var(--border-mainL1)",
            // width: "384px",
          },
        }}
      >
        <DialogTitle id="dialog-title">
          <div className="flex pb-2 items-center justify-between border-b border-[var(--border-mainL1)]">
            <SectionTitleXl title="Chia sẻ" />
            <CirButton onClick={handleClose} isTransparent>
              <TfiClose className="text-lg" />
            </CirButton>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="flex items-center bg-main-bg px-3 py-1 rounded border-bdm">
            <div className="mr-3 text-sm text-white">
              {handleData.stringLimit(link || "", 40)}
            </div>
            <div>
              <Button
                isActiveBg
                onClick={handleCoppy}
                isAnimated={false}
                styles={{
                  color: "var(--turquoise)",
                }}
              >
                Sao chép
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ShareModal
