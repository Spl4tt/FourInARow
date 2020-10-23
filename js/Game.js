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
    handleKeydown(event) {
        if(this.ready) {
            if(event.key === "ArrowLeft") {
                this.activePlayer.activeToken.moveLeft();
            }
            else if (event.key === "ArrowRight") {
                this.activePlayer.activeToken.moveRight(this.board.columns);
            }
            else if (event.key === "ArrowDown") {

            }
        }
    }

    get activePlayer() {
         return this.players.find(player => player.active);
    }
}