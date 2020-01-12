import $ from 'jquery'
import { TweenMax, Power1 } from 'gsap'

class MouseMoveObject{
  constructor(){
    this.$target = $('.js-move-bg');
    this.targetArray = [];

    this.init();
  }
  init(){
    this.setArray();
  }
  onEventHandler(){

  }
  setArray(){
    this.targetArray = [];
    for(let i = 0; i < this.$target.length; i++){
      let $target = this.$target.eq(i);
      this.targetArray.push({
        target: $target,
        rate: Number($target.attr('data-move')),
        dir: $target.attr('data-direction'),
        x: 0,
        y: 0,
        nx: 0,
        ny: 0
      })
    }
  }
  update(){
    for(let i = 0; i < this.targetArray.length; i++){
      this.targetArray[i].nx += ((window.__GLOBAL.mouse.cx * 20 * this.targetArray[i].rate) - this.targetArray[i].nx) * 0.1
      this.targetArray[i].ny += ((window.__GLOBAL.mouse.cy * 10 * this.targetArray[i].rate) - this.targetArray[i].ny) * 0.1
      TweenMax.set(this.targetArray[i].target,{
        x: this.targetArray[i].nx * this.targetArray[i].dir,
        y: this.targetArray[i].ny,
      })
    }
  }
}

export default MouseMoveObject
