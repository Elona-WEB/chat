const WebSocket = require("ws");
const Message = require("./models/message");

const clients = [];
const messages = [];

const wsConnection = (server) => {
  const wss = new WebSocket.Server({ server });

  wss.on("connection", (ws) => {
    clients.push(ws);
    sendMessages();

    ws.on("message", (message) => {
      console.log(message);
      let fin = message.split("|");

      persist(fin[1], fin[0]);
      messages.push(fin[1]);
      sendMessages();
    });
  });

  const sendMessages = () => {
    clients.forEach((client) => client.send(JSON.stringify(messages)));
  };
};

function persist(msg, auth) {
  author = auth;
  message = msg;
  Message.create({ message, author })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err.errors[0].message);
    });
}

exports.wsConnection = wsConnection;
