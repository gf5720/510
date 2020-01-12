import $ from 'jquery'
import ContactManager from '../modules/ContactManager'
// import ScrollCanceler from '../modules/ScrollCanceler'

class Contact {
    constructor() {
        this.$body = $('body')
        this.$contact = $('#js-contact')
        this.$formWrap = $('.p-contact')
        this.$select = $('.c-input__select')
        this.select = $('.c-input__select select')
        this.$selectView = $('.c-input__select-view')
        this.$selectItem = $('.c-input__select-list ul li')

        // this.scrollCanceler = new ScrollCanceler()

        // $('.js-type-select').on('change',(e) => {
        //   console.log(e);
        //
        //
        // })

        this.click = e => this._click(e)

        this.$selectItem.on('click', e => {
            e.preventDefault()
            let $this = $(e.currentTarget)
            let $li = $this.parents('.c-input__select-list').find('ul li')
            let text = $this.data('value') ? $this.data('value') : $this.text()
            let viewText = $this.text()
            let $jsSelect = $this.parents('.js-select')
            let $select = $this.parents('.c-input__select').find('select');
            let $selectView = $this.parents('.c-input__select').find('.c-input__select-view');
            $jsSelect.removeClass('is-current')
            if ($li.index(this) !== 0) $jsSelect.addClass('is-current')

            if (text !== '選択してください') {
                $selectView.addClass('is-black')
            } else {
                $selectView.removeClass('is-black')
            }

            $selectView.text(viewText)
            $select.val(text)

            let num = Number($this.attr('data-form-num'));

            $('form').eq(num).addClass('is-current');
        })

        this.$select.on('click', e => {
            e.preventDefault()
            if (window.innerWidth < 768) return
            let $this = $(e.currentTarget)
            $this.toggleClass('is-active')
        })

        this.select.on('change', e => {
            let text = $(e.currentTarget).val()
            console.log(text);

            $('form').removeClass('is-current');
            if (text !== '選択してください') {
                this.$selectView.addClass('is-black')
            } else {
                this.$selectView.removeClass('is-black')
            }
            
            if(text === '採用に関するお問い合わせ'){
              $('form').eq(0).addClass('is-current');
            } else {
              $('form').eq(1).addClass('is-current');
            }
            this.$selectView.text(text)
        })

        $('.c-table__item.is-zip01 input').on('focusout', e => {
            setTimeout(() => {
                let value = this.select.val()
                this.$selectView.text(value)
                this.select.val(value)
            }, 0)
        })

        this.init()
    }
    init() {
        this.contactManager = new ContactManager()
        this.contactManager.init()
    }
    destory() {}
}

export default Contact
