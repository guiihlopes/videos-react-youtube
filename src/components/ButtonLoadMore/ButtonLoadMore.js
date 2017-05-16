import React from 'react'
import PropTypes from 'prop-types'


// Button with spinner component, check states and if is hide (in search case) it add class hide

class ButtonLoadMore extends React.Component {
  state = {
    hide: false
  }
  render () {
    return (
      <div className={'button-load-more' + (this.state.hide ? ' hide' : '')}>
        <span className='spinner' />
        <button className={'load-more'} onClick={this.props.onClicked}>
          Carregar mais videos...
        </button>
      </div>
    )
  }
  componentWillMount () {
    this.setState({
      hide: this.props.hide
    })
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      hide: nextProps.hide
    })
  }
}

ButtonLoadMore.propTypes = {
  onClicked     : PropTypes.any.isRequired,
  hide     : PropTypes.bool
}

export default ButtonLoadMore
