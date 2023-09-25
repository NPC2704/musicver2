interface IRoute {
  home: string
  explore: string
  library: string
  playlist: string
  player: string
  artist: string
  search: string
}

const routesConfig: IRoute = {
  home: "/",
  explore: "/explore",
  library: "/library",
  playlist: "/playlist",
  player: "/player",
  artist: "/artist",
  search: "/search",
}

export default routesConfig
