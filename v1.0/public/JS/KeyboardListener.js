function createKeyboardListener(document) {
    document.addEventListener('keydown', handleKeydown);

    const state = {
        observers: [],
        playerID: null
    };

    function subscribe(observerFunction){
        state.observers.push(observerFunction);
    }

    function notifyAll(command){
        for(const observerFunction of state.observers){
            observerFunction(command);
        }
    }

    function registerPlayerID(playerID){
        state.playerID = playerID;
    }

    function handleKeydown(event){
        const keyPressed = event.key;
        const command = {
            type: 'movePlayer',
            playerID: state.playerID,
            keyPressed
        };

        notifyAll(command);
    }

    return {
        subscribe,
        registerPlayerID
    };
}

export default createKeyboardListener;