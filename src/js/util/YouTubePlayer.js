import $ from 'jquery'

class YouTubePlayer {
    constructor(target) {
        this.init()
        this.target = $(target)
        this.$youtube = this.target.find('.p-reel__video > span')
        if (this.$youtube.length <= 0) return
        this.videoID = this.$youtube.data('videoId')
        this.init()
    }
    init() {
        this._loadYoutubeAPI()
    }
    _loadYoutubeAPI() {
        let tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        let firstScriptTag = document.getElementsByTagName('script')[0]
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
        this.renderPlayer();
    }
    renderPlayer() {
        this.ytPlayer = new YT.Player(this.target[0], {
            width: 640,
            height: 390,
            videoId: this.videoID,
            playerVars: {
                rel: 0, // 再生終了後に関連動画を表示するかどうか設定
            },
        })
    }
    playVideo() {
        this.ytPlayer.playVideo()
    }
    pauseVideo() {
        this.ytPlayer.pauseVideo()
    }
}

export default YouTubePlayer
