class Player {

    constructor(name, id, colour, active = false) {
        this.name = name;
        this.id = id;
        this.colour = colour;
        this.active =  active;
        this.tokens = this.createTokens(21);
    }

    /**
     * Creates tokens for the player
     * @param numberOfTokens    num - How many tokens will be created
     * @returns Array           array - All newly created tokens
     */
    createTokens(numberOfTokens) {
        let tokens = [];
        for(let i = 0; i<numberOfTokens; i++) {
            tokens.push(new Token(i, this));
        }
        return tokens;
    }

    get unusedTokens() {
        // filter style
        return this.tokens.filter(token => !token.dropped);
        //// Oldschool style
        // const unusedTokens = [];
        // for(const token of this.tokens) {
        //     if(!token.dropped) {
        //         unusedTokens.push(token);
        //     }
        // }
        // return unusedTokens;
    }

    get activeToken() {
        return this.unusedTokens[0];
    }
}