"use strict";
require("./check-versions")();

process.env.NODE_ENV = "production";
process.env.npm_config_report = false;

const rm = require("rimraf");
const path = require("path");
const chalk = require("chalk");
const webpack = require("webpack");
const config = require("../config");
const webpackConfig = require("./webpack.prod.conf");

const bundle = () => {
  return new Promise(resolve => {
    rm(
      path.join(config.build.assetsRoot, config.build.assetsSubDirectory),
      (err) => {
        if (err) throw err;
        webpack(webpackConfig, async (err, stats) => {
          if (err) throw err;
          process.stdout.write(
            stats.toString({
              colors: true,
              modules: false,
              children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
              chunks: false,
              chunkModules: false,
            }) + "\n\n"
          );

          if (stats.hasErrors()) {
            console.log(chalk.red("编译失败\n"));
            process.exit(1);
          }
          console.log(chalk.cyan(" 编译完成\n"));
          resolve();
        });
      }
    );
  });
};

module.exports = bundle;
