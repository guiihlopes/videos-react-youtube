import React from 'react'
import PropTypes from 'prop-types'
import viewIcon from 'images/view-icon.png'
import dataIcon from 'images/data-icon.png'
import { returnViewCount } from '../../helpers/helper.js'

// VideoDescriptionDetails component,
// get and update all information about the video, and toggle state from video card (when clicked in header area)

class VideoDescriptionDetails extends React.Component {
  state = {
    videoId: '',
    viewCount: 0,
    publishedAt: '',
    videoTitle: '',
    videoDescription: '',
    cardOpened: false
  }
  render () {
    return (
      <div className={'video-description ' + (this.state.cardOpened ? 'opened' : '')}>
        <div className='header' onClick={() => this.toggleCard(this)}>
          <h3>{this.state.videoTitle}</h3>
          <div className='user-interaction'>
            <div className='video-views tooltip'>
              <img src={viewIcon} alt='View icon' />
              <div className='tooltip-container'>
                {returnViewCount(this.state.viewCount)} views
              </div>
            </div>
            <div className='video-data tooltip'>
              <img src={dataIcon} alt='View icon' />
              <div className='tooltip-container'>
                {this.state.publishedAt}
              </div>
            </div>
          </div>
        </div>
        <div className='video-text'>
          <p>{this.state.videoDescription}</p>
        </div>
      </div>
    )
  }
  componentWillMount () {
    this.setState({
      videoId: this.props.videoId
    })
  }
  componentWillReceiveProps (nextProps) {
    if (this.state.videoId !== nextProps.videoId){
      this.setState({
        videoId: nextProps.videoId
      }, () => {
        this.updateStates()
      })
    }
  }
  toggleCard () {
    this.setState({
      cardOpened: !this.state.cardOpened
    })
  }

  componentDidMount () {
    this.updateStates()
  }
  async updateStates () {
    let videoId = this.state.videoId
    let url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&' +
      'id=' + videoId + '&' +
      'key=AIzaSyCPuyP8Nq7pJhY39QPXYCcLpRKZMJq0fSs'
    fetch(url).then((response) => response.json())
      .then(json => {
        if (json.items.length > 0){
          let video = json.items[0]
          let publishedAt = new Date(video.snippet.publishedAt)

          let monthNames = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
                            'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
          ]
          let publisheAtString = publishedAt.getDate() + ' de ' + monthNames[publishedAt.getUTCMonth()] +
            ' de ' + publishedAt.getFullYear()

          this.setState({
            viewCount: video.statistics.viewCount,
            publishedAt: publisheAtString,
            videoTitle: video.snippet.title,
            videoDescription: video.snippet.description
          })
        }
      })
  }
}

VideoDescriptionDetails.propTypes = {
  videoId     : PropTypes.string.isRequired
}

export default VideoDescriptionDetails
