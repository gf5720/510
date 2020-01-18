window.history.scrollRestoration = "manual";
import $ from 'jquery'
import DisableScroll from './util/disableScroll'
DisableScroll.on()

import BaseController from './controller/BaseController'

const path = '/'
const ua = navigator.userAgent

const $body = $('body')
const pageId = $body.attr('id')
let pageController = null

if (pageId === 'index') {
    const baseController = new BaseController(pageController)
    baseController.init().then(() => {
        setTimeout(() => {
            $('body').addClass('is-load-end');
            setTimeout(() => {
                $('body').addClass('is-load-scroll');
            },5400);
        },300);
    })
}