class Game {
    constructor() {
        this.board = new Board();
        this.players = this.createPlayers();
        this.ready = false;
    }

    createPlayers() {
        const players = [];
        players.push(new Player('Gaggi', 1, '#e15258', true));
        players.push(new Player('Furzi', 2, '##e59a13'));
        return players;
    }

    /**
     * Initializes the game
     */
    startGame() {
        this.board.drawHTMLBoard();
        this.activePlayer.activeToken.drawlHTMLToken();
        this.ready = true;
    }

    /**
     * Branches code, depending on what key player presses
     * @param   {Object}    e - Keydown event object
     */
    handleKeydown(e) {
        if(this.ready) {
            if(e.key === "ArrowLeft") {
                this.activePlayer.activeToken.moveLeft();
            }
            else if (e.key === "ArrowRight") {
                this.activePlayer.activeToken.moveRight(this.board.columns);
            }
            else if (e.key === "ArrowDown") {
                this.playToken();
            }
        }
    }

    get activePlayer() {
         return this.players.find(player => player.active);
    }

    playToken() {
        const activeToken = this.activePlayer.activeToken;
        const column = activeToken.columnLocation;
        let targetSpace = null;
        for(const space of this.board.spaces[column]) {
            if(space.token === null) {
                targetSpace = space;
            }
        }

        if(targetSpace !== null) {
            game.ready = false;
            activeToken.drop(targetSpace);
        }
    }
}