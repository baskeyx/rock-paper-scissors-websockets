import { useEffect, useState } from 'react';
import styles from './Result.module.scss';
import Button from '../Button';
import Anchor from '../Anchor';

const Result = ({ game, onClick }) => {
  const [display, setDisplay] = useState('');
  useEffect(()=>{
    setDisplay('show')
  }, []);

  return (
    <div>
      <div className={`${styles.wrapper} ${styles[display]}`}>
        <div className={styles.playerContainer}>
          <div className={styles.player}>Player</div>
          <div className={styles.score}>{game.p1.score}</div>
          <div className={styles.choice}>{game.p1.go.value}</div>
        </div>
        <div className={styles.playerContainer}>
          <div className={styles.player}>Computer</div>
          <div className={styles.score}>{game.p2.score}</div>
          <div className={styles.choice}>{game.p2.go.value}</div>
        </div>
      </div>
      {(game.complete ? <Anchor to='/'>End Game</Anchor> : <Button theme='button' name='continue' value='continue' onClick={onClick} />)}
    </div>
  )
}

export default Result;
