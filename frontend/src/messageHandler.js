const messageHandler = (payload, setGames) => {
  console.log('message handler', payload);
  setGames(payload.payload.response);
};

export default messageHandler;
