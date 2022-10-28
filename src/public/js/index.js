window.onload = () => {
  let socket = io("ws://localhost:3000");
  let player = document.getElementById("video");

  player.addEventListener("timeupdate", (event) => {
    socket.emit('timeUpdate', player.currentTime)
});


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

  socket.on('timeUpdate', (tiempo) => {
    if(tiempo){
        console.log(tiempo)
        setTime(tiempo)
    }

  })

  function playVid() {
    player.play();
  }

  function pauseVid() {
    player.pause();
  }
  function setTime(tiempo){
    console.log(tiempo)
    player.currentTime = tiempo;
  }
}