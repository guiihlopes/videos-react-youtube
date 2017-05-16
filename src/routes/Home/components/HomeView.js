import React from 'react'
import PropType from 'prop-types'
import VideoList from '../../../components/VideoList'


// HomeView
// handle the home page with the videos, and passing
// its propertys for a cedrtain rendering

class HomeView extends React.Component {

  constructor () {
    super()
    let channelId = 'UCM9KEEuzacwVlkt9JfJad7g'
    let url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCPuyP8Nq7pJhY39QPXYCcLpRKZMJq0fSs&' +
      'channelId=' + channelId + '&' +
      'part=snippet,id&order=date&' +
      'type=video'
    this.baseUrl = url
  }
  state = {
    videos: [],
    nextPage: '',
    fetchUrl: this.url,
    title: 'Todos os vídeos do Canal',
    buttonHide: false
  }
  render () {
    return (
      <section>
        <div className='container'>
          <div className='sections'>
            <div className='all-videos'>
              <h2>{this.state.title}</h2>
              <VideoList buttonHide={this.state.buttonHide}
                         videos={this.state.videos}
                         nextPage={this.state.nextPage}
                         fetchUrl={this.state.fetchUrl} />
            </div>
          </div>
        </div>
      </section>
    )
  }
  componentDidMount () {
    this.getVideos()
  }
  getVideos () {
    let newUrl = this.baseUrl + '&maxResults=6'
    fetch(newUrl).then((response) => response.json())
      .then(json => {
        this.setState({
          videos: json.items,
          nextPage: json.nextPageToken,
          fetchUrl: newUrl,
        })
      })
  }
}

HomeView.propTypes = {
  title: PropType.string,
  query: PropType.string
}

export default HomeView
