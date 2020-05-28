import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import createGame from './public/JS/Game.js';

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);
const game = createGame();

app.use(express.static('public'));

game.subscribe((command) => {
    console.log(`Emiting ${command.type}`);
    sockets.emit(command.type, command);
});

sockets.on('connection', (socket) => {
    const playerID = socket.id;
    console.log(`Player connected on server with id ${playerID}`);

    game.addPlayer({playerID: playerID});

    socket.emit('setup', game.state);

    socket.on('disconnect', () => {
        console.log(`Disconnecting -> ${playerID}`);
        game.removePlayer({playerID});
    })
});

server.listen(3000, () => {
    console.log(`> Server listening on port: 3000`);
});