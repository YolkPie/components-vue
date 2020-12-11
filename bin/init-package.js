const packageJson = require('package-json')
const fs = require('fs')
const shell = require('shelljs')

const initPackage = async env => {
  const package = await packageJson(
    env === '线上'
        ? '@paimai/components-vue'
        : '@paimai/pcomponents-vue',
    {
      registryUrl: 'http://registry.m.jd.com'
    }
  )
  if (!package) package = JSON.parse(fs.readFileSync('package.json'))
  package.name =
    env === '线上'
        ? '@paimai/components-vue'
        : '@paimai/pcomponents-vue'
  package.description =
    env === '线上'
        ? 'PAIMAIUI组件库'
        : 'PAIMAIUI组件库 预发版本'
  package.devDependencies = {}
  package.scripts = {}
  package.license = 'ISC'
  package.repository = {
    type: 'git',
    url: 'git@git.jd.com:auction-fe/components-vue.git'
  }

  shell.exec('cp README.md ./dist/')
  shell.exec('jnpm config set loglevel warn')
  return package
}

module.exports = initPackage
