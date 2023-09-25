import routesConfig from "../configs/routes"

//import Layout
import DefaultLayout from "../layouts/DefaultLayout"
import ArtistsPage from "../pages/Artists"

//import Pages
import Home from "../pages/Home"
import Library from "../pages/Library"
import PlayList from "../pages/PlayList"
import Player from "../pages/Player"
import Search from "../pages/Search"

// Vào được khi chưa đăng nhập
const publicRoutes = [
  {
    path: routesConfig.home,
    component: Home,
    layout: DefaultLayout,
    sidebar: null,
  },
  {
    path: routesConfig.explore,
    component: Home,
    layout: DefaultLayout,
    sidebar: null,
  },
  {
    path: routesConfig.library,
    component: Library,
    layout: DefaultLayout,
    sidebar: null,
  },
  {
    path: routesConfig.playlist,
    component: PlayList,
    layout: DefaultLayout,
    sidebar: null,
  },
  {
    path: routesConfig.artist,
    component: ArtistsPage,
    layout: DefaultLayout,
    sidebar: null,
  },
  {
    path: routesConfig.search,
    component: Search,
    layout: DefaultLayout,
    sidebar: null,
  },
  {
    path: routesConfig.player,
    component: Player,
    layout: DefaultLayout,
    sidebar: null,
  },
]

// Cần đăng nhập mới có thể vào được routes

export { publicRoutes }
