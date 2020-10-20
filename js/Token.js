class Token {
    constructor(index, owner) {
        this.id = `token-${index}-${owner.id}`
        this.dropped = false;
        this.owner = owner;
    }

    drawlHTMLToken() {
        const div = document.createElement('div');
        document.getElementById('game-board-underlay').appendChild(div);
        div.setAttribute('id', this.id);
        div.setAttribute('class', 'token');
        div.style.backgroundColor = this.owner.colour;
    }

}