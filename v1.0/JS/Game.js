function createGame() {
    const state = {
        players: {},
        fruits: {}
    };

    //PLAYER
    function addPlayer(command){
        state.players[command.playerID] = {
            x: command.playerX,
            y: command.playerY
        };
    }

    function removePlayer(command){
        delete state.players[command.playerID];
    }

    function movePlayer(command) {
        const acceptedMoves = {
            ArrowUp: player => {
                player.y = Math.max(player.y - 1, 0);
            },
            ArrowDown: player => {
                player.y = Math.min(player.y + 1, screen.height - 1);
            },
            ArrowLeft: player => {
                player.x = Math.max(player.x - 1, 0);
            },
            ArrowRight: player => {
                player.x = Math.min(player.x + 1, screen.width - 1);
            }
        };
        
        const player = state.players[command.playerID];
        const moveFunction = acceptedMoves[command.keyPressed];
        if(player && moveFunction){
            moveFunction(player);
            checkForFruitCollision(command.playerID);
        }
    }

    //FRUIT
    function addFruit(command){
        state.fruits[command.fruitID] = {
            x: command.fruitX,
            y: command.fruitY
        };
    }

    function removeFruit(command){
        delete state.fruits[command.fruitID];
    }

    function checkForFruitCollision(playerID){
        const player = state.players[playerID];
        for(fruitID in state.fruits){
            const fruit = state.fruits[fruitID];
            if(player.x === fruit.x && player.y === fruit.y){
                console.log(`Collision between ${playerID} and ${fruitID}`);
                removeFruit({fruitID: fruitID});
            }
        }
    }

    return {
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        state
    };
}

export default createGame;