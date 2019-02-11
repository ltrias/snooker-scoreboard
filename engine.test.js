const engine = require('./engine.js')

describe('Brazilian Snooker Rules', () => {
    beforeEach(() => {
        this.game = new engine.GameEngine()
    })

    describe('Single player', () => {
        it('Should have a smaller ball', () => {
            expect(this.game.smallerBall).toBe(1)
        })
    
        it('Should reset state', () => {
            this.game.addPot(1)
            expect(this.game.smallerBall).toBe(2)
            expect(this.game.freeBall).toBeTruthy()
            this.game.reset()
            expect(this.game.freeBall).toBeFalsy()
            expect(this.game.smallerBall).toBe(1)
        })
    
        it('Should increment smallerBall when potting ball on', () => {
            this.game.addPot(1)
            expect(this.game.smallerBall).toBe(2)
        })
    
        it('Should not increment smallerBall when potting ball on after last ball on', () => {
            this.game.addPot(1)
            this.game.addPot(2)
            expect(this.game.smallerBall).toBe(2)
        })
    
        it('Should not increment smallerBall when potting smallerBall as free ball', () => {
            this.game.addPot(1)
            expect(this.game.smallerBall).toBe(2)
            this.game.addPot(2)
            expect(this.game.smallerBall).toBe(2)
            this.game.addPot(2)
            expect(this.game.smallerBall).toBe(3)
        })
    
        it('Should not increment smallerBall when potting higher value ball', () => {
            this.game.addPot(5)
            expect(this.game.smallerBall).toBe(1)
        })
    
        it('Should not increment smallerBall when potting higher value ball on after ball on', () => {
            this.game.addPot(1)
            this.game.addPot(6)
            expect(this.game.smallerBall).toBe(2)
        })
    
        it('Should not increment smallerBall when potting higher value ball at risk after ball on', () => {
            this.game.addPot(1)
            this.game.addPot(6)
            this.game.addPot(4)
            expect(this.game.smallerBall).toBe(2)
        })
    
        it('Should work when simulating single player with smallest score', () => {
            this.game.addPot(1)
            expect(this.game.smallerBall).toBe(2)
            this.game.addPot(2)
            expect(this.game.smallerBall).toBe(2)
            this.game.addPot(2)
            expect(this.game.smallerBall).toBe(3)
            this.game.addPot(3)
            expect(this.game.smallerBall).toBe(3)
            this.game.addPot(3)
            expect(this.game.smallerBall).toBe(4)
            this.game.addPot(4)
            expect(this.game.smallerBall).toBe(4)
            this.game.addPot(4)
            expect(this.game.smallerBall).toBe(5)
            this.game.addPot(5)
            expect(this.game.smallerBall).toBe(5)
            this.game.addPot(5)
            expect(this.game.smallerBall).toBe(6)
            this.game.addPot(6)
            expect(this.game.smallerBall).toBe(6)
            this.game.addPot(6)
            expect(this.game.smallerBall).toBe(7)
            this.game.addPot(7)
            expect(this.game.smallerBall).toBe(7)
            this.game.addPot(7)
        })
    
        it('Should work when simulating single player with highest score', () => {
            this.game.addPot(7)
            expect(this.game.smallerBall).toBe(1)
            this.game.addPot(1)
            expect(this.game.smallerBall).toBe(2)
            this.game.addPot(7)
            expect(this.game.smallerBall).toBe(2)
            this.game.addPot(7)
            expect(this.game.smallerBall).toBe(2)
            this.game.addPot(2)
            expect(this.game.smallerBall).toBe(3)
            this.game.addPot(7)
            expect(this.game.smallerBall).toBe(3)
            this.game.addPot(7)
            expect(this.game.smallerBall).toBe(3)
            this.game.addPot(3)
            expect(this.game.smallerBall).toBe(4)
            this.game.addPot(7)
            expect(this.game.smallerBall).toBe(4)
            this.game.addPot(7)
            expect(this.game.smallerBall).toBe(4)
            this.game.addPot(4)
            expect(this.game.smallerBall).toBe(5)
            this.game.addPot(7)
            expect(this.game.smallerBall).toBe(5)
            this.game.addPot(7)
            expect(this.game.smallerBall).toBe(5)
            this.game.addPot(5)
            expect(this.game.smallerBall).toBe(6)
            this.game.addPot(7)
            expect(this.game.smallerBall).toBe(6)
            this.game.addPot(7)
            expect(this.game.smallerBall).toBe(6)
            this.game.addPot(6)
            expect(this.game.smallerBall).toBe(7)
            this.game.addPot(7)
            expect(this.game.smallerBall).toBe(7)
            this.game.addPot(7)
            expect(this.game.smallerBall).toBe(8)
        })
    })

    describe('Players in turns', () => {
        it('Should reset free ball when turn switches', () => {
            this.game.addPot(1)
            expect(this.game.freeBall).toBeTruthy()
            this.game.switchPlayer()
            expect(this.game.freeBall).toBeFalsy()
        })   
    })

    describe('Messaging', () => {
        it('Should start with regular ball', () => {
            expect(this.game.message).toBe(this.game.MESSAGE.REGULAR_BALL)
        })

        it('Should be free ball after potting on ball', () => {
            this.game.addPot(1)
            expect(this.game.message).toBe(this.game.MESSAGE.FREE_BALL)
        })

        it('Should be regular ball after potting on ball and free bll', () => {
            this.game.addPot(1)
            expect(this.game.message).toBe(this.game.MESSAGE.FREE_BALL)
            this.game.addPot(5)
            expect(this.game.message).toBe(this.game.MESSAGE.REGULAR_BALL)
        })

        it('Should be regular ball after switching players', () => {
            this.game.addPot(1)
            expect(this.game.message).toBe(this.game.MESSAGE.FREE_BALL)
            this.game.switchPlayer()
            expect(this.game.message).toBe(this.game.MESSAGE.REGULAR_BALL)
        })
        
        it('Should reset to regular ball', () => {
            this.game.addPot(1)
            this.game.reset()
            expect(this.game.message).toBe(this.game.MESSAGE.REGULAR_BALL)
        })
    })
    
})