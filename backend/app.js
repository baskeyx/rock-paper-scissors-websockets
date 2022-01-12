require('dotenv').config({ path: '../.env' });
const WebSocketServer = require('ws').Server;
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const getGames = require('./endpoints/getGames');

const wss = new WebSocketServer({ port: 7071 });

const mongo = {
  username: process.env.MONGOUSER,
  password: process.env.MONGOPWORD,
  db: process.env.MONGODB,
}

mongoose.connect(`mongodb+srv://${mongo.username}:${mongo.password}@cluster0.pbyqo.mongodb.net/${mongo.db}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

wss.on('connection', (ws) => {
  console.log('opened');
  ws.on('message', async (data, isBinary) => {
    const message = isBinary ? data : data.toString();
    const pMessage = JSON.parse(message);
    // console.log(pMessage);
    const { type } = pMessage.payload;

    if (type === 'createGame') {
      const checkGame = await game.find({
        completed: false,
        p1: { id: pMessage.id, score: 0 },
      });

      if (!checkGame.length){
        const createGame = await game.create({
          id: uuidv4(),
          full: 0,
          p1: {
            id: pMessage.id,
          },
          p2: {
            id: '',
          }, 
          completed: 0,
        }); 
        console.log(createGame);
      } else {
        console.log(`Game already exists: ${checkGame[0].id}`)
      }
    } else if (type === 'getGames') {
      const games = await getGames();
      pMessage.payload.games = games;
    }
    ws.send(JSON.stringify(pMessage));
  });
  ws.on("close", () => {
    console.log('closed');
  });
});

// const broadcast = (message) => {
//   wss.clients.forEach((client) => client.send(message));
// };
