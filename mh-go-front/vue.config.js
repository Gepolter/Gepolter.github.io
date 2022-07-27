const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap(options => ({
        ...options,
        compilerOptions: {
          // treat any tag that starts with ion- as custom elements
          //isCustomElement: tag => tag.startsWith('Selection')
        }
      }))
      
  },
  /*
  publicPath: process.env.NODE_ENV === 'production'
    ?'mhBuildPawcessor'
    : ''*/
})