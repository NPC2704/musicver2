import { Fragment, useCallback, useEffect, useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { publicRoutes } from "./routes"
import useHistory from "./hooks/useHistory"
import { useAppSelector } from "./app/hooks"
import routesConfig from "./configs/routes"
import Home from "./pages/Home"
import { playSong } from "./utils/playSong"
import "animate.css"
import { PlayScreen } from "./components/PlayScreen"
import toast, { Toaster } from "react-hot-toast"
import MiniLays from "./components/PlayScreen/components/MiniLays"
import initDataUser from "./utils/initData"
import { useGoogleOneTapLogin } from "@react-oauth/google"
import { handleLoginSuccessGG } from "./utils/login"
import getToken from "./utils/getToken"
import OneTabLogin from "./components/OneTapLogin"
import { toastConfig } from "./components/Toast/toastConfig"

function App() {
  const currentPath = useAppSelector((state) => state.routes?.pay?.currentPath)

  useEffect(() => {
    initDataUser()
    // console.log(document.body.clientWidth)
  }, [])

  return document?.body?.clientWidth < 768 ? (
    <>
      <div className="h-[100vh] flex justify-center items-center">
        Opp! This app not yet support mobile
      </div>
    </>
  ) : (
    <>
      {!getToken() && <OneTabLogin />}
      <Router>
        <div className="App">
          <Routes>
            {publicRoutes.map((publicRoute, index) => {
              let Layout = publicRoute.layout
              let Page
              if (publicRoute.path == routesConfig?.player) {
                const pathName = currentPath.pathname

                const route = publicRoutes.find(
                  (route) => route.path == pathName,
                )
                Page = route?.component || Home
              } else {
                Page = publicRoute.component
              }

              return (
                <Route
                  key={index}
                  path={publicRoute.path}
                  element={
                    <Layout>
                      <Page />
                      <MiniLays />
                    </Layout>
                  }
                />
              )
            })}
          </Routes>
        </div>
      </Router>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={toastConfig}
        containerStyle={{
          top: 68,
        }}
      ></Toaster>
    </>
  )
}

export default App
