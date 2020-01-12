require('intersection-observer')

class InterObserve {
    constructor(options) {
        this.option = options
        this.INTER_OPTION = {
            //発火位置
            rootMargin: '0% 0px 0px 0px',
            //発火回数
            threshold: [0.001, 1.0],
        }

        this.set()
    }
    set() {
        //対象のdomがない場合は処理終了
        this.$target = document.querySelectorAll(this.option.target)
        this.$targetLen = this.$target.length
        if (this.$targetLen === 0) return

        this.observer = new IntersectionObserver(entries => {
            entries.filter(e => {
                if (e.intersectionRatio > 0) {
                    e.target.classList.add(this.option.toggleClass)
                } else {
                    //画面外に入る度クラスの付け替えをする場合のクラス
                    // if ($(e.target).hasClass('inter-toggle')) {
                    e.target.classList.remove(this.option.toggleClass)
                }
            })
        }, this.INTER_OPTION)

        for (let i = 0; i < this.$targetLen; i++) {
            this.observer.observe(this.$target[i])
        }
    }
    destory() {
        //observerを削除
        if (this.observer) {
            this.observer.disconnect()
        }
    }
}

export default InterObserve
