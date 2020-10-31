## VUE组件库

> 打造一个内部的组件库，在我们进行代码的重构，以及开发新的功能的时候，抽离公共的组件，减少代码的复用，注重业务与组件的分离，简化耦合度，便于开发与维护。

##### 按需加载

```js
// 组件中内置了单个组件所需的样式  无需配置babel-plugin-import
 import { MiButton, Modal } from 'miVant'
 import Vue from 'vue'

 Vue.use(MiButton)
 Vue.use(Modal)
```



#### 引入Rollup打包

##### 介绍

> Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。采用 es6 原生的模块机制进行模块的打包构建, 编译之后包 体积会更小。


##### 引入之后的问题

- Cross-env报错的问题

```
sudo npm install --global cross-env
```

- Rollup 打包 ，如果使用babel.config.js+babel7的话，坑比较多…….有时候会出现一些不知名的错误

- rollup-plugin-vue在低版本0.68的时候,会报一个找不到input入口的错，目前项目中的rollup版本是V1.19.3



**附rollup.config.prod.js**

```js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import buble from 'rollup-plugin-buble'
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss';
const path = require('path');

const ENV = process.env.NODE_ENV;
const resolveFile = function (filePath) {
  return path.join(__dirname, './', filePath)
}


export default {
  input: resolveFile('src/components/index.js'),
  output: {
    dir: 'es',
    format: 'umd',
    name: 'miVant',
    exports: 'named',
  },
  plugins: [
    resolve({ extensions: ['.js', '.vue'] }),
    postcss({
      extensions: ['.less', '.css'],
      use: [
        ['less', {
          javascriptEnabled: true
        }]
      ],
      extract: true,
      minimize: true,
    }),
    vue({
      template: {
        isProduction: true
      },
      css: false
    }),
    commonjs(),
    buble({
      objectAssign: 'Object.assign'
    }),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV),
    }),
    (ENV === 'production' && uglify()),
  ],
};

```