import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log(`Cliente conectado id: ${socket.id}`);
    socket.on('timeUpdate', (tiempo) => {
        console.log(`Se adelanto al segundo: ${tiempo}`);
        io.emit('timeUpdate', tiempo)

    })
    socket.on('pausa', (data) => {
        console.log(`Se pausó ${data}`);
        io.emit('pausa', data)
    })
})

httpServer.listen(process.env.PORT || 3000, () => console.log("Servidor corriendo en el puerto 3000"));