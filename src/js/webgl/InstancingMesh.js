import { THREE } from 'three'

import instancingVert from '../../glsl/instancing.vert'
import instancingFrag from '../../glsl/instancing.frag'

/**
 * Instancing
 */

const OPTION = {
    instances: 10000,
    fragShader: instancingFrag,
    vertShader: instancingVert,
    bufferGeometry: new THREE.BoxBufferGeometry(20, 1, 1),
}

class InstancingMesh extends THREE.Mesh {
    constructor(option) {
        super(
            new THREE.InstancedBufferGeometry(),
            new THREE.RawShaderMaterial()
        )
        this.opt = Object.assign({}, OPTION, option)
        this.instances = this.opt.instances
        this.bufferGeometry
        this.attribute = {}
        this.init()
    }
    init() {
        this._createBufferGeometry()
        this._setGeometry()
        this._setMaterial()
    }
    _createBufferGeometry() {
        this.bufferGeometry = this.opt.bufferGeometry
    }
    _setGeometry() {
        this.geometry.index = this.bufferGeometry.index
        this.geometry.attributes.position = this.bufferGeometry.attributes.position
        this.geometry.attributes.uv = this.bufferGeometry.attributes.uv
        let vector = new THREE.Vector4()
        let x, y, z, w
        let offsets = []
        let orientations = []
        for (let i = 0; i < this.instances; i++) {
            x = Math.random() * 50 - 25
            y = Math.random() * 50 - 25
            z = Math.random() * 50 - 25
            vector.set(x, y, z, 0).normalize()
            vector.multiplyScalar(280) // move out at least 5 units from center in current direction
            offsets.push(x + vector.x, y + vector.y, z + vector.z)

            // orientations
            x = Math.random() * 2 - 1
            y = Math.random() * 2 - 1
            z = Math.random() * 2 - 1
            w = Math.random() * 2 - 1
            vector.set(x, y, z, w).normalize()
            orientations.push(vector.x, vector.y, vector.z, vector.w)
        }

        let offsetAttribute = new THREE.InstancedBufferAttribute(
            new Float32Array(offsets),
            3
        )
        let orientationAttribute = new THREE.InstancedBufferAttribute(
            new Float32Array(orientations),
            4
        ).setDynamic(true)

        this.geometry.addAttribute('offset', offsetAttribute)
        this.geometry.addAttribute('orientation', orientationAttribute)
    }
    _setMaterial() {
        this.material.uniforms = {}
        this.material.vertexShader = this.opt.vertShader
        this.material.fragmentShader = this.opt.fragShader
        this.material.side = THREE.DoubleSide
        this.material.transparent = true
    }
    reset() {
        this.geometry.dispose()
        this.material.dispose()
    }
}
export default InstancingMesh
