import { TweenMax,Back } from 'gsap'

//各頂点クラス
class Point {
    constructor(ctx, point, start, center, options, resizeFlg) {
        this.ctx = ctx
        this.start = start

        // this.sx = 0
        // this.sy = 0
        this.sx = window.__GLOBAL.win.cw
        this.sy = window.__GLOBAL.win.ch

        //初期値
        this.bx = point.bx
        this.by = point.by

        //初期値
        this.x = point.x
        this.y = point.y
        //現在位置
        this.nx = point.x
        this.ny = point.y
        //到達位置
        this.tx = point.x
        this.ty = point.y
        //ease
        this.easeX = point.easeX
        this.easeY = point.easeY

        this.delay = point.delay

        this.kyori = 0;

        this.loadFlg = options.autoplay ? true : resizeFlg

        this.threshold = options.threshold
        this.autoplay = options.autoplay
    }
    update(x, y) {
        this._update(x, y)
    }
    onStart(){
      return new Promise(resolve => {
        let self = this;
        TweenMax.to({prop:0}, 0.75, {
          prop: 1,
          onUpdate:function(tween) {
            self.sx = (window.__GLOBAL.win.cw - (683- self.bx) * window.__GLOBAL.mvW * tween.target.prop)
            self.sy = (window.__GLOBAL.win.ch - (385 - self.by) * window.__GLOBAL.mvH * tween.target.prop)
      		},
          ease: Back.easeOut.config(2),
          delay: self.delay * 0.1,
      		onUpdateParams: [ "{self}" ],
          onComplete: function(){
            resolve();
          }
      	});
      })
    }
    onStartEnd(){
      this.nx = this.sx;
      this.ny = this.sy;
      this.loadFlg = true;
    }
    _update(x, y) {
// console.log(x,y);
        //マウスとパスの位置から計算
        this.kyori = Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
        if ( this.kyori < this.threshold) {
          this.angle = Math.atan2(this.x - x, this.y - y) - Math.PI / 2
          if(this.kyori < this.threshold / 2){
            this.tX = this.x + Math.cos(this.angle) * this.easeX * window.__GLOBAL.mvW * window.__GLOBAL.num;
            this.tY = this.y + Math.sin(-this.angle) * this.easeY * window.__GLOBAL.mvH * window.__GLOBAL.num;
          } else {
            this.tX = this.x + Math.cos(this.angle) * this.easeX * (100 / (this.kyori + 1))
            this.tY = this.y + Math.sin(-this.angle) * this.easeY * (100 / (this.kyori + 1))
          }
          this.nx += (this.tX - this.nx) * this.inCubic(0.3)
          this.ny += (this.tY - this.ny) * this.inCubic(0.3)
        } else {
            this.tX = this.x
            this.tY = this.y
            this.nx += (this.tX - this.nx) * 0.05
            this.ny += (this.tY - this.ny) * 0.05
        }
    }
    inCubic(t) {
        return t * t * t
    }
    canvasDraw() {
      if(this.loadFlg){
        if (this.start) {
            this.ctx.moveTo(this.nx, this.ny)
        } else {
            this.ctx.lineTo(this.nx, this.ny)
        }
      } else {
        if (this.start) {
            this.ctx.moveTo(this.sx, this.sy)
        } else {
            this.ctx.lineTo(this.sx, this.sy)
        }
      }
    }
}

export default Point
