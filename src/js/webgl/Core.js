/**
 * Core
 * renderer / mainScene / cameraの管理
 */
import { THREE, WebGLRenderer } from 'three'

const OPTION = {
    clearColor: 0xdeeeee,
    isOrthographic: false,
}

class Core {
    constructor(option) {
        this.opt = Object.assign({}, OPTION, option)
        this.renderer
        this.mainScene
        this.camera
    }
    /**
     * 初期化
     */
    init() {
        this._createRenderer()
        this._createMainScene()
    }
    /**
     * PerspectiveCameraの更新
     * @param {*} camera
     * @param {*} width
     * @param {*} height
     */
    updatePerspectiveCamera(camera, width, height) {
        camera.aspect = width / height
        camera.updatemodulesionMatrix()
        camera.position.z = height / Math.tan((camera.fov * Math.PI) / 360) / 2
    }
    /**
     * OrthographicCameraの更新
     * @param {*} camera
     * @param {*} width
     * @param {*} height
     */
    updateOrthographicCamera(camera, width, height) {
        camera.aspect = width / height
        camera.updatemodulesionMatrix()
    }
    /**
     * リサイズ処理
     * @param {*} width
     * @param {*} height
     */
    resize(width, height) {
        this.camera.aspect = width / height
        this.camera.updatemodulesionMatrix()

        this.renderer.setPixelRatio(window.devicePixelRatio || 1)
        this.renderer.setSize(width, height)
        this.renderer.clear()
    }
    /**
     * 描画
     */
    update() {
        this.renderer.render(this.mainScene, this.camera)
    }
    /**
     * Rendererの作成
     */
    _createRenderer() {
        console.log(THREE)
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.querySelector('#canvas'),
            alpha: true,
            antialias: true,
            stencil: false,
            depth: true,
            premultipliedAlpha: false,
        })
        this.renderer.autoClear = true
        this.renderer.setClearColor(this.opt.clearColor, 1)
        this.renderer.setPixelRatio(window.devicePixelRatio || 1)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
    /**
     * Main Sceneの作成
     */
    _createMainScene() {
        this.mainScene = new THREE.Scene()
    }
    /**
     * カメラの作成
     * @param {boolean} isOrthographic
     */
    createCamera(isOrthographic) {
        if (this.opt.isOrthographic || isOrthographic) {
            return new THREE.OrthographicCamera()
        }
        return new THREE.PerspectiveCamera(45, 1, 0.1, 2000)
    }
    /**
     * オプションのアップデート
     */
    updateOptions(option) {
        this.opt = Object.assign({}, this.opt, option)
        this.renderer.setClearColor(this.opt.clearColor, 1)
    }
}

export default Core
