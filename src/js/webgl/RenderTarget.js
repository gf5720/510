import { THREE } from 'three'

/**
 * RenderTarget
 */
class RenderTarget extends THREE.Scene {
    constructor() {
        super()
        this.renderTarget
        this.init()
    }
    init() {
        this.renderTarget = new THREE.WebGLRenderTarget(16, 16)
    }
    getTexture() {
        return this.renderTarget.texture
    }
    resize(width, height) {
        const ratio = window.devicePixelRatio || 1
        this.renderTarget.setSize(width * ratio, height * ratio)
    }
    render(renderer, camera) {
        renderer.render(this, camera, this.renderTarget)
    }
}

export default RenderTarget
