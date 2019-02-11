class GameEngine {
    constructor(){
        this.MESSAGE = {
            REGULAR_BALL: 'Bola da vez',
            FREE_BALL: 'Bola livre',
            GAME_ENDED_WITH_5_ON_TABLE: 'Fim de jogo, diferença maior de 46 pontos com azul na mesa',
            GAME_ENDED_WITH_6_ON_TABLE: 'Fim de jogo, diferença maior de 27 pontos com rosa na mesa',
            GAME_ENDED_WITH_7_ON_TABLE: 'Fim de jogo, diferença maior de 7 pontos com preta na mesa',
        }

        this.smallerBall = 1
        this.freeBall = false;
        this.message = this.MESSAGE.REGULAR_BALL

    }

    addPot(b){
        if( this.freeBall ){
            this.freeBall = false
            this.message = this.MESSAGE.REGULAR_BALL
        } else {
            if( parseInt(b) === this.smallerBall ){
                this.smallerBall += 1
                this.freeBall = true
                this.message = this.MESSAGE.FREE_BALL
            }
        }
    }

    switchPlayer(){
        this.freeBall = false
        this.message = this.MESSAGE.REGULAR_BALL
    }

    reset(){
        this.smallerBall = 1
        this.freeBall = false
        this.message = this.MESSAGE.REGULAR_BALL
    }

    getState(){
        return {
            message: this.message
        }
    }
}

module.exports = {GameEngine}