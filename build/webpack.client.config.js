const webpack = require('webpack')
const base = require('./webpack.base.conf.js')
const vueConfig = require('./vue-loader.config.js')

const config = Object.assign({}, base, {
    plugins: base.plugins.concat([
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'client-vendor-bundle.js'
        })
    ])
})

if(process.env.NODE_ENV === 'production'){
    const ExtractTextPlugin = require('extract-text-webpack-plugin')

    vueConfig.loaders = {
        less: ExtractTextPlugin.extract({
          loader: "css-loader!less-loader",
          fallbackLoader: "vue-style-loader"
        }),
        css: ExtractTextPlugin.extract({
            loader: "css-loader",
            fallbackLoader: "vue-style-loader"
        })
    }

    config.plugins.push(
        new ExtractTextPlugin('styles.css'),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    )
}

module.exports = config
