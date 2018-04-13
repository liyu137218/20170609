

//当我们需要和后台分离部署的时候，必须配置config/index.js:
//必须是本地文件系统上的绝对路径。
// see http://vuejs-templates.github.io/webpack for documentation.
//webpack中引入的path[require('path')]是node.js内置的package，用来处理路径的。
var path = require('path')

module.exports = {
  build: {   //production 环境
    // 引入prod.env     NODE_ENV: '"production"'
    //path.resolve（）方法将一系列路径或路径段解析为绝对路径。
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../partner/home/index.html'),
    //应该指向包含应用程序的所有静态资产的根目录。
    assetsRoot: path.resolve(__dirname, '../partner'),
    assetsSubDirectory: 'home',
    //被webpack编译处理过的资源文件都会在这个build.assetsRoot目录下，所以它不可以混有其它可能在build.assetsRoot里面有的文件  每次编译前，这个目录会被清空，所以这个只能放编译出来的资源文件。
    assetsPublicPath: '/partner/',
    //【资源的根目录】
    productionSourceMap: true,
    //在构建生产环境版本时是否开启source map。
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpak-plugin
    productionGzip: false,
    //gzip是GNUzip的缩写，它是一个GNU自由软件的文件压缩程序
    productionGzipExtensions: ['js', 'css'],
    //需要使用 gzip 压缩的文件扩展名
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: { // dev 环境
    env: require('./dev.env'),// 使用 config/dev.env.js 中定义的编译环境
    port: 9999,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: true
  }
}
