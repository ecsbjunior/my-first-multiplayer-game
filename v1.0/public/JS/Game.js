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

    function start(){
        const frequency = 2000;
        setInterval(addFruit, frequency);
    }

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
        const playerID = command.playerID;

        delete state.players[playerID];

        notifyAll({
            type: 'removePlayer',
            playerID: playerID
        });
    }

    function movePlayer(command) {
        notifyAll(command);
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
        const fruitID = command ? command.fruitID : Math.floor(Math.random() * 1000000);
        const fruitX = command ? command.fruitX : Math.floor(Math.random() * state.screen.width);
        const fruitY = command ? command.fruitY : Math.floor(Math.random() * state.screen.height);

        state.fruits[fruitID] = {
            x: fruitX,
            y: fruitY
        };

        notifyAll({
            type: 'addFruit',
            fruitID: fruitID,
            fruitX: fruitX,
            fruitY: fruitY
        });
    }

    function removeFruit(command){
        const fruitID = command.fruitID;
        
        delete state.fruits[fruitID];

        notifyAll({
            type: 'removeFruit',
            fruitID: fruitID
        });
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
        start,
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