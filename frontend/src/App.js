import Router from './Components/Router';
import Websocket from './Components/Websocket';
import './App.css';

const App = () => {
  // useEffect(() => { 
  //   client.onopen = () => {
  //     console.log('WebSocket Client Connected');
  //   };
  //   client.onmessage = (data) => {
  //     console.log(JSON.parse(data.data));
  //   };
  // }, []);

  // const sendMessage = () => {
  //   console.log(payload);
  //   client.send(JSON.stringify({id: payload }));
  // } 
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Rock, Paper, Scissors</h1>
      </header>
      {/*<WebsocketContext.Provider value="Hiya">*/}
      <Websocket>
        <Router />
      </Websocket>
      {/*</WebsocketContext.Provider>*/}
      {/*<Button value="Play Computer" />
      <Button value="Play Human" />
      {options.map((option) => <Button value={option.value} />)}
      <input value={payload} onChange={(e) => setPayload(e.target.value)} />
      <button onClick={sendMessage}>Test</button>*/}
    </div>
  );
}

export default App;
