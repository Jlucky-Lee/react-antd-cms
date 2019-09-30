const {
    override,
    addDecoratorsLegacy,
    fixBabelImports,
    addLessLoader

} = require("customize-cra");

// 包含了所有的 less 颜色变量信息 但凡改了配置文件，项目必须重启
const modifyVars = require('./theme/nx.js');

module.exports = override(
    addDecoratorsLegacy(),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars
    }),
)