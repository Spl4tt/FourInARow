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
            const thisGame = this;
            thisGame.ready = false;
            activeToken.drop(targetSpace, function(){
                thisGame.updateGameState(activeToken, targetSpace);
            });
        }
    }

    /**
     * Checks if there a winner on the board after each token drop.
     * @param   {Object}    target - Targeted space for dropped token.
     * @return  {boolean}   Boolean value indicating whether the game has been won (true) or not (false)
     */

    checkForWin(target) {
        const owner = target.token.owner;
        let win = false;

        // vertical
        for (let x = 0; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.spaces[x][y+1].owner === owner &&
                    this.board.spaces[x][y+2].owner === owner &&
                    this.board.spaces[x][y+3].owner === owner) {
                    win = true;
                }
            }
        }

        // horizontal
        for (let x = 0; x < this.board.columns - 3; x++ ){
            for (let y = 0; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.spaces[x+1][y].owner === owner &&
                    this.board.spaces[x+2][y].owner === owner &&
                    this.board.spaces[x+3][y].owner === owner) {
                    win = true;
                }
            }
        }

        // diagonal
        for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 0; y < this.board.rows - 3; y++){
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.spaces[x-1][y+1].owner === owner &&
                    this.board.spaces[x-2][y+2].owner === owner &&
                    this.board.spaces[x-3][y+3].owner === owner) {
                    win = true;
                }
            }
        }

        // diagonal
        for (let x = 3; x < this.board.columns; x++ ){
            for (let y = 3; y < this.board.rows; y++){
                if (this.board.spaces[x][y].owner === owner &&
                    this.board.spaces[x-1][y-1].owner === owner &&
                    this.board.spaces[x-2][y-2].owner === owner &&
                    this.board.spaces[x-3][y-3].owner === owner) {
                    win = true;
                }
            }
        }

        return win;
    }

    /**
     * Switches active player.
     */
    switchPlayers() {
        for(const player of this.players) {
            player.active = !player.active;
        }
    }

    /**
     * Displays game over message.
     * @param {string} message - Game over message.
     */
    gameover(message) {
        const htmlGameOver = document.getElementById('game-over');
        htmlGameOver.textContent = message;
        htmlGameOver.style.display = 'block';
    }

    /**
     * Updates game state after token is dropped.
     * @param   {Object}  token  -  The token that's being dropped.
     * @param   {Object}  target -  Targeted space for dropped token.
     */
    updateGameState(token, target) {
        target.mark();
        if(this.checkForWin(target)) {
            this.gameover(`${target.owner.name} won the match`);
        }
        else {
            this.switchPlayers();
            if(this.activePlayer.checkTokens()) {
                this.activePlayer.activeToken.drawlHTMLToken();
                this.ready = true;
            }
            else {
                this.gameover(`${target.owner.name} has no tokens left. Game End.`)
            }
        }
    }
}