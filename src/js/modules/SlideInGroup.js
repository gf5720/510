import { Circ } from 'gsap'
import $ from 'jquery'
import SlideIn from './SlideIn'

const OPTION = {
    baseDelay: 0, // 基本のディレイ
    itemDelay: 0.3, // 要素ごとのディレイ
    speed: 1.2, //アニメーションスピード
    ease: Circ.easeInOut, //イージング
    itemClass: '.js-slide-in', //スライドさせるelement
    innerClass: '.js-slide-in-inner' //中のelement
}

class SlideInGroup {
    constructor(target, option = {}) {
        this.opt = Object.assign({}, OPTION, option);
        this.$base = $(target)
        this.$target = this.$base.find(this.opt.itemClass)
        this.dataArray = []
    }
    init() {
        for (let i = 0; i < this.$target.length; i++) {
            const $el = this.$target.eq(i)
            let delay = this.$base.data('delay')
            delay = delay ? delay : this.opt.baseDelay
            
            this.dataArray[i] = {
                instance: new SlideIn($el, this.opt),
                delay: i *  this.opt.itemDelay + delay,
            }
            this.dataArray[i].instance.init()
        }
    }
    start() {
        for (let i = 0; i < this.$target.length; i++) {
            this.dataArray[i].instance.render(this.dataArray[i].delay)
        }
    }
}

export default SlideInGroup
