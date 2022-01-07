const WebSocketServer = require('ws').Server;
const mongoose = require('mongoose');
const wss = new WebSocketServer({ port: 7071 });
const { v4: uuidv4 } = require('uuid');

// mongoose.connect('mongodb+srv://infinitywars:T2Kp2xsSFKt3NZDJ@baskey.lueip.mongodb.net/infinitywars?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true,
// });

// const db = mongoose.connection;

wss.on('connection', (ws) => {
  // const uniqueId = uuidv4();
  // console.log(uniqueId);
  //ws.send('hello');
  console.log('opened');
  ws.on('message', (data, isBinary) => {
    const message = isBinary ? data : data.toString();
    const pMessage = JSON.parse(message);
    if (pMessage.type === 'createGame') {

    }
    console.log(pMessage.id);
    // ws.send('Hiya')
    // broadcast(JSON.stringify(pMessage));
  });
  ws.on("close", () => {
    console.log('closed');
  });
});

const broadcast = (message) => {
  wss.clients.forEach((client) => client.send(message));
};
