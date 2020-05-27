function renderScreen(screen, game, requestAnimationFrame) {
    //clear game's screen
    context.clearRect(0, 0, 10, 10);

    //Render players in screen
    for(const playerID in game.state.players) {
        const player = game.state.players[playerID];
        context.fillStyle = 'black';
        context.fillRect(player.x, player.y, 1, 1);
    }

    //Render fruits in screen
    for(const fruitID in game.state.fruits) {
        const fruit = game.state.fruits[fruitID];
        context.fillStyle = 'green';
        context.fillRect(fruit.x, fruit.y, 1, 1);
    }

    //call function renderScreen
    requestAnimationFrame(() => {
        renderScreen(screen, game, requestAnimationFrame);
    });
}

export default renderScreen;