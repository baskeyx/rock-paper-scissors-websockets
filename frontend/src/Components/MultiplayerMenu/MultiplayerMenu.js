import { useState, useEffect, useContext } from 'react';
import Anchor from "../Anchor";
import { WebsocketContext } from '../Websocket';

const MultiplayerMenu = () => {
  const [games, setGames] = useState([]);
  const { sendMessage } = useContext(WebsocketContext);

  useEffect(() => {
    sendMessage({
      type: 'getGames',
    });
    // todo - how to setState from the websockets component?
  }, []);

  const createGame = () => {
    sendMessage({
      type: 'createGame',
    });
  };

  return (
    <div>
      <h2>Multiplayer</h2>
      <div></div>
      <Anchor to='/create'>Create Game</Anchor>
      <button onClick={createGame}>Test</button>
    </div>
  )
};

export default MultiplayerMenu;
