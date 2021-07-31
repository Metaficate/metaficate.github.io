import React from 'react'
import card from '../resources/card_example.png'
import ConnectButton from '../widget/ConnectButton'
import MeteficateContract from './Contract'
import './Metaficate.scss'

class Metaficate extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      address: null,
      svg: null,
      minting: false,
    }

    this.contract = new MeteficateContract()
    this.onButtonClick = this.onButtonClick.bind(this)
  }

  componentWillUnmount() {
    this.contract.disconnect()
  }

  onButtonClick(event) {
    event.preventDefault()
    if (this.state.svg) {
      // do nothing
    } else if (this.state.minting) {
      // do nothing
    } else if (this.state.address) {
      this.claim()
    } else {
      this.connectMatamask()
    }
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
      this.setState({ minting: true })
      // const tokenId = await this.contract.mint()
      // console.log('mint result', tokenId)
      const tokenId = 1
      const data = await this.contract.tokenInfo(tokenId)
      console.log('token data', data)
      const svg = data && data.svg
      this.setState({ svg, minting: false })
    } catch (e) {
      this.setState({ minting: false })
      window.alert(e.message)
    }
  }

  renderImage() {
    if (this.state.svg) {
      return <img src={`data:image/svg+xml;utf8,${this.state.svg}`} className="card-img" alt="Card" />
    } else {
      return <img src={card} className="card-img" alt="Card Example" />
    }
  }

  render() {
    let buttonText
    if (this.state.svg) {
      buttonText = 'Claimed'
    } else if (this.state.minting) {
      buttonText = 'Minting...'
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
          {this.renderImage()}
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
}

export default Metaficate
