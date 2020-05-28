function renderScreen(screen, game, requestAnimationFrame, currentPlayerID) {
    const context = screen.getContext('2d');
    const currentPlayer = game.state.players[currentPlayerID];

    //clear game's screen
    context.clearRect(0, 0, 10, 10);

    //Render players in screen
    for(const playerID in game.state.players) {
        const player = game.state.players[playerID];
        context.fillStyle = '#ffadad';
        context.fillRect(player.x, player.y, 1, 1);
    }

    //Render fruits in screen
    for(const fruitID in game.state.fruits) {
        const fruit = game.state.fruits[fruitID];
        context.fillStyle = '#fbffa8';
        context.fillRect(fruit.x, fruit.y, 1, 1);
    }

    if(currentPlayer){
        context.fillStyle = '#99a5ff';
        context.fillRect(currentPlayer.x, currentPlayer.y, 1, 1);
    }

    //call function renderScreen
    requestAnimationFrame(() => {
        renderScreen(screen, game, requestAnimationFrame, currentPlayerID);
    });
}

export default renderScreen;