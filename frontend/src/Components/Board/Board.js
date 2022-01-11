import Button from '../Button';
import options from '../../options';

const Board = ({ ...props }) => (
  <div>
    {options.map((option) => <Button key={option.value} theme='panel' name={option.name} value={option.value} {...props} />)}
  </div>
);

export default Board;
