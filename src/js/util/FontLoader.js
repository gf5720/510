class FontLoader {
    /**
     * constructor
     * @param {string} name
     * @param {string} url
     * @param {object} propaty
     */
    constructor(name, url, propaty) {
        this.font = new FontFace(name, `url(${url})`, propaty)
        const promise = new Promise(resolve => {
            this.font.load().then(loadedFont => {
                document.fonts.add(loadedFont)
                resolve()
            })
        })
        return promise
    }
}
