import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import { ReactNode, useState } from "react"
import { useAppSelector } from "../../app/hooks"
import { ui } from "../../utils/ui"
import { SectionTitleXl } from "../SectionTitle"

const Confirm: React.FC = () => {
  const { isShow, title, content, callback, confirmText, cancelText } =
    useAppSelector((state) => state?.ui?.confirmModal)

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

  const handleConfirm = () => {
    ui?.hiddenConfirmModal()
    callback && callback()
  }

  const handleClose = () => {
    ui?.hiddenConfirmModal()
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
            width: "384px",
          },
        }}
      >
        <DialogTitle id="dialog-title">
          <SectionTitleXl title={title || "Xác nhận"} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: "var(--whiteT1)" }}>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color: "var(--color-white)" }} onClick={handleClose}>
            {cancelText}
          </Button>
          <Button onClick={handleConfirm}>{confirmText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Confirm
