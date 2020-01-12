import $ from 'jquery'
import GMap from './GMap/index'

const OPTION = {
    fullscreenControl: false,
    center: {
        lat: 35.675722,
        lng: 139.76954,
    },
    zoom: 16,
}

const STYLE = [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "lightness": -100
            },
            {
                "saturation": "-77"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#848ea4"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#0060ff"
            },
            {
                "saturation": "-70"
            },
            {
                "lightness": "0"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "hue": "#0050ff"
            },
            {
                "saturation": "0"
            },
            {
                "lightness": "0"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#0060ff"
            },
            {
                "saturation": "-100"
            },
            {
                "lightness": "0"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-80"
            },
            {
                "lightness": "0"
            },
            {
                "gamma": "1"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#1d6091"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#0060ff"
            },
            {
                "saturation": "-85"
            },
            {
                "lightness": "60"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#0060ff"
            },
            {
                "saturation": "-70"
            },
            {
                "lightness": "50"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#0060ff"
            },
            {
                "saturation": "0"
            },
            {
                "lightness": "-11"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#00b2ff"
            },
            {
                "weight": "1.00"
            },
            {
                "saturation": "-80"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "saturation": "1"
            },
            {
                "lightness": "0"
            },
            {
                "gamma": "1.00"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels",
        "stylers": [
            {
                "saturation": "18"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#888888"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "weight": "4.00"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels.icon",
        "stylers": [
            {
                "hue": "#0071ff"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#0066ff"
            },
            {
                "saturation": "0"
            },
            {
                "lightness": 100
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#000000"
            },
            {
                "saturation": -100
            },
            {
                "lightness": -100
            },
            {
                "visibility": "off"
            }
        ]
    }
];

class Map {
    constructor(target, option) {
        this.$target = $(target)
        this.option = Object.assign({}, OPTION, option)
    }
    init() {
        if (this.$target.length <= 0) return
        if (typeof google === 'undefined') {
            this.fetchMapAPI().then(() => {
                this.renderMap()
            })
        } else {
            this.renderMap()
        }
    }
    fetchMapAPI() {
        let promise = new Promise((resolve, reject) => {
            let script = document.createElement('script')
            script.type = 'text/javascript'
            script.src =
                'https://maps.google.com/maps/api/js?key=AIzaSyDuhlZ5lUcVxGidUaDU3FUrhGi6fJCH5wo'
            document.getElementsByTagName('head')[0].appendChild(script)
            script.onload = () => {
                resolve()
            }
        })
        return promise
    }
    renderMap() {
        this.gmap = new GMap('js-map', this.option)
        this.gmap.setStyle('icom', STYLE)
        this.gmap.changeStyle('icom')
        this.gmap.setStyle('icom', STYLE)
        this.gmap.addMarker('a')
        this.gmap.renderMarker()
    }
}

export default Map
