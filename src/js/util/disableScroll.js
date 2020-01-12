/**
 * スクロールを固定したい時に使用するライブラリ
 */
class DisableScroll {
    constructor(target) {
        this.$target = document.querySelector(target) || document.body
        this.isActive = false
        this.isSmoothScroll = true

        this.$body = document.getElementsByTagName('body')[0]
        this.$html = document.getElementsByTagName('html')[0]

        this.onScroll = e => this._onScroll(e)
        this.onTouchmove = e => this._onTouchmove(e)
    }

    /**
     * スクロールの禁止
     */
    on() {
        document.addEventListener('touchmove', this.onTouchmove, {
            passive: false,
        })
        document.addEventListener('scroll', this.onScroll, { passive: false })

        this.isActive = true
        this.$body.style.overflow = 'hidden'
        this.$html.style.overflow = 'hidden'
    }
    /**
     * スクロールの許可
     */
    off() {
        document.removeEventListener('touchmove', this.onTouchmove, {
            passive: true,
        })
        document.removeEventListener('scroll', this.onScroll, {
            passive: true,
        })

        this.isActive = false
        this.$body.style.overflow = ''
        this.$html.style.overflow = ''
    }

    /**
     * トグル
     */
    toggle() {
        if (this.isActive) {
            this.off()
            return
        }
        this.on()
    }

    /**
     * スクロール時
     * @param {*} e event
     */
    _onScroll(e) {
        e.preventDefault()
    }

    /**
     * タッチムーブ時
     * @param {*} e event
     */
    _onTouchmove(e) {
        e.preventDefault()
    }

    /**
     * DisableScrollがアクティブかどうか
     */
    getIsActive() {
        return this.isActive
    }
}

const disableScroll = new DisableScroll()

export default disableScroll
