function createGame() {
    const state = {
        players: {},
        fruits: {},
        screen: {
            width: 10,
            height: 10
        }
    };

    const observers = [];

    function subscribe(observerFunction){
        observers.push(observerFunction);
    }

    function notifyAll(command){
        for(const observerFunction of observers){
            observerFunction(command);
        }
    }

    function setState(newState){
        Object.assign(state, newState);
    }

    //PLAYER
    function addPlayer(command){
        const playerID = command.playerID;
        const playerX = 'playerX' in command ? command.playerX : Math.floor(Math.random() * state.screen.width);
        const playerY = 'playerY' in command ? command.playerY : Math.floor(Math.random() * state.screen.height);

        state.players[command.playerID] = {
            x: playerX,
            y: playerY
        };

        notifyAll({
            type: 'addPlayer',
            playerID: playerID,
            playerX: playerX,
            playerY: playerY
        });
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
                player.y = Math.min(player.y + 1, state.screen.height - 1);
            },
            ArrowLeft: player => {
                player.x = Math.max(player.x - 1, 0);
            },
            ArrowRight: player => {
                player.x = Math.min(player.x + 1, state.screen.width - 1);
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
        for(const fruitID in state.fruits){
            const fruit = state.fruits[fruitID];
            if(player.x === fruit.x && player.y === fruit.y){
                console.log(`Collision between ${playerID} and ${fruitID}`);
                removeFruit({fruitID: fruitID});
            }
        }
    }

    return {
        subscribe,
        setState,
        addPlayer,
        removePlayer,
        addFruit,
        removeFruit,
        movePlayer,
        state
    };
}

export default createGame;