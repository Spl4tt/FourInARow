class Token {
    constructor(index, owner) {
        this.id = `token-${index}-${owner.id}`
        this.dropped = false;
        this.owner = owner;
        this.columnLocation = 0;
    }

    drawlHTMLToken() {
        const div = document.createElement('div');
        document.getElementById('game-board-underlay').appendChild(div);
        div.setAttribute('id', this.id);
        div.setAttribute('class', 'token');
        div.style.backgroundColor = this.owner.colour;
    }

    get htmlToken() {
        return document.getElementById(this.id);
    }

    /**
     * Gets left offset of html element.
     * @return  {number}   Left offset of token object's htmlToken.
     */
    get offsetLeft() {
        return this.htmlToken.offsetLeft;
    }

    /**
     * Moves html token one column to left.
     */
    moveLeft() {
        const token = this.htmlToken;
        if(this.columnLocation > 0) {
            token.style.left = this.offsetLeft - 76;
            this.columnLocation -= 1;
        }
    }

    /**
     * Moves html token one column to right.
     * @param   {number}    columns - number of columns in the game board
     */
    moveRight(columns) {
        const token = this.htmlToken;
        if(this.columnLocation < columns - 1) {
            token.style.left = token.offsetLeft + 76;
            this.columnLocation += 1;
        }
    }

    /**
     * Drops html token into targeted board space.
     * @param   {Object}   target - Targeted space for dropped token.
     * @param   {function} reset  - The reset function to call after the drop animation has completed.
     */
    drop(target, reset) {
        this.dropped = true;
        $(this.htmlToken).animate({
            top: (target.y * target.diameter)
        }, 750, 'easeOutBounce', reset);
    }
}