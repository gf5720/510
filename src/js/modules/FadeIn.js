import { TweenLite, Circ } from 'gsap'
import $ from 'jquery'

const OPTION = {
    baseDelay: 0, // 基本のディレイ
    itemDelay: 0.3, // 要素ごとのディレイ
    speed: 1.2, //アニメーションスピード
    ease: Circ.easeInOut, //イージング
    itemClass: '.js-fade-in', //スライドさせるelement
    startX: 0, //Xの開始ポジション
    startY: 0 //Yの開始ポジション
}

class FadeIn {
    constructor(target) {
        this.$target = $(target)
        this.opt = Object.assign({}, OPTION, option);
    }
    init() {
        TweenLite.set(this.$target, { 
            x: this.opt.startX,
            y: this.opt.startY,
            opacity: 0
        })
    }
    render(delay = 0) {
        let tween = TweenLite.to(this.$target, this.opt.speed, {
            x: 0,
            y: 0,
            opacity: 1,
            ease: this.opt.ease,
        })
        tween.delay(delay)
    }
}

export default FadeIn
