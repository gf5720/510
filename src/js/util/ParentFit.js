class ParentFit {
    constructor() {
        this.element = document.getElementsByClassName('js-parent-fit')
        this.fit()
    }

    fit() {
        if (this.element.length <= 0) return
        let l = this.element.length
        for (let i = 0; i < l; i++) {
            let target = this.element[i]
            let parent = target.parentNode
            let w = target.clientWidth
            let h = target.clientHeight
            let pw = parent.clientWidth
            let ph = parent.clientHeight
            if (w < pw) {
                target.style.width = '100%'
                target.style.height = 'auto'
            } else if (h < ph) {
                target.style.width = 'auto'
                target.style.height = '100%'
            }
        }
    }
}

export default ParentFit
