import { useState, useEffect, createContext } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { v4 as uuidv4 } from 'uuid';
import messageHandler from '../../messageHandler';
export const WebsocketContext = createContext();
const client = new W3CWebSocket('wss://localhost:7071');

const Websocket = ({ children }) => {
  const [id, setId] = useState('');
  const [connection, setConnection] = useState(false);
  const [games, setGames] = useState([]);

  useEffect(() => {
    client.onopen = () => {
      setConnection(true);
    };
    client.onmessage = (data) => {
      messageHandler(JSON.parse(data.data), setGames);
    };
    client.onclose = () => {
      setConnection(false);
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
    client.send(JSON.stringify({
      id,
      payload,
    }));
  } 

  return (
    <div>
      <WebsocketContext.Provider value={{
        sendMessage,
        connection,
        games,
      }}>
        {/*<Multiplayer />
        <input value={payload} onChange={(e) => setPayload(e.target.value)} />
        <button onClick={sendMessage}>Test</button>*/}
        {children}
      </WebsocketContext.Provider>
    </div>
  );
}

export default Websocket;