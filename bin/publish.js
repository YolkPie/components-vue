const semver = require('semver')
const commander = require('commander')
const { Select } = require('enquirer')
const shell = require('shelljs')
const fs = require('fs')
const chalk = require('chalk')
const initPackage = require('./init-package')
const bundle = require('../build/bundle')

commander.version('0.0.1', '-v, --version').parse(process.argv)
  ; (async () => {
    const env = await new Select({
      name: 'env',
      message: '发布环境？',
      choices: ['预发', '线上']
    }).run()
    await shell.rm('-rf', 'dist') //删除dist

    console.log(chalk.cyan('开始编译\n'))

    await bundle(env);
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
  })()