import { createContext, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
export const WebsocketContext = createContext();
const client = new W3CWebSocket('ws://localhost:7071');

const Websocket = ({ children }) => {
  useEffect(() => { 
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (data) => {
      console.log(JSON.parse(data.data));
    };
    client.onclose = () => {
      console.log('Websocket CLosed');
    };
  }, []);

  const sendMessage = (payload) => {
    console.log(payload);
    client.send(JSON.stringify({id: payload }));
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