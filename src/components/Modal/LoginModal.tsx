import * as React from "react"
import DialogTitle from "@mui/material/DialogTitle"
import Dialog from "@mui/material/Dialog"
import { ui } from "../../utils/ui"
import { useAppSelector } from "../../app/hooks"
import { DialogActions, DialogContent } from "@mui/material"
import { SectionTitle2xl, SectionTitleXl } from "../SectionTitle"
import { Button } from "../Button"
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google"
import { handleLoginSuccessGG } from "../../utils/login"

export const LoginModal: React.FC = () => {
  const isOpen = useAppSelector((state) => state?.ui?.isLoginModalShow)

  // const login = useGoogleLogin({
  //   onSuccess: handleLoginSuccessGG,
  //   flow: "auth-code",
  // })

  const handleClose = () => {
    ui.hiddenLoginModal()
  }

  return (
    <div
      className={`transition-all fixed top-0 right-0 bottom-0 left-0 bg-black z-50 flex justify-center items-center ${
        isOpen ? "bg-opacity-40" : "bg-opacity-0 hidden"
      }`}
    >
      <div className="max-w-7xl max-h-[90vh] min-w-[20%] bg-grayL rounded">
        <div className="h-12 border-b border-bdm flex items-center px-4">
          <div className="text-xl font-bold ">Đăng nhập</div>
        </div>
        <div className="min-h-[20px] py-3 border-b border-bdm px-4">
          <GoogleLogin
            onSuccess={handleLoginSuccessGG}
            onError={() => {
              console.log("Login Failed")
            }}
          />
          {/* <Button onClick={() => login()}>Đăng nhập với Google</Button> */}
        </div>
        <div className="px-4 py-1 flex justify-end">
          <Button isTransparent isAnimated={false} onClick={handleClose}>
            Đóng
          </Button>
        </div>
      </div>
    </div>
  )
}
