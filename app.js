require('dotenv').config();
const express = require('express');
const path = require('path');
const WebSocketServer = require('ws').Server;
const mongoose = require('mongoose');
const getGames = require('./backend/endpoints/getGames');
const createGame = require('./backend/endpoints/createGame');

const environment = process.env.ENVIRONMENT;

if (environment === 'PROD') {
  const app = express();

  app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
  // Serve static files from the React frontend app
  app.use(express.static(path.join(__dirname, 'frontend/build')))

  // AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/build", "index.html"));
  })
}

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
    console.log(pMessage);
    ws.send(JSON.stringify(pMessage));
  });
  ws.on("close", () => {
    console.log('closed');
  });
});

// const broadcast = (message) => {
//   wss.clients.forEach((client) => client.send(message));
// };
