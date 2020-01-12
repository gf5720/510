/**
 * スクロールを固定したい時に使用するライブラリ
 */
export default class ScrollCanceler {
    constructor(target) {
        this.$target = document.querySelector(target) || document.body
    }

    /**
     * スクロールの禁止
     */
    cancel() {
        this.scrollPosition = window.pageYOffset
        this.$target.style.width = '100%'
        this.$target.style.top = -this.scrollPosition + 'px'
        this.$target.style.position = 'fixed'
        this.$target.style.overflow = 'hidden'
    }
    /**
     * スクロールの許可
     */
    arrow() {
        this.$target.style.width = ''
        this.$target.style.top = ''
        this.$target.style.position = ''
        this.$target.style.overflow = ''
        window.scroll(0, this.scrollPosition)
    }
}
