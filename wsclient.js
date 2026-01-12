//connect to websocket server
const socket = new WebSocket("http://localhost:80");

socket.addEventListener("open", function open() {
  console.log("Simulator connected to Websocket Server");

  const json = { role: "simulator" };

  //Send Identification JSON
  socket.send(JSON.stringify(json));
});

socket.addEventListener("error", (event) => {
  console.log("WEBSOCKET SAYS ERROR");
  console.error(event);
});

socket.addEventListener("close", () => {
  console.log("WEBSOCKET SAYS DISCONNECTED");
});

function sendOverWebSocket(data) {
 // console.log(JSON.stringify(data))
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(data));
  }
}

export { sendOverWebSocket };
