import $ from 'jquery'

const MARKER = {
  position: {
    lat: 35.663385,
    lng: 139.668572
  },
  title: 'INFLANDING',
  label: '',
  draggable: false,
  animation: '',
  icon: ''
};

/**
 * スタイルの変更のためのクラス
 * @param base
 * @returns {GMapMarker}
 */
function gMapMarker(base = null) {
  class GMapMarker extends base {
    constructor(map) {
      super(map);
      this.markersData = {};
      this.marker = {};
      MARKER.icon = '/inflanding/images/common/map-pin.png';
    }

    /**
     * スタイルにさらに、設定を追加する
     * @param key : スタイル名
     * @param styleArray　: 設定内容
     */
    addMarker(key, value = {}) {
      this.markersData[key] = $.extend({}, MARKER, value);
      this.markersData[key].map = this.map;
    }

    /**
     *
     */
    renderMarker() {
      for (let key in this.markersData) {
        this.marker[key] = new google.maps.Marker(this.markersData[key]);
      }
    }

    /**
     * スタイルを変更する
     * @param key : スタイル名
     */
    deleteMarker(key) {
      this.marker[key].setMap(null);
    }
  }
  return GMapMarker;
}

export default gMapMarker;
