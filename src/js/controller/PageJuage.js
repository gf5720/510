import IndexController from './IndexController'

function PageJuage(page) {
    let pageController = null
    if (page === 'index') {
        pageController = IndexController
    }
    return pageController
}

export default PageJuage
