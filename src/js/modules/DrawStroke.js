import $ from 'jquery'

class DrawStroke{
  constructor(target){
    this.$target = $(target);
    this.array = [];

    this.init();
  }
  init(){
    for(let i = 0; i < this.$target.length; i++){
      let $target = this.$target.eq(i);
      this.setPaths($target.find('path,circle'))
    }
  }
  setPaths(paths){
    let pathsArray = [];
    for(let i = 0; i < paths.length; i++){
      let path = paths[i];
      let fill = path.getAttribute('data-fill');
      let stroke = path.getAttribute('data-stroke');
      let len = path.getTotalLength();
      $(path).css({
        'fill': fill,
        'stroke': stroke,
        'fill-opacity': 0,
  			'stroke-dashoffset': len,
  			'stroke-dasharray': len
  		});
    }
  }
}

export default DrawStroke
