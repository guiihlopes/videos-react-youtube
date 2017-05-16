import CoreLayout from '../layouts/CoreLayout'
import Home from './Home'
import DetailRoute from './Details'
import SearchRoute from './Search'
import NotFoundRoute from './NotFoundRoute'


// MANIPULATE THE ROUTES, AND IT'S CHILD ROUTES
// for the child routes it passes the pages (routes)
// and inside the pages define it own path, e.g: path: search/:query

export const createRoutes = (store) => {
  return ({
    path        : '/',
    component   : CoreLayout,
    indexRoute  : Home,
    childRoutes : [
      DetailRoute(store),
      SearchRoute(store),
      NotFoundRoute(store)
    ]
  })
}

export default createRoutes
