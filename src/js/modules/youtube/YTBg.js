import $ from 'jquery'
import YTBase from './YTBase';

class YTBg extends YTBase {
  constructor (option) {
    super(option);
  }
  init () {
    this.onResize = () => this._onResize();
    super.init();
    this._onResize();
    window.addEventListener('resize', this.onResize);
  }
  _onReady (e) {
    e.target.mute();
    // e.target.playVideo();
    // this.player.setLoop(true);
    this.resizeVideo();
  }
  _onResize() {
    this.resizeVideo();
  }
  resizeVideo() {
    let bw = 1200; //基準にする横幅
    let bh = (bw/16) * 9; //基準にする高さ(16:9)
    let	w = window.innerWidth;//表示サイズ(幅)
    let h = window.innerHeight; //表示サイズ(高さ)
    let mw = w; //動画サイズ(幅)
    let mh =  Math.round(bh * (mw/bw)); //動画サイズ(高さ)

    if ( mh < h ) { //動画の高さが表示サイズの高さより小さかったら
      mh = h; //表示サイズの高さに変更
      mw = Math.round(bw * (mh/bh)); //高さに合わせて横幅変更
    }

    $('#' + this.option.target).css({
      width: mw,
      height: mh,
      marginTop: (h - mh)/2,
      marginLeft: (w - mw)/2
    });
  }
}

export default YTBg;
