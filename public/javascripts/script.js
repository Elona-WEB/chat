const ws = new WebSocket("ws://localhost:3000");

ws.onmessage = (msg) => {
  let primero = JSON.parse(msg.data);
  renderMessages(primero);
};

const renderMessages = (data) => {
  const html = data.map((item) => `<p>${item}</p>`).join(" ");
  document.getElementById("messages").innerHTML = html;
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  const message = document.getElementById("message");
  const author = document.getElementById("author");
  var pegar = author.value + "|" + message.value;
  ws.send(pegar);
  message.value = "";
  author.value = "";
};

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);
