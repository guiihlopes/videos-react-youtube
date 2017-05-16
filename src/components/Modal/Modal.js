import React from 'react'
import PropType from 'prop-types'
import Youtube from 'react-youtube'
import closeIcon from 'images/close-icon.png'
import VideoDescriptionDetails from '../VideoDescriptionDetails'


// Modal component, check states and if is state is open it add class active and shows de modal with its video and description

class Modal extends React.Component {
  state = {
    videoId: '',
    open: null
  }
  render () {
    return (
      <div className={'backdrop' + (this.state.open ? ' active' : '')}
           style={(this.state.open ? { display: 'block' } : { display: 'none' })} >
        <div id='modal'>
          <div className='close'>
            <a href='#' onClick={ev => this.props.onClicked(ev, this.youtubePlayer)} title='close modal'>
              <img src={closeIcon} alt='close icon' />
            </a>
          </div>
          <div className='video-detail'>
            <div className='video'>
              <Youtube videoId={this.state.videoId} ref={(youtube) => { this.youtubePlayer = youtube }} />
            </div>
            <VideoDescriptionDetails videoId={this.state.videoId} />
          </div>
        </div>
      </div>
    )
  }
  // by default set a static videoId for rendering purposes
  componentWillMount () {
    this.setState({
      videoId: 'BfVKMB25lc4',
      open: false
    })
  }
  // update states when get other video Id and open params
  componentWillReceiveProps (nextProps) {
    this.setState({
      open: nextProps.open,
      videoId: nextProps.videoId
    })
  }
}

Modal.propTypes = {
  videoId: PropType.string,
  onClicked: PropType.any,
  open: PropType.bool.isRequired
}

export default Modal
