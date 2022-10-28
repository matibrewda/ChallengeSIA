import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log(`Cliente conectado id: ${socket.id}`);
    socket.on('pausa', (data) => {
        console.log(`Se pausó ${data}`);
        io.emit('pausa', data)
    })
})

httpServer.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));