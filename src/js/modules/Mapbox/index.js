let mapboxgl = require('mapbox-gl/dist/mapbox-gl.js')
// import { map } from 'mapbox-gl'
// const mapboxgl = map

const OPTION = {
    target: 'js-map',
    center: [106.991306, -6.23829],
    zoom: 16,
    pitch: 45,
    bearing: -17.6,
    style: 'mapbox://styles/mapbox/light-v9',
}

class MapboxManager {
    constructor(token, option) {
        this.opt = Object.assign({}, OPTION, option)
        this.onLoad = e => this._onLoad(e)
        this.token = token
        this.geolocation = false
        console.log(option)
        this.markerArray = [
            {
                title: 'Parempatan MM',
                lat: '106.992444',
                lng: '-6.247194',
                w: 180,
            },
            {
                title: 'Depan Stasium Railink',
                lat: '106.998917',
                lng: '-6.236639',
                w: 245,
            },
            {
                title: 'Jl KH. Noer Ali - Kalimalang Bekasi',
                lat: '106.955938',
                lng: '-6.250167',
                w: 370,
            },
            {
                title: 'SDN Bekasi Jaya V & SMP Negeri 3 Bekasi',
                lat: '107.007881',
                lng: '-6.234788',
                w: 425,
            },
            {
                title: 'Simpang Pasar Rebo-Jatiasih',
                lat: '106.965417',
                lng: '-6.294750',
                w: 310,
            },
            {
                title: 'Pasar Baru Jl Prof Moh Yamin',
                lat: '107.013556',
                lng: '-6.249056',
                w: 305,
            },
            {
                title: 'インドネシア　ブカシ市',
                lat: '106.991306',
                lng: '-6.23829',
                w: 212,
            },
            {
                title: 'あなたの住む街',
                lat: this.opt.center[0],
                lng: this.opt.center[1],
                w: 155,
            },
        ]
    }
    init() {
        let promise = new Promise(resolve => {
            mapboxgl.accessToken = this.token
            this.map = new mapboxgl.Map({
                container: this.opt.target,
                center: this.opt.center,
                zoom: this.opt.zoom,
                pitch: this.opt.pitch,
                bearing: this.opt.bearing,
                style: this.opt.style,
                localIdeographFontFamily: "'Noto Sans', sans-serif",
            })
            for (let i = 0; i < this.markerArray.length; i++) {
                let el = document.createElement('div')
                let line = document.createElement('div')
                let circle = document.createElement('div')

                el.className = 'marker'
                line.className = 'line'
                circle.className = 'circle'

                if (i === 6) {
                    let flag = document.createElement('div')
                    el.className = 'marker marker-bukashi'
                    flag.className = 'flag'
                    flag.style.width = this.markerArray[i].w + 'px'
                    flag.insertAdjacentHTML(
                        'afterbegin',
                        this.markerArray[i].title
                    )
                    el.appendChild(line)
                        .appendChild(circle)
                        .appendChild(flag)
                } else {
                    el.className = 'marker'
                    el.appendChild(line).appendChild(circle)
                }
                this.addMarker(
                    el,
                    this.markerArray[i].lat,
                    this.markerArray[i].lng
                )
            }
            this.eventHandler().then(() => {
                resolve()
            })
        })
        return promise
    }
    eventHandler() {
        let promise = new Promise(resolve => {
            this.map.on('load', () => {
                this._onLoad().then(() => {
                    resolve()
                })
            })
        })
        return promise
    }
    addMarker(el, lat, lng) {
        new mapboxgl.Marker(el).setLngLat([lat, lng]).addTo(this.map)
    }
    _onLoad(e) {
        let promise = new Promise(resolve => {
            let labelLayerId
            let layers = this.map.getStyle().layers
            for (let i = 0; i < layers.length; i++) {
                if (
                    layers[i].type === 'symbol' &&
                    layers[i].layout['text-field']
                ) {
                    labelLayerId = layers[i].id
                    break
                }
            }
            this.map.addLayer(
                {
                    id: '3d-buildings',
                    source: 'composite',
                    'source-layer': 'building',
                    filter: ['==', 'extrude', 'true'],
                    type: 'fill-extrusion',
                    minzoom: 15,
                    paint: {
                        'fill-extrusion-color': '#aaa',
                        'fill-extrusion-height': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'height'],
                        ],
                        'fill-extrusion-base': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'min_height'],
                        ],
                        'fill-extrusion-opacity': 0.6,
                    },
                },
                labelLayerId
            )
            resolve()
        })
        return promise
    }
    toMoviePoint(point) {
        point[1] = Number(point[1]) - 0.002
        this.animationFly(point)
    }
    toMyPoint() {
        this.animationFly(this.opt.center)
    }
    toTargetPoint() {
        const targetPoint = [106.991306, -6.23829]
        this.animationFly(targetPoint)
    }
    animationFly(latlng) {
        this.map.flyTo({
            center: latlng,
            zoom: 16.5,
            pitch: 45,
            bearing: -17.6,
            duration: 2000,
            speed: 1.2,
        })
    }
    render() {}
}

export default MapboxManager
