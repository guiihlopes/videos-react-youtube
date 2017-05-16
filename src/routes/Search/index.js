import SearchView from './components/SearchView'

export default (store) => ({
  path : '/search/:query',
  component: SearchView
})
