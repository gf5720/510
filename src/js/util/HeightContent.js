import $ from 'jquery'

class HeightContent {
    constructor() {
        this.$el = $('.js-height-content')
        this.set()
    }
    set() {
        this.$el.height(window.innerHeight)
    }
}

export default HeightContent
