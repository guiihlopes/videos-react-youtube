import React from 'react'
import PropTypes from 'prop-types'
import { Link, browserHistory } from 'react-router'
import logo from 'images/logo.png'
import searchIcon from 'images/search-icon.png'
import './CoreLayout.scss'
import menuIcon from 'images/menu-icon.png'

class CoreLayout extends React.Component {
  state = {
    opened: false
  }
  render () {
    return (
      <div className='layout'>
        <header>
          <div className='container'>
            <h1 id='logo'>
              <Link to='/' title='Fictícia vídeos'>
                <img src={logo} alt='Fictícia vídeos' />
              </Link>
            </h1>
            <form action='/search' id='searchForm' onSubmit={ev => this.handleSearch(ev)}>
              <input type='text'
                     name='query'
                     id='searchInput'
                     placeholder='Search...'
                     onKeyUp={ev => this.searchString(ev)}
                     ref={(inputText) => { this.inputText = inputText }}
                     className={(this.state.opened ? 'active' : '')} />
              <input type='image'
                     src={searchIcon}
                     alt='Search icon'
                     onClick={ev => this.toggleInputState(ev)}
                     id='searchSubmit' />
            </form>
            <nav id='menu-area'>
              <a href='#' title='Open menu'>
                <img src={menuIcon} alt='Menu' />
              </a>
              <ul className='menu'>
                <li><Link to='/video/XGz0SIdj3GA'><i className='icon icon-destaque' /> Destaques</Link></li>
                <li><Link to='/'><i className='icon icon-video' /> Vídeos</Link></li>
              </ul>
            </nav>
          </div>
        </header>
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
  searchString (ev) {
    this.query = '/search/' + ev.target.value
  }
  handleSearch (ev) {
    ev.preventDefault()
    browserHistory.push(this.query);
  }
  toggleInputState (ev) {
    if (!this.state.opened){
      ev.preventDefault()
      this.setState({
        opened: !this.state.opened
      }, () => {
        this.inputText.focus()
      })
    }
  }
}

CoreLayout.contextTypes = {
  router: PropTypes.object.isRequired
};
CoreLayout.propTypes = {
  children : PropTypes.element.isRequired
}

export default CoreLayout
