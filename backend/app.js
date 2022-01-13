require('dotenv').config({ path: '../.env' });
const WebSocketServer = require('ws').Server;
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const getGames = require('./endpoints/getGames');
const createGame = require('./endpoints/createGame');

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

    const { id } = pMessage;
    const { type } = pMessage.payload;

    if (type === 'createGame') {
      pMessage.payload.response = await createGame(id);
    } else if (type === 'getGames') {
      pMessage.payload.response = await getGames();
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
