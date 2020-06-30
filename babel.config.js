// 这是项目发布阶段需要用到的 babel 插件
const prodPlugins = []
// 判断是开发还是发布阶段
if (process.env.NODE_ENV === 'production') {
  prodPlugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: 'theme-chalk'
      }
    ],
    // 发布产品时的插件数组
    ...prodPlugins,
    // 'transform-remove-console',
    // 路由懒加载插件
    '@babel/plugin-syntax-dynamic-import'
  ]
}
