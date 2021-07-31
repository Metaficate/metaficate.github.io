import React from 'react'
import card from '../resources/card_example.png'
import ConnectButton from '../widget/ConnectButton'

class Metaficate extends React.Component {

  state = {
    address: null, // {address, ens}
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
        <ConnectButton className="profile-button" text={this.state.address ? 'Claim' : 'Connect'} onClick={this.onProfileClick} />
      </div>
      </>
    )
  }
}
  
export default Metaficate