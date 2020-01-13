import DisableScroll from '../util/disableScroll'
import debounce from 'lodash/debounce'
import $ from 'jquery'
import Map from '../modules/Map'
let Promise = require('es6-promise').Promise
require('intersection-observer')

class BaseController {
    constructor() {
        this.$html = $('html')
        this.$body = $('body')
        this.$window = $(window)
        this.$images = $('img')
        this.$menu = $('.js-menu')
        this.imgLength = this.$images.length
        this.spFlg = false
        this.pcFlg = false
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.onScroll = () => {}
        this.onResize = () => {}
    }
    init() {
        return new Promise(resolve => {
            
            this.resize = () => this._resize()
            this.$window.on('resize', debounce(this.resize, 500))
            this.resize()
            this.$body.addClass('init');
            DisableScroll.off()
            this.Map = new Map();
            this.Map.init();
            document.addEventListener('DOMContentLoaded', e => {
                this.pcSet();
                this.interObserve()
                resolve()
            })
        })
    }
    _resize() {
        this.width = window.innerWidth
        this.height = window.innerHeight
    }
    pcSet() {
        for (let i = 0; i < this.imgLength; i++) {
            const $element = this.$images.eq(i);
            if (!$element.hasClass('sp-load')) $element.attr('src', $element.data('src'));
        }
    }
    spSet() {
        this.$spImages = $('.sp-load')
        let length = this.$spImages.length
        for (let i = 0; i < length; i++) {
            const $element = this.$spImages.eq(i);
            $element.attr('src', $element.data('src'));
        }
    }
    interObserve() {
        const target = document.querySelectorAll('.js-inter')
        const option = {
            //発火位置
            rootMargin: '0% 0px 30px 0px',
            //発火回数
            threshold: [0.001, 1.0],
        }
        const observer = new IntersectionObserver(entries => {
            entries.filter(e => {
                if (e.intersectionRatio > 0) {
                    e.target.classList.add('is-invasion')
                } else {
                    //画面外に入る度クラスの付け替えをする場合のクラス
                    // if ($(e.target).hasClass('inter-toggle')) {
                    e.target.classList.remove('is-invasion')
                }
            })
        }, option)

        const l = target.length
        for (let i = 0; i < l; i++) {
            observer.observe(target[i])
        }
    }
}

export default BaseController
