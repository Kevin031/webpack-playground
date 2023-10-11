const pluginName = "ConsoleLogOnBuildWebpackPlugin";

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log("webpack正在启动！");
    });
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;
