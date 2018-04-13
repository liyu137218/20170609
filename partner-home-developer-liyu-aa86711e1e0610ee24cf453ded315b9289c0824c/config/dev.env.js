//webpack-merge提供了一个merge连接数组并合并创建新对象的对象的函数。如果遇到函数，它将执行它们，通过算法运行结果，然后将返回的值再次包含在函数
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
