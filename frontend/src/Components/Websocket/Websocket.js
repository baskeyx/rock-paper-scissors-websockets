import { useState, useEffect, createContext } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { v4 as uuidv4 } from 'uuid';
export const WebsocketContext = createContext();
const client = new W3CWebSocket('ws://localhost:7071');

const Websocket = ({ children }) => {
  const [id, setId] = useState('');
  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (data) => {
      console.log(JSON.parse(data.data));
    };
    client.onclose = () => {
      console.log('WebSocket Closed');
    };
    if (!localStorage.rps) {
      const userId = uuidv4();
      setId(userId);
      localStorage.rps = userId;
    } else {
      setId(localStorage.rps);
    };
  }, []);

  const sendMessage = (payload) => {
    console.log(payload);
    client.send(JSON.stringify({
      id,
      payload,
    }));
  } 

  return (
    <div>
      <WebsocketContext.Provider value={sendMessage}>
        {/*<Multiplayer />
        <input value={payload} onChange={(e) => setPayload(e.target.value)} />
        <button onClick={sendMessage}>Test</button>*/}
        {children}
      </WebsocketContext.Provider>
    </div>
  );
}

export default Websocket;