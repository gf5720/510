import $ from 'jquery'

class FullVideo {
    constructor() {
        this.$el = $('.js-full-video')
        this.init()
    }
    init() {
        this.data = {
            width: this.$el[0].videoWidth,
            height: this.$el[0].videoHeight,
        }

        this.screen = {
            width: window.innerWidth,
            height: window.innerHeight,
        }

        this.set()
    }
    set() {
        this.screen = {
            width: window.innerWidth,
            height: window.innerHeight,
        }
        this.screen.per = this.screen.width / this.screen.height
        this.data.per = this.data.width / this.data.height
        if (this.screen.per > this.data.per) {
            this.$el.width(this.screen.width)
            this.$el.height(
                this.screen.width * (this.data.height / this.data.width)
            )
            this.$el.css({
                top: (this.screen.height - this.$el.height()) * 0.5 + 'px',
                left: 0,
            })
        } else {
            this.$el.width(
                this.screen.height * (this.data.width / this.data.height)
            )
            this.$el.height(this.screen.height)
            this.$el.css({
                top: 0,
                left: (this.screen.width - this.$el.width()) * 0.5 + 'px',
            })
        }
    }
}

export default FullVideo
