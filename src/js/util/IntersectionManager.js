import "@babel/polyfill";
import $ from 'jquery';
import 'intersection-observer';
import { TweenLite } from 'gsap';

const OPTION = {
    target: '.js-intersect'
};

class IntersectionManager {
    constructor(option){
        this.option = $.extend({}, OPTION, option);
        this.init();
    }
    init(){
        this.handler = (e, o) => this._handler(e, o);
        this.target = document.querySelectorAll(this.option.target);
    }
    setup() {
        this.observer = new IntersectionObserver(this.handler, {
            rootMargin: '-100px'
        });
        this.listener = [];
        for(let i = 0; i < this.target.length; i++) {
            this.listener[i] = this.observer.observe(this.target[i]);
        }
    }
    _handler(entries, observer) {
        for (let entry of entries) {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target);
                entry.target.classList.add('is-enter');
            }
        }
    }
    destroy() {
        this.observer.disconnect();
    }
}

export default IntersectionManager;