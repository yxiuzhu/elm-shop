const webpack = require('webpack')

const appData = require('./data.json')
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings

module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: [
          './src/theme'
        ]
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  lintOnSave: false,
  devServer: {
    overlay: {
      warning: false,
      errors: false
    },
    before(app) {
      app.get('/api/seller', function (req, res) {
        const id = req.query.id
        res.json({
          // 返回0：默认返回的数据是成功的
          errno: 0,
          // 因为mock数据中没有id，这里给数据拼接上id
          data: Object.assign({}, seller, { id })
        })
      })

      app.get('/api/goods', function (req, res) {
        res.json({
          errno: 0,
          data: goods
        })
      })

      app.get('/api/ratings', function (req, res) {
        res.json({
          errno: 0,
          data: ratings
        })
      })
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'api': '@/api',
        'components': '@/components',
        'common': '@/common'
      }
    }
  },
  chainWebpack: config => {
    // 查看打包文件体积大小
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)

    config
      .plugin('context')
      .use(webpack.ContextReplacementPlugin,
        [/moment[/\\]locale$/, /zh-cn/])
  }
}
