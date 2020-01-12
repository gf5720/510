import $ from 'jquery'
import { TweenMax } from 'gsap'

class Ships {
    constructor() {
        this.$ships = $('.js-ship')
        this.SHIP_MAX_W = 63
        this.MOVE_MAX = 4
        this.DURATION = 10
        this.MIN_DURATION = 8

        this.shipArray = []
        this.shipSetArray = []
        this.shipTween = []

        this.init()
    }
    init() {
        this.setArray()
    }
    setArray() {
        for (let i = 0; i < this.$ships.length; i++) {
            let $target = this.$ships.eq(i)
            let pos = this.initPos()
            this.shipArray.push({
                num: i,
                target: $target,
                state: 'in',
                angle: pos.angle,
                x: pos.x,
                y: pos.y,
                dur: pos.dur,
            })

            TweenMax.set($target, {
                x: pos.x,
                y: pos.y,
                rotationY: pos.angle === 'l' ? 0 : 180,
            })
        }
    }
    initPos() {
        let angle = this.getAngle()
        return {
            angle: angle,
            x: this.getPosX(angle),
            y: this.getPosY(),
            dur: this.getDuration(),
        }
    }
    getAngle() {
        return Math.floor(Math.random() * 2) === 0 ? 'l' : 'r'
    }
    getPosX(angle) {
        return angle === 'l'
            ? -this.SHIP_MAX_W
            : window.__GLOBAL.win.w + this.SHIP_MAX_W
    }
    getPosY() {
        return (
            Math.random() * (window.__GLOBAL.win.h * 0.6) +
            window.__GLOBAL.win.h * 0.2
        )
    }
    getRotate(x, y) {
        return Math.atan2(
            y - window.__GLOBAL.win.ch,
            x - window.__GLOBAL.win.cw
        )
    }
    getDuration() {
        return Math.floor(Math.random() * this.DURATION) + this.MIN_DURATION
    }
    setShipAngle(target) {
        if (target.state === 'in') {
            TweenMax.set(target.target, {
                rotationY: target.angle === 'l' ? 0 : 180,
            })
        } else {
            TweenMax.set(target.target, {
                rotationY: target.angle === 'l' ? 180 : 0,
            })
        }
    }
    allInPlay() {
        for (let i = 0; i <= this.MOVE_MAX; i++) {
            let target = this.shipArray[i]
            target.state = 'in'
            target.target.addClass('is-active')
            let tween = TweenMax.to(target.target, target.dur, {
                x: window.__GLOBAL.win.cw,
                onComplete: () => {
                    this.shipArray[i].state = 'out'
                    this.outPlay(target.num)
                },
            })
            this.shipTween.push(tween)
        }
    }
    inPlay(num) {
        let target = this.shipArray[num]
        target.target.addClass('is-active')
        target.dur = this.getDuration()
        this.setShipAngle(target)
        target.state = 'out'
        let tween = TweenMax.to(target.target, target.dur, {
            x: window.__GLOBAL.win.cw,
            onComplete: () => {
              this.outPlay(target.num)
            },
        })
        this.shipTween.push(tween)
    }
    outPlay(num) {
        let angle = this.getAngle()
        let target = this.shipArray[num]
        target.angle = angle
        this.setShipAngle(target)

        let x = this.getPosX(angle)
        let y = this.getPosY()

        TweenMax.set([target.target], {
            y: y,
        })

        let tween1 = TweenMax.to(target.target, 5, {
            x: x,
            onComplete: () => {
                target.target.removeClass('is-active')
                this.shipArray[target.num].state = 'in'
                this.inPlay(num)
            },
        })
        this.shipTween.push(tween1)
    }
    _onResize() {}
    play() {
        for (let i = 0; i < this.shipTween.length; i++) {
            this.shipTween[i].play()
        }
    }
    pause() {
        for (let i = 0; i < this.shipTween.length; i++) {
            this.shipTween[i].pause()
        }
    }
    destory() {}
}

export default Ships
