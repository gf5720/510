import $ from 'jquery'
import 'hammerjs'
import { TweenMax } from 'gsap'

const OPTION = {
    $element: 'body',
    DURATION: 0.6,
    slider: '.js-slider',
    item: '.js-slider-item',
    images: '.js-slider-images',
    right: '.js-slider-right',
    left: '.js-slider-left',
    pager: '.js-slider-pager',
}

class SimpleSlider {
    constructor(options) {
        this.options = $.extend({}, OPTION, options)

        this.$win = $(window)
        this.$slider = $(this.options.slider)
        this.DURATION = this.options.DURATION

        this.$wrap = this.$slider.find(this.options.slider)
        this.$item = this.$slider.find(this.options.item)
        this.$images = this.$slider.find(this.options.images)
        this.$imagesW = this.$images.width()
        this.$imagesWH = this.$imagesW / 2
        this.$next = this.$slider.find(this.options.right)
        this.$prev = this.$slider.find(this.options.left)
        this.$pager = this.$slider.find(this.options.pager)
        this.$cursor = this.$slider.find('#js-profile-slider-cursor')
        this.cursorX = 0
        this.cursorY = 0
        this.posX = 0
        this.posY = 0
        this.ease = 0.15
        this.angle = 'left'

        this.itemLength = this.$item.length

        this.itemW = this.$item.width()
        this.itemH = this.$item.height()
        this.itemWHarf = this.itemW / 2
        this.itemHHarf = this.itemH / 2

        this.hm = new Hammer(this.$slider[0])

        this.onResize = e => this._onResize(e)
        this.next = e => this._next(e)
        this.prev = e => this._prev(e)
        this.onClickPager = e => this._onClickPager(e)
        this.onClickImage = e => this._onClickImage(e)
        this.onMouseMove = e => this._onMouseMove(e)
        this.onMouseEnter = e => this._onMouseEnter(e)
        this.onMouseLeave = e => this._onMouseLeave(e)

        this.oldIndex = 0
        this.index = 0
        this.moveFlg = false
        this.isSP = false

        this.init()
    }
    init() {
        this.$win.on('resize.slider', this.onResize)
        this.$next.on('click', this.next)
        this.$prev.on('click', this.prev)
        this.$pager.on('click', this.onClickPager)
        this.$images.on('click', this.onClickImage)
        this.hm.on('swiperight', this.prev)
        this.hm.on('swipeleft', this.next)
        this.$images.on('mousemove', this.onMouseMove)
        this.$images.on('mouseenter', this.onMouseEnter)
        this.$images.on('mouseleave', this.onMouseLeave)
        this.$imagesW = this.$images.width()
        this.$imagesWH = this.$imagesW / 2

        this.$pager.eq(this.index).addClass('is-current')
        this.$item.eq(this.index).addClass('sliderTop')

        this.onResize()
    }
    _onMouseEnter(e) {
        e.preventDefault()
        this.$slider.addClass('is-enter')
    }
    _onMouseLeave(e) {
        e.preventDefault()
        this.$slider.removeClass('is-enter')
    }
    _onClickImage(e) {
        e.preventDefault()
        if (this.angle === 'right') {
            this.$next.trigger('click')
        } else {
            this.$prev.trigger('click')
        }
    }
    _onResize() {
        this.itemW = this.$item.width()
        this.itemH = this.$item.height()
        this.itemWHarf = this.itemW / 2
        this.itemHHarf = this.itemH / 2

        if (800 < window.innerWidth) {
            this.isSP = false
            TweenMax.set(this.$wrap, {
                x: 0,
            })
        } else {
            this.isSP = true
            TweenMax.to(this.$wrap, 0.6, {
                x: -this.itemW * this.index,
                ease: Power4.easeOut,
            })
        }
    }
    _onMouseMove(e) {
        this.cursorX = e.offsetX
        this.cursorY = e.offsetY
        if (this.angle === 'right' && this.cursorX < this.$imagesWH) {
            this.angle = 'left'
            this.$slider.removeClass('is-right')
            this.$slider.addClass('is-left')
        } else if (this.angle === 'left' && this.$imagesWH <= this.cursorX) {
            this.angle = 'right'
            this.$slider.removeClass('is-left')
            this.$slider.addClass('is-right')
        }
    }
    _onClickPager(e) {
        e.preventDefault()
        if (this.moveFlg) return
        this.oldIndex = this.index
        let $this = $(e.currentTarget)
        this.index = Number($this.data('pager'))
        this.change(this.$item.eq(this.index), this.$item.eq(this.oldIndex))
    }
    update() {
        this.posX += (this.cursorX - this.posX) * this.ease
        this.posY += (this.cursorY - this.posY) * this.ease

        TweenMax.set(this.$cursor, {
            x: this.posX - 30,
            y: this.posY - 30,
        })
    }
    _next(e) {
        e.preventDefault()
        if (this.moveFlg) return
        this.oldIndex = this.index
        this.index++
        if (this.itemLength <= this.index) {
            this.index = 0
        }
        this.change(this.$item.eq(this.index), this.$item.eq(this.oldIndex))
    }
    _prev(e) {
        e.preventDefault()
        if (this.moveFlg) return
        this.oldIndex = this.index
        this.index--
        if (this.index < 0) {
            this.index = this.itemLength - 1
        }
        this.change(this.$item.eq(this.index), this.$item.eq(this.oldIndex))
    }
    change($target, $oldTarget) {
        this.moveFlg = true

        this.$slider.addClass('is-change')
        this.$pager.removeClass('is-current')
        this.$pager.eq(this.index).addClass('is-current')
        $target.addClass('sliderNext')
        // TweenMax.to(this.$wrap, 0.6, {
        //     x: -window.innerWidth * this.index,
        //     ease: Power4.easeOut,
        // })

        setTimeout(() => {
            this.$item.removeClass('sliderTop')
            this.$item.removeClass('sliderNext')
            $target.addClass('sliderTop')
            this.$slider.removeClass('is-change')
            this.moveFlg = false
        }, 100)
    }
    destroy() {
        this.$win.off('resize.slider')
        this.$next.off('click')
        this.$prev.off('click')
        this.$pager.off('click')
        this.hm.on('swiperight', this.prev)
        this.hm.on('swipeleft', this.next)
    }
}

export default SimpleSlider
