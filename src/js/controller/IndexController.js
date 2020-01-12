import $ from 'jquery'
import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'
import SimpleSlider from '../modules/SimpleSlider.js'
import DrawStroke from '../modules/DrawStroke.js'
import DisableScroll from '../util/disableScroll'
// import Contact from '../modules/Contact'
import Map from '../modules/Map';

require('intersection-observer')

class IndexController {
    constructor() {
        this.$html = $('html')
        this.$mv = $('.p-mv')
        this.$section = $('section')
        this.$nav = $('.p-nav__item')
        this.$navLink = $('.js-nav-link')
        this.$soltab = $('.c-sol-box__tab');

        this.update = () => this._update()
        this.onLoad = () => this._onLoad()
        this.onNavClick = e => this._onNavClick(e)
        this.onTab = e => this._onTab(e)
        this.scroll = throttle(e => this._scroll(e), 16)

        this.scrollY = 0
        this.lastTime = 0
        this.sectionArray = []
        this.windowWidth = window.innerWidth
        this.windowHeight = window.innerHeight
        this.beforeWindowWidth = this.windowWidth
    }
    init() {
        // this.contact = new Contact()
        this.map = new Map();
        this.drawStroke = new DrawStroke('.svg-message');
        this.map.init();

        this.onEvent()
        // this.setVideo()
        this.update()
        this.$html.addClass('is-load-start')
        DisableScroll.off()
    }
    onEvent() {
        window.addEventListener('scroll', this.scroll)
        window.addEventListener('resize', this.onResize)
        this.$navLink.on('click', this.onNavClick)
        this.$soltab.on('click', this.onTab);
          window.addEventListener('load', this.onLoad)
    }
    _onTab(e){
      e.preventDefault()
      const $target = $(e.currentTarget)
      let num = Number($target.attr('data-tab'))
      $target.parents('.c-sol-box__tabs').find('a').removeClass('is-current');
      $target.parents('.c-sol-box__body').find('.c-sol-box__item').removeClass('is-current');
      $target.addClass('is-current');
      $target.parents('.c-sol-box__body').find('.c-sol-box__item').eq(num).addClass('is-current');
    }
    _onNavClick(e) {
        e.preventDefault()
        const $target = $(e.currentTarget)
        let id = $target.attr('data-hash')
        let scroll = $(id).offset().top;

        if (id === '#about') {
          scroll = scroll - 50;
        } else if(id === '#top'){
          scroll = 0;
        }

        if (this.$html.hasClass('is-menu')) {
            this.$html.removeClass('is-menu')
        }

        DisableScroll.off()

        $('html,body').animate({ scrollTop: scroll }, 500)
    }
    _scroll(e) {
        this.scrollY = window.pageYOffset
    }
    _onLoad() {
        this.setSection()
        setTimeout(() => {
            this.$html.addClass('is-load-end')
        }, 1500)
        // this.$mv.css({
        //     height: this.windowHeight + 30,
        // })
    }
    setSection() {
        this.sectionArray = []
        for (let i = 0; i < this.$section.length; i++) {
            const $target = this.$section.eq(i)
            this.sectionArray.push({
                el: $target,
                offsetTop: $target.offset().top - 100,
                height: $target.height(),
                state: false,
            })
        }
        console.log(this.sectionArray);
    }
    onResize() {
        // this.setVideo()
        // this.setSection()
        // this.windowWidth = window.innerWidth
        // this.windowHeight = window.innerHeight
        // this.parentFit()
        // if (this.windowWidth !== this.beforeWindowWidth) {
        //     this.$mv.css({
        //         height: this.windowHeight + 30,
        //     })
        // }
        // setTimeout(() => {
        //     this.parentFit()
        //     this.windowWidth = window.innerWidth
        //     this.beforeWindowWidth = this.windowWidth
        // }, 300)
    }

    changeNavCurrrent(num) {
        this.$html
            .removeClass('is-0')
            .removeClass('is-1')
            .removeClass('is-2')
            .removeClass('is-3')
            .removeClass('is-4')
            .removeClass('is-5')
            .removeClass('is-6')
        this.$nav.removeClass('is-current')
        this.$html.addClass('is-' + num)
        this.$nav.eq(num).addClass('is-current')
    }
    _update() {
        let now = Date.now()
        let diff = now - this.lastTime

        if (this.slider) {
            this.slider.update(diff)
        }

        for (let i = 0; i < this.sectionArray.length; i++) {
            if (
                !this.sectionArray[i].state &&
                this.sectionArray[i].offsetTop < this.scrollY + 100 &&
                this.scrollY + 100 <
                    this.sectionArray[i].offsetTop + this.sectionArray[i].height
            ) {
                for (let j = 0; j < this.sectionArray.length; j++) {
                    this.sectionArray[j].state = false
                }
                this.sectionArray[i].state = true

                //ナビのカレントを変更
                this.changeNavCurrrent(i)
            }
        }
        this.lastTime = now
        requestAnimationFrame(this.update)
    }
    onScroll(scroll) {}
}

export default IndexController
