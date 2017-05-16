import React from 'react'

// NotFound
// handle all the pages which is not in child routes
class NotFoundView extends React.Component {
  constructor (store) {
    super()
  }

  render () {
    return (
      <section>
        <div className='container'>
          <div className='sections'>
            <div className='video-detail'>
              <h2>Página não encontrada :(</h2>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default NotFoundView
