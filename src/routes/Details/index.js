// import { injectReducer } from '../../store/reducers'
import DetailsView from './components/DetailsView.js'

export default (store) => ({
  path : 'video/:id',
  component: DetailsView
  // getComponent (nextState, cb) {
  //   require.ensure([], (require) => {
  //     const Details = require('./containers/DetailContainer').default
  //     const reducer = require('./modules/detail').default
  //
  //     injectReducer(store, { key: 'detailsView', reducer })
  //
  //     cb(null, Details)
  //   }, 'detailsView')
  // }
})
