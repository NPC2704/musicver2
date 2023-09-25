import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import "./index.css"
import i18nConfig from "./i18n"
import { ConfigProvider } from "antd"
import { theme } from "./configs/antdConfig"
import { ThemeProvider } from "@mui/material"
import { theme_ } from "./configs/muiConfig"
import keyEventConfig from "./configs/keyEvent"
import { GoogleOAuthProvider } from "@react-oauth/google"
i18nConfig()
keyEventConfig()

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <GoogleOAuthProvider clientId="60783848892-451bnh6u5i95b3spgkqlot33rhrte5ji.apps.googleusercontent.com">
    <ThemeProvider theme={theme_}>
      <ConfigProvider theme={theme}>
        <Provider store={store}>
          <App />
        </Provider>
      </ConfigProvider>
    </ThemeProvider>
  </GoogleOAuthProvider>,
  // </React.StrictMode>,
)
