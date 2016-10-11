import { app, router } from './app.js'

var debug = require('debug')('server-entry')

const isDev = process.env.NODE_ENV !== 'production'

export default context => {

    router.push(context.url)
    
    const s = isDev && Date.now()

    return Promise.all(router.getMatchedComponents().map(component => {
        debug('component:', component)
        if(component.preFetch){
            return component.preFetch('')
        }
    })).then(() => {
        isDev && console.log(`data pre-fetch: ${ Date.now() - s }ms`)

        return app
    })
}