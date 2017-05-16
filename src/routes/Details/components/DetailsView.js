import React from 'react'
import Youtube from 'react-youtube'
import VideoList from '../../../components/VideoList'
import VideoDescriptionDetails from '../../../components/VideoDescriptionDetails'

class DetailsView extends React.Component {
  constructor (store) {
    super()
    this.store = store
  }
  state = {
    videoId: null,
    videos: [],
    nextPage: null,
    fetchUrl: null,
  }
  render () {
    return (
      <section>
        <div className='container'>
          <div className='sections'>
            <div className='video-detail'>
              <h2>Vídeo em destaque</h2>
              <div className='video'>
                <Youtube videoId={this.state.videoId} ref={(youtube) => { this.youtubePlayer = youtube }} />
              </div>
              <VideoDescriptionDetails videoId={this.state.videoId} />
            </div>
            <div className='all-videos busca'>
              <h2>+ Vídeos</h2>
              <VideoList videos={this.state.videos} nextPage={this.state.nextPage} fetchUrl={this.state.fetchUrl} />
            </div>
          </div>
        </div>
      </section>
    )
  }
  componentWillMount () {
    this.setState({
      videoId: this.store.params.id
    })
  }
  componentWillReceiveProps (newProps) {
    this.setState({
      videoId: newProps.params.id
    })
  }
  componentDidMount () {
    this.youtubePlayer.internalPlayer.playVideo()
    this.getVideoList()
  }

  getVideoList () {
    let channelId = 'UCM9KEEuzacwVlkt9JfJad7g'
    let url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCPuyP8Nq7pJhY39QPXYCcLpRKZMJq0fSs&' +
      'channelId=' + channelId + '&' +
      'part=snippet,id&order=date&' +
      'type=video&' +
      'maxResults=4'
    fetch(url).then((response) => response.json())
      .then(json => {
        this.setState({
          videos: json.items,
          nextPage: json.nextPageToken,
          fetchUrl: url
        })
      })
  }
}

export default DetailsView
