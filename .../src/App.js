import logo from './logo.svg';
import './App.css';
import Contract from './Contract';

function App() {

  async function connect(e) {
    e.preventDefault()

    const contract = new Contract()
    await contract.connect()
    const tokenId = await contract.mint()
    console.log('mint result', tokenId)
    // const data = await contract.tokenInfo(tokenId)
    // console.log('token data', data)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <h3 onClick={connect}>Connect</h3>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
