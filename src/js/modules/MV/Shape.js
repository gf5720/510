import Point from './Point.js'

class Shape {
    constructor(ctx, shape, options,resizeFlg) {
        this.ctx = ctx
        this.color = shape.color
        this.pointsArray = []
        this.pointLen = 0;
        this.count = 0;
        this.init(shape.points, shape.center, options, resizeFlg)
    }
    init(points, center, options, resizeFlg) {
        for (let i = 0; i < points.length; i++) {
            let start = i === 0 ? true : false
            points[i].x = window.__GLOBAL.win.cw - (683 - points[i].bx) * window.__GLOBAL.mvW
            points[i].y = window.__GLOBAL.win.ch - (385  - points[i].by) * window.__GLOBAL.mvH
            this.pointsArray.push(
                new Point(this.ctx, points[i], start, center, options, resizeFlg)
            )
        }
        this.pointLen = points.length
    }
    start(){
      return new Promise(resolve => {
        for (let h = 0; h < this.pointsArray.length; h++) {
          this.pointsArray[h].onStart().then(() => {
            this.count++;
            if(this.count === this.pointLen){
              resolve();
            }
          });
        }
      });
    }
    onStartEnd(){
      for (let h = 0; h < this.pointsArray.length; h++) {
        this.pointsArray[h].onStartEnd();
      }
    }
    update(x, y) {
        for (let h = 0; h < this.pointsArray.length; h++) {
            this.pointsArray[h].update(x, y)
        }
    }
    canvasDraw() {
        this.ctx.fillStyle = this.color
        this.ctx.beginPath()
        for (let h = 0; h < this.pointsArray.length; h++) {
            this.pointsArray[h].canvasDraw()
        }
        this.ctx.closePath()
        this.ctx.fill()
    }
}

export default Shape
