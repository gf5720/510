import ScrollCanceler from '../modules/ScrollCanceler'
import $ from 'jquery'

class Menu {
    constructor() {
        this.$menu = $('.c-menu')
        this.$nav = $('.p-navSp')
        this.$body = $('body')

        this.scrollCanceler = new ScrollCanceler()

        this.onClick = e => this._onClick(e)

        this.init()
    }
    init() {
        this.$menu.on('click', this.onClick)
    }
    _onClick(e) {
        e.preventDefault()
        if (this.$body.hasClass('is-nav')) {
            this.scrollCanceler.arrow()
        } else {
            this.scrollCanceler.cancel()
        }
        this.$menu.toggleClass('is-active')
        this.$nav.toggleClass('is-active')
        this.$body.toggleClass('is-nav')
    }

    reset() {
        this.$menu.removeClass('is-active')
        this.$nav.removeClass('is-active')
        this.$body.removeClass('is-nav')
    }

    resize() {
        if (800 < window.innerWidth) {
            if (this.$menu.hasClass('is-active')) {
                this.reset()
            }
        }
    }
}

export default Menu
