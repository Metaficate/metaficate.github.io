
import Web3 from 'web3';
import { Base64 } from 'js-base64'

// TODO releace to official contract
const ABI = require('./ABI.json')
const CONTRACT_ADDRESS = '0x0e670B2Ad3aF9E6f409b732C378EA23C73CfdFAe'

// Usage
// const contract = new Contract()
// await contract.connect()
// const tokenId = await contract.mint()
// console.log('mint result', tokenId)
// const data = await contract.tokenInfo(tokenId)
// console.log('token data', data)
// https://web3js.readthedocs.io/en/v1.2.1/web3-eth-contract.html#methods-mymethod-call
export default class Contract {

  async connect() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      this.account = accounts[0]
      this.web3 = new Web3(window.ethereum)
      this.contract = new this.web3.eth.Contract(ABI, CONTRACT_ADDRESS)
    }
  }

  // return tokenId, string format
  async mint() {
    try {
      const result = await this.contract.methods.mint().send({ from: this.account })
      // {
      //   "blockHash": "0x50b42d7e19616d18bbc8bde1d4e6f0d1f3d20b61e169dfb0655259d7b657edcb",
      //   "blockNumber": 9030631,
      //   "contractAddress": null,
      //   "cumulativeGasUsed": 7120488,
      //   "effectiveGasPrice": "0x3b9aca08",
      //   "from": "0xd0c20024ca31fafb85a6c9a811a2cea1701f8fb0",
      //   "gasUsed": 56617,
      //   "logsBloom": "0x00000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000008000000000000000000000000000000020000000000000000020000000000000000000800000000000000000000000010080000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000008000000000000000000800000000000000000400000000002000000000000000000000800000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000000",
      //   "status": true,
      //   "to": "0x0e670b2ad3af9e6f409b732c378ea23c73cfdfae",
      //   "transactionHash": "0xda5534ee826d9a879363ce66de60d61dfd076196190e6c5ab2d45415d5e019e5",
      //   "transactionIndex": 21,
      //   "type": "0x0",
      //   "events": {
      //     "Transfer": {
      //       "address": "0x0e670B2Ad3aF9E6f409b732C378EA23C73CfdFAe",
      //       "blockHash": "0x50b42d7e19616d18bbc8bde1d4e6f0d1f3d20b61e169dfb0655259d7b657edcb",
      //       "blockNumber": 9030631,
      //       "logIndex": 44,
      //       "removed": false,
      //       "transactionHash": "0xda5534ee826d9a879363ce66de60d61dfd076196190e6c5ab2d45415d5e019e5",
      //       "transactionIndex": 21,
      //       "id": "log_9a77f9c3",
      //       "returnValues": {
      //         "0": "0x0000000000000000000000000000000000000000",
      //         "1": "0xd0c20024cA31Fafb85A6C9a811A2cEA1701F8FB0",
      //         "2": "3",
      //         "from": "0x0000000000000000000000000000000000000000",
      //         "to": "0xd0c20024cA31Fafb85A6C9a811A2cEA1701F8FB0",
      //         "tokenId": "3"
      //       },
      //       "event": "Transfer",
      //       "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
      //       "raw": {
      //         "data": "0x",
      //         "topics": [
      //           "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
      //           "0x0000000000000000000000000000000000000000000000000000000000000000",
      //           "0x000000000000000000000000d0c20024ca31fafb85a6c9a811a2cea1701f8fb0",
      //           "0x0000000000000000000000000000000000000000000000000000000000000003"
      //         ]
      //       }
      //     }
      //   }
      // }
      // console.log('mint result', result, JSON.stringify(result,null,2))
      return result?.events?.Transfer?.returnValues?.tokenId
    } catch (e) {
      console.error(e)
      return null
    }
  }

  async tokenURI(tokenId) {
    try {
      const result = await this.contract.methods.tokenURI([tokenId]).call()
      console.log('mint tokenURI', result)
      return result
    } catch (e) {
      console.error(e)
      return null
    }
  }

  // return json: {name, description, image, svg}
  async tokenInfo(tokenId) {
    // data:application/json;base64,eyJuYW1lIjoiVG9rZW4gIzEiLCAiZGVzY3JpcHRpb24iOiJEZXNjcmlwdGlvbiBEZXNjcmlwdGlvbiBEZXNjcmlwdGlvbiBEZXNjcmlwdGlvbiBEZXNjcmlwdGlvbiBEZXNjcmlwdGlvbiBEZXNjcmlwdGlvbiBEZXNjcmlwdGlvbiBEZXNjcmlwdGlvbiBEZXNjcmlwdGlvbiIsICJpbWFnZSI6ICJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIyYVdWM1FtOTRQU0l3SURBZ01USXdMamM0SURFeE55NDNPU0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JajQ4Y0dGMGFDQmpiR0Z6YzA1aGJXVTlJbkJ5WldacGVGOWZZMnh6TFRFaUlHUTlJazAyTUM0ek9TQXdRVFl3TGpNNUlEWXdMak01SURBZ01EQTBNUzR6SURFeE55NDJPV016SUM0MU5pQTBMakV5TFRFdU16RWdOQzR4TWkweUxqa3hJREF0TVM0ME5DMHVNRFV0Tmk0eE9TMHVNRGd0TVRFdU1qUkRNamd1TlRRZ01UQTNMakU1SURJMUlEazJMalF5SURJMUlEazJMalF5WXkweUxqYzFMVGN0Tmk0M01TMDRMamcwTFRZdU56RXRPQzQ0TkMwMUxqUTRMVE11TnpVdU5ERXRNeTQyTnk0ME1TMHpMalkzSURZdU1EY3VORE1nT1M0eU5pQTJMakl5SURrdU1qWWdOaTR5TWlBMUxqTTVJRGt1TWpNZ01UUXVNVE1nTmk0MU55QXhOeTQxTnlBMUlDNDFOUzB6TGprZ01pNHhNUzAyTGpVMklETXVPRFF0T0M0d04wTXpOaUE0TlM0MU5TQXlNUzQ0TlNBNE1DNHpOeUF5TVM0NE5TQTFOeTR5TTBFeU15NHpOU0F5TXk0ek5TQXdJREF4TWpndU1EZ2dOREZqTFM0Mk15MHhMalV5TFRJdU55MDNMalkyTGpVNExURTJJREFnTUNBMUxqQTNMVEV1TmpJZ01UWXVOakVnTmk0eE9XRTFOeTR6TmlBMU55NHpOaUF3SURBeE16QXVNalVnTUVNNE55QXlNeTQwTWlBNU1pNHhNU0F5TlNBNU1pNHhNU0F5TldNekxqSTRJRGd1TXpJZ01TNHlNaUF4TkM0ME5pNDFPU0F4Tm1FeU15NHpOQ0F5TXk0ek5DQXdJREF4Tmk0eU1TQXhOaTR5TVdNd0lESXpMakl0TVRRdU1USWdNamd1TXkweU55NDFOeUF5T1M0NElESXVNVFlnTVM0NE55QTBMakE1SURVdU5UVWdOQzR3T1NBeE1TNHhPQ0F3SURndU1EZ3RMakEySURFMExqVTVMUzR3TmlBeE5pNDFOeUF3SURFdU5qRWdNUzR3T0NBekxqUTVJRFF1TVRRZ01pNDVRVFl3TGpNNUlEWXdMak01SURBZ01EQTJNQzR6T1NBd2VpSWdMejQ4Y0dGMGFDQmpiR0Z6YzA1aGJXVTlJbkJ5WldacGVGOWZZMnh6TFRJaUlHUTlJazB5TWk0NE55QTROaTQzWXkwdU1UTXVNeTB1Tmk0ek9TMHhJQzR4T1hNdExqWTVMUzQyTVMwdU5UVXRMamt4TGpZeExTNHpPU0F4TFM0eE9TNDJPUzQyTVM0MU5DNDVNWHBOTWpVdU16SWdPRGt1TkROakxTNHlPUzR5TnkwdU9EVXVNVFF0TVM0eU5DMHVNamhoTGpreUxqa3lJREFnTURFdExqRTNMVEV1TWpWakxqTXRMakkzTGpnMExTNHhOQ0F4TGpJMExqSTRjeTQwTnlBeElDNHhOeUF4TGpJMWVrMHlOeTQzSURreUxqa3hZeTB1TXpjdU1qWXRNU0F3TFRFdU16VXRMalV5Y3kwdU16Y3RNUzR4T0NBd0xURXVORFFnTVNBd0lERXVNelV1TlRFdU16Y2dNUzR4T1NBd0lERXVORFY2VFRNeElEazJMakkzWVRFdU1UTWdNUzR4TXlBd0lEQXhMVEV1TlRrdExqSTNZeTB1TlRNdExqUTVMUzQyT0MweExqRTRMUzR6TkMweExqVTBjekV0TGpJM0lERXVOVFl1TWpNdU5qZ2dNUzR4T0M0ek15QXhMalUwZWswek5TNDBOaUE1T0M0eU1tTXRMakUxTGpRM0xTNDRNaTQyT1MweExqVXhMalE1Y3kweExqRXpMUzQzTmkweExURXVNalF1T0RJdExqY2dNUzQxTVMwdU5Ea2dNUzR4TXk0M05pQXhJREV1TWpSNlRUUXdMalFnT1RndU5UaGpNQ0F1TlMwdU5UWXVPVEV0TVM0eU9DNDVNbk10TVM0ekxTNHpPQzB4TGpNeExTNDROeTQxTmkwdU9USWdNUzR5T1MwdU9UTWdNUzR6TGpNNUlERXVNeTQ0T0hwTk5EVWdPVGN1T0dNdU1Ea3VORGt0TGpReElERXRNUzR4TWlBeExqRXljeTB4TGpNMUxTNHhOeTB4TGpRMExTNDJOaTQwTWkweElERXVNVEl0TVM0eE1pQXhMak0xTGpFM0lERXVORFF1TmpaNklpQXZQand2YzNablBnPT0ifQ==
    const result = await this.tokenURI(tokenId)
    if (!result) return result
    try {
      // {"name":"Token #1", "description":"Description Description Description Description Description Description Description Description Description Description", "image": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTIwLjc4IDExNy43OSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBjbGFzc05hbWU9InByZWZpeF9fY2xzLTEiIGQ9Ik02MC4zOSAwQTYwLjM5IDYwLjM5IDAgMDA0MS4zIDExNy42OWMzIC41NiA0LjEyLTEuMzEgNC4xMi0yLjkxIDAtMS40NC0uMDUtNi4xOS0uMDgtMTEuMjRDMjguNTQgMTA3LjE5IDI1IDk2LjQyIDI1IDk2LjQyYy0yLjc1LTctNi43MS04Ljg0LTYuNzEtOC44NC01LjQ4LTMuNzUuNDEtMy42Ny40MS0zLjY3IDYuMDcuNDMgOS4yNiA2LjIyIDkuMjYgNi4yMiA1LjM5IDkuMjMgMTQuMTMgNi41NyAxNy41NyA1IC41NS0zLjkgMi4xMS02LjU2IDMuODQtOC4wN0MzNiA4NS41NSAyMS44NSA4MC4zNyAyMS44NSA1Ny4yM0EyMy4zNSAyMy4zNSAwIDAxMjguMDggNDFjLS42My0xLjUyLTIuNy03LjY2LjU4LTE2IDAgMCA1LjA3LTEuNjIgMTYuNjEgNi4xOWE1Ny4zNiA1Ny4zNiAwIDAxMzAuMjUgMEM4NyAyMy40MiA5Mi4xMSAyNSA5Mi4xMSAyNWMzLjI4IDguMzIgMS4yMiAxNC40Ni41OSAxNmEyMy4zNCAyMy4zNCAwIDAxNi4yMSAxNi4yMWMwIDIzLjItMTQuMTIgMjguMy0yNy41NyAyOS44IDIuMTYgMS44NyA0LjA5IDUuNTUgNC4wOSAxMS4xOCAwIDguMDgtLjA2IDE0LjU5LS4wNiAxNi41NyAwIDEuNjEgMS4wOCAzLjQ5IDQuMTQgMi45QTYwLjM5IDYwLjM5IDAgMDA2MC4zOSAweiIgLz48cGF0aCBjbGFzc05hbWU9InByZWZpeF9fY2xzLTIiIGQ9Ik0yMi44NyA4Ni43Yy0uMTMuMy0uNi4zOS0xIC4xOXMtLjY5LS42MS0uNTUtLjkxLjYxLS4zOSAxLS4xOS42OS42MS41NC45MXpNMjUuMzIgODkuNDNjLS4yOS4yNy0uODUuMTQtMS4yNC0uMjhhLjkyLjkyIDAgMDEtLjE3LTEuMjVjLjMtLjI3Ljg0LS4xNCAxLjI0LjI4cy40NyAxIC4xNyAxLjI1ek0yNy43IDkyLjkxYy0uMzcuMjYtMSAwLTEuMzUtLjUycy0uMzctMS4xOCAwLTEuNDQgMSAwIDEuMzUuNTEuMzcgMS4xOSAwIDEuNDV6TTMxIDk2LjI3YTEuMTMgMS4xMyAwIDAxLTEuNTktLjI3Yy0uNTMtLjQ5LS42OC0xLjE4LS4zNC0xLjU0czEtLjI3IDEuNTYuMjMuNjggMS4xOC4zMyAxLjU0ek0zNS40NiA5OC4yMmMtLjE1LjQ3LS44Mi42OS0xLjUxLjQ5cy0xLjEzLS43Ni0xLTEuMjQuODItLjcgMS41MS0uNDkgMS4xMy43NiAxIDEuMjR6TTQwLjQgOTguNThjMCAuNS0uNTYuOTEtMS4yOC45MnMtMS4zLS4zOC0xLjMxLS44Ny41Ni0uOTIgMS4yOS0uOTMgMS4zLjM5IDEuMy44OHpNNDUgOTcuOGMuMDkuNDktLjQxIDEtMS4xMiAxLjEycy0xLjM1LS4xNy0xLjQ0LS42Ni40Mi0xIDEuMTItMS4xMiAxLjM1LjE3IDEuNDQuNjZ6IiAvPjwvc3ZnPg=="}
      const json = JSON.parse(Base64.decode(result.split(',')[1]))
      // console.log(json)
      json.svg = Base64.decode(json.image.split(',')[1])
      return json
    } catch (e) {
      console.error(e)
      return null
    }
  }
}
