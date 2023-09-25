import { createContext } from "react"
import { IPath } from "../types/item"

export const RouteContext = createContext<IPath>({})
export const RouteProvider = RouteContext.Provider
