import Timer from '../util/Timer'

/**
 * カルーセルの時間を管理するマネージャ
 */
class CarouselTimeManager {
    constructor(option) {
        this.opt = option
        this.timer
        this.progress
        this.isChange = false
    }
    /**
     * 初期化
     */
    init() {
        this.timer = new Timer()
        this.update = () => this._update()
    }
    /**
     * 時計をスタート
     */
    start() {
        cancelAnimationFrame(this.rafID)
        this.progress = 0
        this.timer.start()
        this.update()
    }
    /**
     * アップデート
     */
    _update() {
        if (this.isChange) {
            cancelAnimationFrame(this.rafID)
            return
        }

        let time = this.timer.getDelta()
        this.progress = time / this.opt.changeTiming

        if (time > this.opt.changeTiming) {
            cancelAnimationFrame(this.rafID)
            this.progress = 1
            this.isChange = true

            // indexを1進める
            this.onChange(1).then(() => {
                this.isChange = false
                this.start()
            })

            return
        }

        this.rafID = requestAnimationFrame(this.update)
    }
    /**
     * 経過を取得 0 ~ 1
     */
    getProgress() {
        return this.progress
    }
}

/**
 * インデックスを管理するマネージャ
 */
class CarouselManager extends CarouselTimeManager {
    constructor(option) {
        super(option)
        this.index = 0
        this.length = 5
    }
    /**
     * 初期化
     */
    init() {
        super.init()
    }
    /**
     * 開始
     */
    start() {
        super.start()
    }
    /**
     * 変更時
     * @param {number} val 
     */
    onChange(val) {
        this.move(val)
    }
    /**
     * indexをval分だけ進める
     * @param {number} val 
     */
    move(val) {
        this.beforeIndex = this.index
        let next = this.index + val
        if (next >= this.length) {
            this.index = 0
            return
        }
        if (next < 0) {
            this.index = this.length - 1
            return
        }
        this.index += val
    }
    /**
     * 現在のindexを取得
     */
    getIndex() {
        return this.index
    }
    /**
     * 一つ前のindexを取得
     */
    getBeforeIndex() {
        return this.beforeIndex
    }
}

export default CarouselManager;