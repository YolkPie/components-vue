'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'
process.env.npm_config_report = false

const semver = require('semver')
const commander = require('commander')
const { Select } = require('enquirer')
const shell = require('shelljs')
const fs = require('fs')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
const initPackage = require('./init-package')

commander.version('0.0.1', '-v, --version').parse(process.argv)
  ; (async () => {
    const env = await new Select({
      name: 'env',
      message: '发布环境？',
      choices: ['预发', '线上']
    }).run()
    await shell.rm('-rf', 'dist') //删除dist

    console.log(chalk.cyan('开始编译' + env + '环境\n'))

    rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
      if (err) throw err
      webpack(webpackConfig, async (err, stats) => {
        if (err) throw err
        process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
          chunks: false,
          chunkModules: false
        }) + '\n\n')
    
        if (stats.hasErrors()) {
          console.log(chalk.red('编译失败\n'))
          process.exit(1)
        }
    
        console.log(chalk.cyan(' 编译完成\n'))
        const pkg = await initPackage(env)
        const versionType = await new Select({
          name: 'env',
          message: '版本号增加类型？',
          choices: ['patch', 'minor', 'major']
        }).run()
        pkg.version =
          versionType === 'major'
            ? semver.inc(pkg.version, 'major')
            : versionType === 'minor'
              ? semver.inc(pkg.version, 'minor')
              : semver.inc(pkg.version, 'patch')
        fs.writeFileSync('dist/package.json', JSON.stringify(pkg, null, 4))
        console.log(chalk.green(pkg.name), chalk.green(pkg.version))
        shell.exec('cd dist && jnpm publish')
      })
    })
  })()