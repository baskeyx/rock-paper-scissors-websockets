import { useEffect, useContext } from 'react';
import { WebsocketContext } from '../../Components/Websocket';
import MultiplayerMenu from '../../Components/MultiplayerMenu';

const Multiplayer = () => {
  const { connection } = useContext(WebsocketContext);

  // const createGame = () => {
  //   context.sendMessage({
  //     type: 'createGame',
  //   });
  // }

  useEffect(() => {
    // context.sendMessage({
    //   type: 'getGames',
    // });
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
      {(connection ? <MultiplayerMenu /> : <div>No</div>)}
    </main>
  )
}

export default Multiplayer;
