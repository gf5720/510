import $ from 'jquery'
import { TweenLite } from 'gsap'

const OPTION = {
    force: 0.05,
    containerClass: '.js-smooth-scroll',
    innerClass: '.js-smooth-scroll-inner',
}

class SmoothScroll {
    constructor(option) {
        // this.opt = Object.assign({}, OPTION, option)
        this.force = 0.05
        this.containerClass = '.js-smooth-scroll'
        this.innerClass = '.js-smooth-scroll-inner'
        this.$scroll
        this.$inner
        this.isScroll = false
        this.init()
    }
    init() {
        this.$scroll = $(this.containerClass)
        this.$inner = $(this.innerClass)
        this.scroll = 0
        this.targetPos = 0
        this.resize()
    }
    update() {
        this.scroll = this.scroll
    }
    _render() {
        TweenLite.set(this.$inner, { y: -this.scroll })
    }
    setTargetPos(scroll) {
        this.scroll = scroll
        this.targetPos = scroll
    }
    setScroll(scroll) {
        this.scroll = scroll
        this.targetPos = scroll
        this._render()
    }
    getScroll() {
        return this.scroll
    }
    resize() {
        // $('body').height(this.$inner.height())
    }
    destroy() {
        cancelAnimationFrame(this.rafID)
    }
}

export default SmoothScroll
