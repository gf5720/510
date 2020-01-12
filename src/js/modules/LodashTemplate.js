import $ from 'jquery'
import _ from 'lodash'
window._ = _
_.templateSettings.escape = /\{\{-([\s\S]+?)\}\}/g
_.templateSettings.evaluate = /\{\{([\s\S]+?)\}\}/g
_.templateSettings.interpolate = /\{\{=([\s\S]+?)\}\}/g

class LodashTemplate {
    constructor() {
        this.init()
    }
    init() {
        this.template = _.template
        const templateSettings = _.templateSettings
        templateSettings.interpolate = /\{\{=([\s\S]+?)\}\}/g
    }
    add(target, templateName, obj, type) {
        const $target = document.getElementById(target)
        const $template = document.getElementById(templateName)
        const compile = this.template($template.innerHTML)
        let html = compile({ data: obj })
        $('#' + target).append(html)
    }
}

export default LodashTemplate
