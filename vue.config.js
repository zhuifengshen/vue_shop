// 默认情况下，vue-cli 3.0生成的项目，隐藏了webpack配置项，如果我们需要配置webpack需要通过vue.config.js来配置
// chainWebpack可以通过链式编程的形式，修改webpack配置
// configureWebpack可以通过操作对象的形式，修改webpack配置
module.exports = {
  // 设置开发模式和发布模式的打包入口js文件
  chainWebpack: config => {
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      // entry找到默认的打包入口，调用clear则是删除默认的打包入口，add添加新的打包入口
      config
        .entry('app')
        .clear()
        .add('./src/main-prod.js')
      // 默认依赖项的所有第三方包都会被打包到js/chunk-vendors.******.js文件中，导致该js文件过大，可以通过externals排除这些包
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        lodash: '_',
        echarts: 'echarts',
        nprogress: 'NProgress',
        'vue-quill-editor': 'VueQuillEditor',
      })
      // 使用插件定制首页内容
      config.plugin('html').tap(args => {
        // 添加参数来判断是否为线上环境 isProd
        args[0].isProd = true
        args[0].title = '有米自动化系统'
        return args
      })
    })

    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config
        .entry('app')
        .clear()
        .add('./src/main-dev.js')
      // 使用插件定制首页内容
      config.plugin('html').tap(args => {
        // 添加参数 isProd
        args[0].isProd = false
        args[0].title = '有米自动化系统'
        return args
      })
    })
  },
}
