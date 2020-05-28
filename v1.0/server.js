import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import createGame from './public/JS/Game.js';

const app = express();
const server = http.createServer(app);
const sockets = socketio(server);
const game = createGame();

app.use(express.static('public'));

game.addPlayer({playerID: 'evandro', playerX: 0, playerY: 0});
game.addFruit({fruitID: 'fruit1', fruitX: 5, fruitY: 5});

sockets.on('connection', (socket) => {
    const playerID = socket.id;
    console.log(`Player connected on server with id ${playerID}`);

    socket.emit('setup', game.state);
});

server.listen(5500, () => {
    console.log(`> Server listening on port: 5500`);
});