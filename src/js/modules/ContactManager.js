import $ from 'jquery'
// let Promise = require('es6-promise').Promise

class ContactManager {
    constructor() {
        this.$confirm = $('.js-confirm')
        this.$back = $('.js-back')
        this.$submit = $('.js-submit')
        this.$form = $('form')
        this.$formWrap = $('.p-contact__form')
        this.$contact = $('.p-contact')
    }
    init() {
        this.onClickConfirm = e => this._onClickConfirm(e)
        this.onClickBack = e => this._onClickBack(e)
        this.onClickSubmit = e => this._onClickSubmit(e)
        this.onChangeInput = e => this._onChangeInput(e)

        this.$form.on(
            'click.contact-confirm',
            '.js-confirm',
            this.onClickConfirm
        )
        this.$form.on('click.contact-back', '.js-back', this.onClickBack)
        this.$form.on('submit.contact-submit', this.onClickSubmit)
        this.$form.on(
            'change.contact-confirm',
            'input, textarea, select',
            this.onChangeInput
        )

        // this.$formSelect = $('select')
        let self = this

        // this.$formSelect.on('change', function(e) {
        //     // e.preventDefault();
        //     let value = $(this).val()
        //     console.log(e);
        //     $('.wpcf7').removeClass('is-active')
        //     $('[data-select="' + value + '"]')
        //         .parents('.wpcf7')
        //         .addClass('is-active')
        // })

        this.$formFile = $('.c-table__item.is-file input')

        $('.c-input__file-button').on('click.contact', e => {
            e.preventDefault()
            this.$formFile.trigger('click')
        })

        //init
        // $('[data-select="recruit"]')
        //     .parents('.wpcf7')
        //     .addClass('is-active')
        this.$formWrap.addClass('is-input')
    }
    destroy() {
        this.$form.off('click.contact-confirm')
        this.$form.off('click.contact-back')
        this.$form.off('submit.contact-submit')
        this.$form.off('change.contact-confirm')
    }
    _onSubmit(e) {}
    _onChangeInput(e) {
        e.preventDefault()
        this.validate(e.currentTarget, e)
    }
    _onClickConfirm(e) {
        e.preventDefault()
        let isValid = true

        $(e.delegateTarget)
            .find('input, textarea,select')
            .each((i, elem) => {
                if (!this.validate(elem, e)) {
                    isValid = false
                }
            })

        if (!isValid) {
            let scrollTop =
                $('input.is-error,textarea.is-error')
                    .eq(0)
                    .offset().top - 300
            $('.p-contact').animate({ scrollTop: scrollTop }, 200)
            return
        }

        this._fetchConfirm(e).then(() => {
            $('input, textarea').attr('readonly', 'readonly')
            this._changeContent(1, $(e.delegateTarget))
            this._setResult($(e.delegateTarget))
        })
    }
    _onClickBack(e) {
        e.preventDefault()
        $('input, textarea').attr('readonly', false)
        $(e.delegateTarget)
            .find('input, textarea')
            .each((i, elem) => {
                this.validate(elem, e)
            })
        this._changeContent(0, $(e.delegateTarget))
    }
    _onClickSubmit(e) {
        e.preventDefault()

        if (!$('.p-contact__form').hasClass('is-confirm')) return false
        if (this.isFetch) return
        this.isFetch = true
        this._fetchSubmit(e).then(
            () => {
                this._changeContent(2, $(e.delegateTarget))
                setTimeout(() => {
                    window.location.reload();
                }, 1400);
            },
            () => {
                alert('通信エラーが発生しました。')
                this.isFetch = false
            }
        )
    }
    _fetchConfirm(e) {
        return new Promise((resovle, reject) => {
            //:TODO 接続処理を書く
            resovle()
        })
    }
    _fetchSubmit(e) {
        return new Promise((resovle, reject) => {
            let $form = $('form')
            let formData = new FormData($form[0])
            resovle()
            // $.ajax({
            //     method: 'POST',
            //     url: $(e.currentTarget).attr('action'),
            //     data: formData,
            //     processData: false,
            //     contentType: false,
            // }).then(
            //     data => {
            //         if (data === 'recaptchafail') {
            //             reject()
            //         }
            //         resovle()
            //     },
            //     data => {
            //         reject()
            //     }
            // )
        })
    }
    _changeContent(index, $target) {
        this.$formWrap.removeClass('is-input')
        this.$formWrap.removeClass('is-confirm')
        this.$formWrap.removeClass('is-complete')
        this.$contact.removeClass('is-input')
        this.$contact.removeClass('is-confirm')
        this.$contact.removeClass('is-complete')
        $('.p-contact__flow ul li').removeClass('is-current')

        if (index === 0) {
            this.$formWrap.addClass('is-input')
            this.$contact.addClass('is-input')
            $target.find('.c-table__input').removeClass('is-hide')
            $target.find('.c-table__result').addClass('is-hide')
            $target.find('.error').text('')

            $('.p-contact__flow ul li')
                .eq(0)
                .addClass('is-current')

            $('.p-contact').animate({ scrollTop: 0 }, 200)
        }
        if (index === 1) {
            this.$formWrap.addClass('is-confirm')
            this.$contact.addClass('is-confirm')
            $target.find('.c-table__input').addClass('is-hide')
            $target.find('.c-table__result').removeClass('is-hide')

            $('.p-contact__flow ul li')
                .eq(1)
                .addClass('is-current')

            $('.p-contact').animate({ scrollTop: 0 }, 200)
        }
        if (index === 2) {
            this.$formWrap.addClass('is-complete')
            this.$contact.addClass('is-complete')

            $('.p-contact__flow ul li')
                .eq(2)
                .addClass('is-current')
        }


    }
    _setResult($target) {
        let $input = $target.find('.c-table__input')
        let $result = $target.find('.c-table__result')
        for (let i = 0; i < $input.length; i++) {
            let $value = $input.eq(i).find('input, textarea, select')
            if ($value.attr('type') === 'checkbox') {
                let text = ''
                for (let j = 0; j < $value.length; j++) {
                    if ($value.eq(j).prop('checked')) {
                        text += this._getInputValue($value.eq(j))
                    }
                    $result.eq(i).html(text)
                }
                // } else if( $value.attr('type') === 'radio' ){
                //   $result.eq(i).html('個人情報保護方針に同意する');
            } else {
                $result.eq(i).html(this._getInputValue($value))
            }
        }
    }
    _getInputValue($input) {
        if ($input.is('[type="radio"]')) {
            return $input.filter(':checked').val()
        } else {
            let val = ''
            for (let i = 0; i < $input.length; i++) {
                val += $input.eq(i).val() + ' '
            }
            return val
        }
    }
    validate(elem, e) {
        let name = elem.name
        let type = elem.type
        console.log(elem);
        console.log();
        if (name === 'privacy' || name === 'contact-type') {
            $(elem)
                .parents('.c-table__item')
                .find('.c-table__lower .c-table__error')
                .text('')
        } else if (name === 'email') {
            $(elem)
                .parents('.c-table__item')
                .find('.c-table__lower .c-table__error')
                .text('')
        } else if (
            name === 'tel' ||
            name === 'tel-1' ||
            name === 'tel-2' ||
            name === 'tel-3'
        ) {
            $(elem)
                .parents('.c-table__item')
                .find('.c-table__lower .c-table__error')
                .text('')
        } else if (name === 'message') {
            $(elem)
                .parents('.c-table__item')
                .find('.c-table__lower .c-table__error')
                .text('')
        } else {
            $(elem)
                .parents('.c-table__item')
                .find('.c-table__lower .c-table__error')
                .text('')
            $(elem)
                .parents('.c-table__item')
                .find('.c-table__lower .c-table__error')
                .text('')
        }

        //required
        if ($(elem).attr('aria-required') === 'true') {
            if (name === 'privacy') {
                if (!$(elem).prop('checked')) {
                    $(elem)
                        .parents('.c-table__item')
                        .find('.c-table__lower .c-table__error')
                    return false
                }
            }

            if (!$(elem).val()) {
                $(elem).addClass('is-error')
                if (name === 'privacy' || name === 'contact-type') {
                    $(elem)
                        .parents('.c-table__item')
                        .find('.c-table__lower .c-table__error')
                } else if (name === 'email') {
                    $(elem)
                        .parents('.c-table__item')
                        .find('.c-table__lower .c-table__error')
                } else if (
                    name === 'tel' ||
                    name === 'tel-1' ||
                    name === 'tel-2' ||
                    name === 'tel-3'
                ) {
                    $(elem)
                        .parents('.c-table__item')
                        .find('.c-table__lower .c-table__error')
                } else if (name === 'message') {
                    $(elem)
                        .parents('.c-table__item')
                        .find('.c-table__lower .c-table__error')
                } else {
                    $(elem)
                        .parents('.c-table__item')
                        .find('.c-table__lower .c-table__error')
                }
                return false
            }
        }

        //カナ
        if (name === 'family-kana' || name === 'first-kana') {
            if (!this.isKana(elem.value)) {
                $(elem).addClass('is-error')
                return false
            }
        }

        //メール
        if (name === 'email') {
            if (!this.isEmail(elem.value)) {
                $(elem).addClass('is-error')
                return false
            }
        }

        if (name === 'zip01') {
            if (elem.value.length !== 0) {
                if (!this.isTel(elem.value)) {
                    $(elem).addClass('is-error')
                    return false
                }
            }
        }

        if (name === 'recruit-select' || name === 'type-select') {
            if ($('[name="' + name + '"] option:selected').val() === '選択してください') {
              $(elem).addClass('is-error')
              $(elem).parents('.c-input__select').addClass('is-error');
              return false
            }
        }

        //電話番号
        if (name === 'tel-1' || name === 'tel-2' || name === 'tel-3') {
            if (!this.isTel(elem.value)) {
                $(elem).addClass('is-error')
                return false
            }

            // if (!this.isHarf(elem.value)) {
            //     $(elem).addClass('is-error')
            //     return false
            // }
        }

        $(elem).removeClass('is-error')
        $(elem).parents('.c-input__select').removeClass('is-error');
        return true
    }
    isKana(value) {
        return value.match(/^[\u30A0-\u30FF]+$/)
    }
    isTel(val) {
        // let val1 = val.match(/^0\d{1,4}-\d{1,4}-\d{3,4}$/)
        // let val2 = val.match(/^\d{7,13}$/)
        let val3 = val.match(/^[0-9\-]+$/)
        if (!val3) return false
        return true
    }
    isEmail(val) {
        return val.match(
            /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
        )
    }
    isMatch(val1, val2) {
        if (val1 === val2) return true
        return false
    }
    isHarf(value) {
        return value.match(/^[\x20-\x7e]*$/)
    }
}

export default ContactManager
