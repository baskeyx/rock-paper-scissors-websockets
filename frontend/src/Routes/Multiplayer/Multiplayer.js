import { useState, useEffect, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Anchor from '../../Components/Anchor';
import { WebsocketContext } from '../../Components/Websocket';

const Multiplayer = () => {
  const [id, setId] = useState('');
  const [games, setGames] = useState([]);

  const testing = useContext(WebsocketContext);

  const sendPayload = () => {
    testing('Hiya!');
  }

  useEffect(() => {
    if (!localStorage.rps) {
      const userId = uuidv4();
      setId(userId);
      localStorage.rps = userId;
    } else {
      setId(localStorage.rps);
    };
  }, []);
  
  return (
    <main>
      <h2>Multiplayer</h2>
      <Anchor to='/create'>Create Game</Anchor>
      <button onClick={sendPayload}>Test</button>
    </main>
  )
}

export default Multiplayer;
