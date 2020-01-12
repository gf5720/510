import { TweenMax, Circ } from 'gsap'
import $ from 'jquery'

const OPTION = {
    baseDelay: 0,
    itemDelay: 0.3,
    speed: 1.2,
    ease: Circ.easeInOut,
    itemClass: '.js-slide-in',
    innerClass: '.js-slide-in-inner'
}

class SlideIn {
    constructor(target, option) {
        this.opt = Object.assign({}, OPTION, option);
        this.$target = $(target)
        this.$inner = this.$target.find(this.opt.innerClass)
        this.direction = $(target).data('direction')
    }
    init() {
        if (this.direction == 'vertical') {
            TweenLite.set(this.$target, { y: '-100%', overflow: 'hidden' })
            TweenLite.set(this.$inner, { y: '100%', display: 'inline-block' })
            return
        }
        TweenLite.set(this.$target, { x: '-100%', overflow: 'hidden' })
        TweenLite.set(this.$inner, { x: '100%', display: 'inline-block' })
    }
    render(delay = 0) {
        let o, i
        if (this.direction == 'vertical') {
            o = TweenLite.to(this.$target, this.opt.speed, {
                y: '0%',
                ease: this.opt.ease
            })
            i = TweenLite.to(this.$inner, this.opt.speed, {
                y: '0%',
                ease: this.opt.ease
            })
        } else {
            o = TweenLite.to(this.$target, this.opt.speed, {
                x: '0%',
                ease: this.opt.ease
            })
            i = TweenLite.to(this.$inner, this.opt.speed, {
                x: '0%',
                ease: this.opt.ease
            })
        }

        o.delay(delay)
        i.delay(delay)
    }
}

export default SlideIn
