var debug = require('debug')('server.js')

process.env.VUE_ENV = 'server'
const isProd = process.env.NODE_ENV === 'production'

var path = require('path')
var fs = require('fs')
var express = require('express')
const serialize = require('serialize-javascript')

const createBundleRenderer = require('vue-server-renderer').createBundleRenderer

const app = express()

const html = (() => {
    const template = fs.readFileSync(path.resolve('./index.html'), 'utf8')
    const i = template.indexOf('{{ APP }}')
    const style = isProd ? '<link rel="stylesheet" href="/dist/styles.css">' : ''
    return {
        head: template.slice(0, i).replace('{{ STYLE }}', style),
        tail: template.slice(i + '{{ APP }}'.length)
    }
})()

let renderer

if(isProd){
    const bundlePath = path.resolve('./dist/server-bundle.js')
    renderer = createRenderer(fs.readFileSync(bundlePath, 'utf8'))
}else {
    //bundle为webpack生成的server-bundle
    require('./build/setup-dev-server.js')(app, bundle => {
        //生成bundle-renderer实例
        renderer = createRenderer(bundle)
    })
}

function createRenderer(bundle){
    return createBundleRenderer(bundle, {})
}

app.use('/dist', express.static(path.resolve('./dist')))

app.get('*', (req, res) => {
    if(!renderer){
        return res.end('waiting form compilation... refresh in a mount.')
    }
    var s = Date.now()
    debug(req.url)

    const context = { url: req.url }
    const renderStream = renderer.renderToStream(context)
    let firstChunk = true

    debug('write begin', html.head)

    res.write(html.head)

    debug('write end')
    
    renderStream.on('data', chunk => {
        debug('chunk: ', chunk)
        if(firstChunk){
            firstChunk = false
        }
        res.write(chunk)
    })

    renderStream.on('end', () => {
        res.end(html.tail)
        console.log(`whole request: ${Date.now - s}ms`)
    })

    renderStream.on('err', err => {
        console.log('debug renderStreamError', err)
        throw err
    })

})

const port = process.env.PORT || 8888
app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})

