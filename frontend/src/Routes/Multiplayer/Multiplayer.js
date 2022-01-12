import { useState, useEffect, useContext } from 'react';
import Anchor from '../../Components/Anchor';
import { WebsocketContext } from '../../Components/Websocket';

const Multiplayer = () => {
  const [games, setGames] = useState([]);

  const context = useContext(WebsocketContext);

  const createGame = () => {
    context.sendMessage({
      type: 'createGame',
    });
  }

  useEffect(() => {
    context.sendMessage({
      type: 'getGames',
    });
    // if (!localStorage.rps) {
    //   const userId = uuidv4();
    //   setId(userId);
    //   localStorage.rps = userId;
    // } else {
    //   setId(localStorage.rps);
    // };
  }, []);
  
  return (
    <main>
      <h2>Multiplayer</h2>
      <Anchor to='/create'>Create Game</Anchor>
      <button onClick={createGame}>Test</button>
    </main>
  )
}

export default Multiplayer;
