import $ from 'jquery'
import throttle from 'lodash/throttle'
import { TweenLite } from 'gsap'

const OPTION = {
    target: '.js-mouse',
    fixToLink: false,
    gravity: 200,
}

class MouseCursol {
    constructor(option) {
        this.option = Object.assign({}, OPTION, option)
        this.$target = $(this.option.target)
        if (this.$target.length <= 0) return

        this.$circle = $('.js-mouse-circle')
        this.$window = $(window)
        this.$body = $('body')
        this.isFixToLink = false
        this.isThrottle = false
        this.init()
    }
    init() {
        this.render = () => this._render()
        this.pos = {
            x: 0,
            y: 0,
        }
        this.targetPos = {
            x: 0,
            y: 0,
        }
        this.onMousemove = e => this._onMousemove(e)
        this.onMouseenterLink = e => this._onMouseenterLink(e)
        this.onMouseleaveLink = e => this._onMouseleaveLink(e)
        this.onClickLink = e => this._onClickLink(e)

        this.$window.on('mousemove', throttle(this.onMousemove, 16))
        this.$body.on('mouseenter', 'a', this.onMouseenterLink)
        this.$body.on('mouseleave', 'a', this.onMouseleaveLink)
        this.$body.on('click', 'a', this.onClickLink)

        this.render()
    }
    _onClickLink(e) {
        this.$circle.addClass('is-click')
    }
    _onMousemove(e) {
        this.$circle.removeClass('is-click')
        if (this.isFixToLink) return
        this.targetPos = {
            x: e.clientX,
            y: e.clientY,
        }
    }
    _onMouseenterLink(e) {
        if (this.option.fixToLink) {
            let $target = $(e.currentTarget)
            let offset = $target.offset()
            let x = offset.left + $target.width() * 0.5
            let y = offset.top - $(window).scrollTop() + $target.height() * 0.5
            this.targetPos = {
                x: x,
                y: y,
            }
            this.isFixToLink = true
        }
        this.$circle.addClass('is-link')
        let color = $(e.currentTarget).data('link-color')
        if (color) {
            this.$circle.css({ backgroundColor: color, color: color })
        }
    }
    _onMouseleaveLink(e) {
        this.$circle.removeClass('is-link')
        this.$circle.css({ backgroundColor: '', color: '' })
        this.isFixToLink = false
        this.targetPos = {
            x: e.clientX,
            y: e.clientY,
        }
    }
    _render() {
        this.pos.x +=
            (this.targetPos.x - this.pos.x) * 0.001 * this.option.gravity
        this.pos.y +=
            (this.targetPos.y - this.pos.y) * 0.001 * this.option.gravity
        TweenLite.set(this.$target, { x: this.pos.x, y: this.pos.y })
        requestAnimationFrame(this.render)
    }
}

export default MouseCursol
