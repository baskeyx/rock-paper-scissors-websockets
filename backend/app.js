const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 7071 });
const { v4: uuidv4 } = require('uuid');

const gs = [];

// const g = {
//   id: '1312313',
//   p1: '2323232',
//   p2: '3232132',
//   game: [
//     {
//       timestamp: 0,
//       p1: 'r',
//       p2: 'p',
//       w: 0
//     }
//   ],
//   turn: 1,
//   playing: 1,
// }

wss.on('connection', (ws) => {
  console.log('opened');
  ws.on('message', (data, isBinary) => {
    const message = isBinary ? data : data.toString();
    const pMessage = JSON.parse(message);
    console.log(pMessage.id);
    broadcast(JSON.stringify(pMessage));
  });
  ws.on("close", () => {
    console.log('closed');
  });
});

const broadcast = (message) => {
  wss.clients.forEach((client) => client.send(message));
};
