import React from 'react'
import PropTypes from 'prop-types'
import VideoListItem from '../VideoListItem'
import ButtonLoadMore from '../ButtonLoadMore'
import Modal from '../Modal'

// VideoList component,
// render all videos getted from props and render it own component,
// also manipulate modal handlers
class VideoList extends React.Component {
  constructor () {
    super()
    this.state = {
      videoId: '',
      open: false,
      nextPage: ''
    }
  }
  renderItens () {
    const { videos } = this.props
    return videos.map((video, index) => {
      return <VideoListItem video={video}
        modal={this.props.buttonHide}
        key={index}
        onClicked={(openModal, videoId) => this.openModal(openModal, videoId)} />
    })
  }
  render () {
    return (
      <ul className='videos'>
        <div className='video-list'>
          {this.renderItens()}
        </div>
        <ButtonLoadMore hide={this.props.buttonHide} onClicked={ev => this.loadMoreVideos(ev)} />
        <Modal videoId={this.state.videoId}
          open={this.state.open}
          onClicked={(ev, youtubePlayer) => this.closeModal(ev, youtubePlayer)} />
      </ul>
    )
  }
  closeModal (ev, youtubePlayer) {
    ev.preventDefault()
    youtubePlayer.internalPlayer.stopVideo()
    this.setState({
      open: false
    })
  }
  openModal (openModal, videoId) {
    if (openModal) {
      this.setState({
        videoId: videoId,
        open: true
      })
    }
  }
  loadMoreVideos (ev) {
    let button = ev.target
    button.classList.add('hide')
    fetch(this.props.fetchUrl + '&pageToken=' + this.state.nextPage)
      .then((response) => response.json())
      .then(json => {
        let videos = this.props.videos
        videos.push(...json.items)
        button.classList.remove('hide')
        this.setState({
          videos: videos,
          nextPage: json.nextPageToken
        })
      })
  }
}

VideoList.propTypes = {
  videos     : PropTypes.any.isRequired,
  buttonHide     : PropTypes.any,
  nextPage     : PropTypes.string,
  fetchUrl     : PropTypes.string
}

export default VideoList
