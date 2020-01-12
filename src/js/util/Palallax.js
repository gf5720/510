import $ from 'jquery'
import { TweenLite } from 'gsap'

class Parallax {
    constructor() {
        this.$targets = document.querySelectorAll('.js-parallax')
        this.dataArray = []
        this.init()
        this.isThrottle = false
    }
    init() {
        for (let index = 0; index < this.$targets.length; index++) {
            const target = this.$targets[index]
            this.dataArray.push({
                $target: $(target),
                top: $(target).offset().top,
                bottom: $(target).offset().top + $(target).height(),
                range: $(target).data('range') ? $(target).data('range') : 1,
            })
        }
        this.height = window.innerHeight
    }
    onScroll(scroll) {
        // if (this.isThrottle) return (this.isThrottle = !this.isThrottle)
        // this.isThrottle = !this.isThrottle
        for (let data of this.dataArray) {
            if (
                scroll + this.height > data.top - 100 &&
                scroll < data.bottom + 100
            ) {
                this.render(scroll, data)
            }
        }
    }
    onResize() {
        for (let data of this.dataArray) {
            TweenLite.set(data.$target, { y: 0 })
            data.top = data.$target.offset().top
            data.bottom = data.$target.offset().top + data.$target.height()
        }
        this.height = window.innerHeight
        this.onScroll(window.pageYOffset)
    }
    render(scroll, data) {
        TweenLite.set(data.$target, {
            y:
                ((scroll - data.top) / (data.bottom - data.top + this.height)) *
                -(this.height * 0.1) *
                data.range,
        })
    }
    destroy() {
        delete this
    }
}

export default Parallax
