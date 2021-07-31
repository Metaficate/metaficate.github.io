import React from 'react'
import './App.scss'
import { ReactComponent as OpenSeaLogo } from './resources/opensea.svg'
import { ReactComponent as DaoLogo } from './resources/rhizome-dao.svg'
import { ReactComponent as GitHubLogo } from './resources/github.svg'
import { ReactComponent as MediumLogo } from './resources/medium.svg'
import { ReactComponent as TwitterLogo } from './resources/twitter.svg'
import Metaficate from './Metaficate/metaficate'
import { log } from './utils/DebugUtils'
import { OPENSEA_GALLERY_URL } from './Metaficate/Contract'

const PAGE = Object.freeze({ 'METAFICATE': 1 })

class App extends React.Component {

  state = {
    page: PAGE.METAFICATE,
    address: null, // {address, ens}
  }

  constructor(props) {
    super(props)

    this.metaficate = React.createRef()

    this.onCurrentAddressChange = this.onCurrentAddressChange.bind(this)
    this.onOpenSeaClick = this.onOpenSeaClick.bind(this)
    this.onDaoClick = this.onDaoClick.bind(this)
  }

  onCurrentAddressChange(address) {
    log('app current address change', address)
    this.setState({
      address: address
    })
  }

  onOpenSeaClick(e) {
    e.preventDefault()
    window.open(OPENSEA_GALLERY_URL, '_blank')
  }

  onDaoClick(e) {
    e.preventDefault()
    this.setState({
      page: PAGE.METAFICATE
    })
  }

  render() {
    log('app render')
    return (
      <div className="app">
        <header className="app-header">
          <span className="app-header-container left">
            <OpenSeaLogo className="icon icon-monochrome" onClick={this.onOpenSeaClick} />
          </span>
          <DaoLogo className="logo" onClick={this.onDaoClick} />
          <span className="app-header-container right">
            <a className="icon-container" href="https://github.com/Metaficate/metaficate.github.io" target="_blank" rel="noreferrer"><GitHubLogo className="icon icon-monochrome" /></a>
            <a className="icon-container" href="https://medium.com/rhizomedao" target="_blank" rel="noreferrer"><MediumLogo className="icon icon-monochrome" /></a>
            <a className="icon-container" href="https://twitter.com/rhizomedao" target="_blank" rel="noreferrer"><TwitterLogo className="icon icon-monochrome" /></a>
          </span>
        </header>

        <div className="app-body">
          {/* use display instead of remove the invisible page to avoid page internal state loss */}
          <div className="app-page" style={{ display: this.state.page === PAGE.METAFICATE ? 'block' : 'none' }}>
            <Metaficate ref={this.metaficate} onCurrentAddressChange={this.onCurrentAddressChange} />
          </div>
        </div>
      </div>
    )
  }
}

export default App
