import { useGoogleOneTapLogin } from "@react-oauth/google"
import { handleLoginSuccessGG } from "../../utils/login"

const OneTabLogin: React.FC = () => {
  useGoogleOneTapLogin({
    onSuccess: handleLoginSuccessGG,
    onError: () => {
      console.log("Login Failed")
    },
  })

  return null
}

export default OneTabLogin
