import Shape from './Shape.js'
import PART_JSON from './getParts.js'
import $ from 'jquery'

const OPTION = {
    target: 'canvas',
    type: 'top',
    threshold: 200,
    autoplay: false,
}

class MV {
    constructor(options) {
        this.options = $.extend({}, OPTION, options)
        this.canvas = document.getElementById(this.options.target)
        this.height = this.options.type === 'top' ? window.innerHeight : 770
        this.ctx = this.canvas.getContext('2d')

        this.timer = null
        this.state = false
        this.shapeArray = []
        this.pointLen = 0;
        this.count = 0;

        this.angle = 0;
        this.autoplay = this.options.autoplay
        this.autoX = 0
        this.autoY = 0
        this.time = 0
        this.mx = 0
        this.my = 0

        this.init()
    }
    init() {
        this._onResize()
        this.setArray(false)
        this.onEventHandler()
    }
    setArray(resizeFlg) {
        this.shapeArray = []
        for (let i = 0; i < PART_JSON.length; i++) {
            this.shapeArray.push(
                new Shape(this.ctx, PART_JSON[i], this.options,resizeFlg)
            )
        }
        this.pointLen = PART_JSON.length
    }
    _onResize(e) {
        this.canvas.width = window.innerWidth
        this.canvas.height = window.innerHeight + 100
        $(this.canvas).css({
            width: window.innerWidth,
            height: window.innerHeight + 100,
        })
        this.setArray(true);
    }
    onEventHandler() {
        $(this.canvas).on('mousemove', e => {
            this.mx = e.offsetX
            this.my = e.offsetY
        })
    }
    offEventHandler() {
        $(this.canvas).off('mousemove')
    }
    onLoop() {
        this.update()
        this.canvasDraw()
    }
    play() {
        this.state = true
    }
    pause() {
        this.state = false
    }
    start(){
      for (let i = 0; i < this.shapeArray.length; i++) {
          this.shapeArray[i].start().then(() => {
            this.count++;
            if(this.count === this.pointLen){
              this.startEnd();
            }
          })
      }
    }
    startEnd(){
      for (let h = 0; h < this.shapeArray.length; h++) {
        this.shapeArray[h].onStartEnd();
      }
    }
    update() {
        if (!this.state) return

        if(this.options.type === 'top'){
          if (window.__GLOBAL.isSP){
            this.autoPlay = true;
          } else {
            this.autoPlay = false;
          }
        }

        if (this.autoPlay) {
            if(this.options.type === 'top'){
              this.angle += 0.4 * Math.PI / 180;
              this.autoX = Math.abs(
                  Math.cos(this.angle) * 500
              )
              this.autoY = Math.abs(
                  Math.sin(this.angle) * 500
              )
              this.time += 0.04
            } else {
              this.autoX = 0
              this.autoY = 0
            }
        } else {
            this.autoX = this.mx
            this.autoY = this.my
        }

        for (let i = 0; i < this.shapeArray.length; i++) {
            this.shapeArray[i].update(this.autoX, this.autoY)
        }
    }
    canvasDraw() {
        this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight + 100)
        for (let i = 0; i < this.shapeArray.length; i++) {
            this.shapeArray[i].canvasDraw()
        }
    }
    draw() {}
}

export default MV
