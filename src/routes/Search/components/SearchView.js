import React from 'react'
import PropType from 'prop-types'
import VideoList from '../../../components/VideoList'

// SEARCH PAGE
// handle the searches and render the videoList according the query
class SearchView extends React.Component {

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
    nextPage: null,
    fetchUrl: this.url,
    buttonHide: true,
    query: null
  }
  render () {
    return (
      <section>
        <div className='container'>
          <div className='sections'>
            <div className='all-videos'>
              <h2>Resultados da busca: {this.props.params.query}</h2>
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
  componentWillReceiveProps (nextProps) {
    this.setState({
      query: nextProps.params.query
    }, () => {
      this.getVideos()
    })
  }
  componentWillMount () {
    this.setState({
      query: this.props.params.query
    })
  }
  componentDidMount () {
    this.getVideos()
  }
  getVideos () {
    let newUrl = this.baseUrl + '&maxResults=50&q=' + this.state.query
    fetch(newUrl).then((response) => response.json())
      .then(json => {
        this.setState({
          videos: json.items,
          nextPage: json.nextPageToken,
          fetchUrl: newUrl
        })
      })
  }
}

SearchView.propTypes = {
  title: PropType.string,
  query: PropType.string
}

export default SearchView
