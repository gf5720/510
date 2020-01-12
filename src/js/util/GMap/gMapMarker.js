import $ from 'jquery'

/**
 * スタイルの変更のためのクラス
 * @param base
 * @returns {GMapMarker}
 */
function gMapMarker(base = null) {
    class GMapMarker extends base {
        constructor(map) {
            super(map)
            this.markersData = {}
            this.marker = {}
        }

        /**
         * スタイルにさらに、設定を追加する
         * @param key : スタイル名
         * @param styleArray　: 設定内容
         */
        addMarker(key, value = {}) {
            const MARKER = {
                position: {
                    lat: 35.675722,
                    lng: 139.76954,
                },
                title: '',
                label: '',
                draggable: false,
                animation: '',
                icon: {
                    url:
                        '/wp/wp-content/themes/i-com/assets/images/common/pin.png',
                    scaledSize: new google.maps.Size(97.5, 50),
                },
            }

            this.markersData[key] = $.extend({}, MARKER, value)
            this.markersData[key].map = this.map
        }

        /**
         *
         */
        renderMarker() {
            for (let key in this.markersData) {
                this.marker[key] = new google.maps.Marker(this.markersData[key])
            }
        }

        /**
         * スタイルを変更する
         * @param key : スタイル名
         */
        deleteMarker(key) {
            this.marker[key].setMap(null)
        }
    }
    return GMapMarker
}

export default gMapMarker
