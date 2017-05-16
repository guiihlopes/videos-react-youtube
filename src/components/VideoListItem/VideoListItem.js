import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { returnViewCount } from '../../helpers/helper.js'

// VideoListItem component,
// render specific video informations
// { thumbnail, title, views }, also check whether redirect to link or not to open the modal

class VideoListItem extends React.Component {
  constructor () {
    super()
    this.state = {
      viewCount: 0
    }
  }
  componentDidMount () {
    fetch('https://www.googleapis.com/youtube/v3/videos?part=statistics&' +
      'id=' + this.props.video.id.videoId + '&' +
      'key=AIzaSyCPuyP8Nq7pJhY39QPXYCcLpRKZMJq0fSs').then((response) => response.json())
      .then(json => {
        let viewCount = returnViewCount(json.items[0].statistics.viewCount)
        this.setState({
          'viewCount': viewCount
        })
      })
  }
  render () {
    return (
      <li className='video column-3'
        onClick={() => { this.props.onClicked(this.props.modal, this.props.video.id.videoId) }}>
        <Link onClick={ev => this.checkOpenModal(ev)}
          to={'/video/' + this.props.video.id.videoId}
          title={this.props.video.snippet.title} >
          <figure className='miniature'>
            <img src={this.props.video.snippet.thumbnails.high.url} alt='Miniatura' />
          </figure>
          <div className='video-info'>
            <div className='video-title'>
              <h3>{this.props.video.snippet.title}</h3>
            </div>
            <p className='video-views'>{this.state.viewCount} views</p>
          </div>
        </Link>
      </li>
    )
  }
  checkOpenModal (ev) {
    if (this.props.modal) {
      ev.preventDefault()
    }
  }
}

VideoListItem.propTypes = {
  onClicked     : PropTypes.any.isRequired,
  video     : PropTypes.object.isRequired,
  modal     : PropTypes.bool
}

export default VideoListItem
