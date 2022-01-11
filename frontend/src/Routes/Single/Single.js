import { useState } from 'react';
import Board from '../../Components/Board';
import Result from '../../Components/Result';
import Type from '../../Components/Type';
import { v4 as uuidv4 } from 'uuid';
import result from '../../offline';

const Single = () => {
  const [view, setView] = useState('board');
  const [game, setGame] = useState({
    p1: { score: 0, go: '' },
    p2: { score: 0, go: '' },
    complete: false,
  });
  const [commentary, setCommentary] = useState({ 
    id: uuidv4(),
    copy: 'Select an option:',
  });

  const submitGo = (e) => {
    setView('result');
    const round = result(e.target.dataset.value);
    const gameScore = game;
    if (round.outcome === 'win') {
      gameScore.p1.score++;
    }
    else if (round.outcome === 'loss') {
      gameScore.p2.score++;
    }
    gameScore.p1.go = { 
      value: round.user.value,
      name: round.user.name,
    };
    gameScore.p2.go = { 
      value: round.cpu.value,
      name: round.cpu.name,
    };
    setGame({ ...gameScore });

    setCommentary({ ...{
      id: uuidv4(),
      copy: `Round: ${round.outcome}`,
    } });
  };

  const continueGo = (e) => {
    if (game.p1.score < 3 && game.p2.score < 3) {
      setView('board');
      setCommentary({ ...{
        id: uuidv4(),
        copy: 'Select an option:',
      } });
    } else {
      setView('finished');
      setCommentary({ ...{
        id: uuidv4(),
        copy: `You ${(game.p1.score === 3 ? 'win' : 'lose')}!`,
      } });
      const gameState = game;
      gameState.complete = true;
      setGame({ ...gameState })
    }
  }

  return (
    <div>
      <Type commentary={commentary}/>
      {(view==='board' ? <Board onClick={submitGo} /> : <Result onClick={continueGo} game={game} />)}
    </div>
  )
};

export default Single;
