import { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { v4 as uuidv4 } from 'uuid';
import Router from './Components/Router';
import Button from './Components/Button';
import options from './options';
import './App.css';

const client = new W3CWebSocket('ws://localhost:7071');

const App = () => {
  const [message, setMessage] = useState('');
  const [id, setId] = useState('');

  useEffect(() => { 
    setId(uuidv4());
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (data) => {
      console.log(JSON.parse(data.data));
    };
  }, []);

  const sendMessage = () => {
    client.send(JSON.stringify({ 
      value: message,
      id,
    }));
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>Rock, Paper, Scissors</h1>
      </header>
      <Router />
      {/*<Button value="Play Computer" />
      <Button value="Play Human" />
      {options.map((option) => <Button value={option.value} />)}
      <input value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Test</button>*/}
    </div>
  );
}

export default App;
