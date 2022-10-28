let master = false;
let socket = io("ws://localhost:3000");
let player;

window.onload = () => {
  player = document.getElementById("video");

  player.addEventListener("seeking", (event) => {
    if (master) socket.emit("timeUpdate", player.currentTime);
  });

  player.addEventListener("pause", (event) => {
    socket.emit("pausa", true);
  });

  player.addEventListener("play", (event) => {
    socket.emit("pausa", false);
  });

  socket.on("masterChanged", (newMaster) => {
    if (newMaster != socket.id) {
      master = false;
      document.getElementById("masterButton").innerHTML = master
        ? "Dejar de ser el master"
        : "Ser el master";
    }
  });

  socket.on("pausa", (shouldPause) => {
    if (shouldPause) {
      player.pause();
      console.log("Pausa");
    } else {
      player.play();
      console.log("play");
    }
  });

  socket.on("timeUpdate", (tiempo) => {
    if (!master) {
      player.currentTime = tiempo;
      console.log("tiempo actualizado");
    }
  });
};

function toggleMaster() {
  master = !master;

  if (master) socket.emit("masterChanged", socket.id);

  document.getElementById("masterButton").innerHTML = master
    ? "Dejar de tomar el control"
    : "Tomar el control";
}
