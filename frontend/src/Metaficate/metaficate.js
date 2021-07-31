import React from 'react'
import card from '../resources/card_example.png'
import ConnectButton from '../widget/ConnectButton'
import Contract from './Contract'

class Metaficate extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      address: null,
    }

    this.onButtonClick = this.onButtonClick.bind(this)
  }

  onButtonClick(event) {
    event.preventDefault();
    if (this.state.address) {
      this.claim()
    } else {
      this.connectMatamask()
    }
  }

  async connectMatamask() {
    console.log('onMetaMaskClick', window.ethereum)
    if (window.ethereum) {
      window.ethereum.removeListener('accountsChanged', this.handleMetaMaskAccounts)
      window.ethereum.on('accountsChanged', this.handleMetaMaskAccounts);
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
        this.handleMetaMaskAccounts(accounts)
      } catch (e) {
        console.error('MetaMask read account failed', e)
        this.showMessage('MetaMask read account failed')
      }
    } else {
      console.error('MetaMask not installed')
      this.showMessage('MetaMask not installed')
    }
  }

  handleMetaMaskAccounts(accounts) {
    if (accounts && accounts[0]) {
      const address = accounts[0]
      console.log(address)
      this.setState({ address })
      this.props.onCurrentAddressChange(address)
    } else {
      console.error('MetaMask read account failed, accounts[0] is undefined')
      this.showMessage('MetaMask read account failed')
    }
  }

  async claim() {
    const contract = new Contract()
    await contract.connect()
    const tokenId = await contract.mint()
    console.log('mint result', tokenId)
    const data = await contract.tokenInfo(tokenId)
    console.log('token data', data)
  }

  render() {
    return (
      <>
      <div className="metaficate-title">
        <div className="metaficate-title-text">The Graph Curator Metaficate</div>
      </div>
      <div className="metaficate-image">
        <img src={card} alt="Card Example" style={{ alignSelf: 'center' }} />
      </div>
      <div className="metaficate-title">
        <div className="metaficate-text">Curators use their knowledge of the web3 ecosystem to assess and signal on the subgraphs that should be indexed by The Graph Network. 
If your address has had at least one relevant onchain interaction before the snapshot time, then you can click the claim button below to claim this Metafication.</div>
      </div>
      <div className="metaficate-button">
        <ConnectButton className="profile-button" text={this.state.address ? 'Claim': 'Connect'} onClick={this.onButtonClick} />
      </div>
      </>
    )
  }
}
  
export default Metaficate