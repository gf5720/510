import CarouselManager from './CarouselManager'
import { TweenLite } from 'gsap'
import $ from 'jquery'

const OPTION = {
    changeTiming: 5, //カルーセルの切り替えのタイミング
    changeSpeed: 1.6, //カルーセルの切り替え時のスピード
}

/**
 * カルーセル
 */
class Carousel extends CarouselManager {
    constructor(option) {
        super(Object.assign({}, option, OPTION))
        this.$el = $('.js-carousel-item')
        this.length = this.$el.length
    }
    init() {
        super.init()
    }
    start() {
        super.start()
    }
    onChange() {
        super.onChange(1)
        return new Promise(end => {
            this.animateCarousel(end)
        })
    }
    animateCarousel(end) {
        let $current = this.$el.eq(this.getIndex());
        let $before = this.$el.eq(this.getBeforeIndex());

        /* write animation here */

        end()
    }
}

export default Carousel
