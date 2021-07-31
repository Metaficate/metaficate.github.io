import React from 'react'
import card from '../resources/card_example.png'
import ConnectButton from '../widget/ConnectButton'
import MeteficateContract, { CONTRACT_ADDRESS } from './Contract'
import './Metaficate.scss'
import {ReactComponent as OpenSeaLogo} from '../resources/opensea.svg'

class Metaficate extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      address: null,
      claiming: false,
      tokenId: null,
      tokenSVG: null,
    }

    this.contract = new MeteficateContract()

    this.onButtonClick = this.onButtonClick.bind(this)
    this.onOpenSeaClick = this.onOpenSeaClick.bind(this)
  }

  componentWillUnmount() {
    this.contract.disconnect()
  }

  onButtonClick(event) {
    event.preventDefault()
    if (this.state.claiming) {
      // do nothing
    } else if (this.state.address) {
      this.claim()
    } else {
      this.connectMatamask()
    }
  }

  onOpenSeaClick(e) {
    e.preventDefault()
    const url = `https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${this.state.tokenId}`
    window.open(url , '_blank')
  }

  async connectMatamask() {
    console.log('connect')
    try {
      const address = await this.contract.connect()
      console.log('connect address', address)
      this.setState({ address })
    } catch (e) {
      window.alert(e.message)
    }
  }

  async claim() {
    console.log('claim')
    try {
      this.setState({ claiming: true })
      // const tokenId = await this.contract.mint()
      // console.log('mint result', tokenId)
      const tokenId = 1
      const data = await this.contract.tokenInfo(tokenId)
      console.log('token data', data)
      const tokenSVG = data && data.image
      this.setState({ tokenId, tokenSVG, claiming: false })
    } catch (e) {
      this.setState({ claiming: false })
      window.alert(e.message)
    }
  }

  renderHome() {
    let buttonText
    if (this.state.claiming) {
      buttonText = 'Claiming...'
    } else if (this.state.address) {
      buttonText = 'Claim'
    } else {
      buttonText = 'Connect'
    }
    return (
      <>
        <div className="metaficate-title">
          <div className="metaficate-title-text">The Graph Curator Metaficate</div>
        </div>
        <div className="metaficate-image">
        <img src={card} className="card-img" alt="Card Example" />
        </div>
        <div className="metaficate-title">
          <div className="metaficate-text">Curators use their knowledge of the web3 ecosystem to assess and signal on the subgraphs that should be indexed by The Graph Network.
            If your address has had at least one relevant onchain interaction before the snapshot time, then you can click the claim button below to claim this Metafication.</div>
        </div>
        <div className="metaficate-button">
          <ConnectButton className="profile-button" text={buttonText} onClick={this.onButtonClick} />
        </div>
      </>
    )
  }

  renderClaimed() {
    return (
      <>
        <div className="metaficate-title">
          <div className="metaficate-title-text">Congratulations!</div>
        </div>
        <div className="metaficate-image">
          <img src={this.state.tokenSVG} className="card-img" alt="Card" />
        </div>
        <div className="metaficate-image">
          <OpenSeaLogo className="metaficate-button" onClick={this.onOpenSeaClick} />
        </div>
      </>
    )
  }

  render() {
    if (this.state.tokenId) {
      return this.renderClaimed()
    } else {
      return this.renderHome()
    }
  }
}

export default Metaficate
