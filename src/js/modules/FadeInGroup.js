import { Circ } from 'gsap'
import $ from 'jquery'
import FadeIn from './FadeIn'

const OPTION = {
    baseDelay: 0, // 基本のディレイ
    itemDelay: 0.3, // 要素ごとのディレイ
    speed: 1.2, //アニメーションスピード
    ease: Circ.easeInOut, //イージング
    itemClass: '.js-fade-in', //スライドさせるelement
    startX: 0, //Xの開始ポジション
    startY: 0 //Yの開始ポジション
}
class FadeInGroup {
    constructor(target, option) {
        this.$base = $(target)
        this.opt = Object.assign({}, OPTION, option)
        this.$target = this.$base.find(this.opt.itemClass)
        this.dataArray = []
    }
    init() {
        for (let i = 0; i < this.$target.length; i++) {
            const $element = this.$target.eq(i)
            let delay = this.$base.data('delay')
            delay = delay ? delay : this.opt.baseDelay
            this.dataArray[i] = {
                instance: new FadeIn($element, this.opt),
                delay: i * this.opt.itemDelay + delay,
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

export default FadeInGroup
