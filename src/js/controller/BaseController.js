import DisableScroll from '../util/disableScroll'
import debounce from 'lodash/debounce'
import $ from 'jquery'
import Swiper from 'swiper/dist/js/swiper.js';
let Promise = require('es6-promise').Promise
require('intersection-observer')

class BaseController {
    constructor() {
        this.$html = $('html')
        this.$body = $('body')
        this.$window = $(window)
        this.$images = $('img')
        this.$areaLink = $('.js-area-link');
        this.$mvSlider = $('.swiper-container');
        this.$menu = $('.js-menu')
        this.imgLength = this.$images.length
        this.spFlg = false
        this.pcFlg = false
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.onScroll = () => {}
        this.onResize = () => {}
        this.onClickArea = (e) => this._onClickArea(e);
        this.onTouchToglle = e => this._onTouchToglle(e)
    }
    init() {
        return new Promise(resolve => {
            
            this.resize = () => this._resize()
            this.$window.on('resize', debounce(this.resize, 500))
            this.onEventHandler()
            this.resize()
            this.$body.addClass('init');
            DisableScroll.off()
            document.addEventListener('DOMContentLoaded', e => {
                this.pcSet();
                this.interObserve()

                if($('body').attr('id') === 'index'){
                    this.mvSlide = new Swiper(this.$mvSlider.eq(0), {
                        touchEventsTarget: 'wrapper',
                        longSwipes: false,
                        shortSwipes: false,
                        simulateTouch: false,
                        slidesPerView: 'auto',
                        centeredSlides: false,
                        speed: 4000,
                        loop: true,
                        autoplay: {
                            delay: 0,
                            disableOnInteraction: false
                        }
                    });
                    
                    this.mvSlide2 = new Swiper(this.$mvSlider.eq(1), {
                        touchEventsTarget: 'wrapper',
                        longSwipes: false,
                        shortSwipes: false,
                        simulateTouch: false,
                        speed: 4000,
                        slidesPerView: 'auto',
                        centeredSlides: false,
                        loop: true,
                        loopAdditionalSlides: 2,
                        initialSlide: 10,
                        autoplay: {
                            delay: 0,
                            disableOnInteraction: false
                        }
                    });
                } else if($('body').attr('id') === 'spot'){
                    let href = window.location.hash;
                    if(href){
                        let top = $(href).offset().top;
                        $('body,html').animate({scrollTop: top - 100});    
                    }
                }

                resolve()
            })
        })
    }
    _onTouchToglle(e) {
        e.preventDefault()

        if (this.$body.hasClass('is-menu-open')) {
            DisableScroll.off()
        } else {
            DisableScroll.on()
        }

        this.$body.toggleClass('is-menu-open')
    }
    _onClickArea(e){
        e.preventDefault();
        let $this = $(e.currentTarget);
        let href = $this.attr('href');
        let top = $(href).offset().top;
        $('body,html').animate({scrollTop: top});
    }
    onEventHandler() {
        this.$areaLink.on('click', this.onClickArea);
        this.$menu.on('click', this.onTouchToglle)
    }

    _resize() {
        this.width = window.innerWidth
        this.height = window.innerHeight
        // if (this.width > 768 && !this.pcFlg) {
        //     this.pcSet()
        //     this.pcFlg = true
        // } else if (this.width <= 768 && !this.spFlg) {
        //     this.spSet()
        //     this.spFlg = true
        // }
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
