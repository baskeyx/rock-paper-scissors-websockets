import options from './options';

const getRandomOption = max => {
  return Math.floor(Math.random() * Math.floor(max))
};

const handleResult = (user, cpu) => {
  if (options[user].beats === options[cpu].name) {
      return "win"
  }
  else if (options[user].loses === options[cpu].name) {
      return "loss"
  }
  else {
      return "tie"
  }
};

const result = (user) => {
  user = options.findIndex((o) => o.name === user.toLowerCase());
  console.log('user', user);
  const cpu = getRandomOption(3);
  console.log('cpu', cpu);
  return {
    user: options[user],
    cpu: options[cpu],
    outcome: handleResult(user, cpu),
  };
}

export default result;