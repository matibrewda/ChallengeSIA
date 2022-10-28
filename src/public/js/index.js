window.onload = () => {
  let socket = io("ws://localhost:3000");
  let player = document.getElementById("video");



  player.addEventListener("pause", (event) => {
    socket.emit("pausa", true);
  });

  player.addEventListener("play", (event) => {
    socket.emit("pausa", false);
  });


  socket.on('pausa', (data) => {
    if(data)
      pauseVid()
    else
      playVid()
  })

  function playVid() {
    player.play();
  }

  function pauseVid() {
    player.pause();
  }
}