import { useCallback, useContext, useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { IPlayList } from "../../types/item"
import setLoadingPage from "../../utils/setLoadingPage"
import { useLocation } from "react-router-dom"
import { RouteContext } from "../../providers/RouteProvider"
import { publicRoutes } from "../../routes"
import Home from "../Home"

interface IProps {}

const Player: React.FC<IProps> = ({}) => {
  const prePath = useContext(RouteContext)

  const pathName = prePath.pathname

  const route = publicRoutes.find((route) => route.path == pathName)

  const Component = route?.component || Home

  useEffect(() => {}, [])
  return <Component />
}

export default Player
