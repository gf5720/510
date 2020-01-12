class Timer {
    constructor() {
        this.startTime = performance.now() * 0.001
        this.oldTime = this.startTime
        this.time = 0
    }
    start() {
        this.startTime = performance.now() * 0.001
        this.oldTime = this.startTime
    }
    getElapsedTime() {
        let time = performance.now() * 0.001
        let t = time - this.oldTime
        this.oldTime = time
        return t
    }
    getDelta() {
        let time = performance.now() * 0.001
        this.time = time - this.startTime
        return time - this.startTime
    }
}

export default Timer
