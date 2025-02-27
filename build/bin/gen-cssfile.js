/**
 * 将各个覆写的样式文件在 packages/theme-lbx/src/index.scss 文件中自动引入
 */

var fs = require('fs');
var path = require('path');

// 生成 theme-lbx/src 中的 index.scss 文件
function genIndexScssFile(dir) {
  // 文件列表
  const files = fs.readdirSync(dir);
  /**
  * @import 'x1.scss';
  * @import 'x2.scss;
  */
  let importStr = "/* Automatically generated by './build/bin/gen-cssfile.js' */\n";

  // 需要排除的文件
  const excludeFile = ['assets', 'font', 'index.scss', 'base.scss', 'variable.scss'];

  files.forEach(item => {
    if (excludeFile.includes(item) || !/\.scss$/.test(item)) return;

    // 只处理非 excludeFile 中的 scss 文件
    importStr += `@import "./${item}";\n`;
  });

  // 在 packages/theme-lbx/src/index.scss 文件中写入 @import "xx.scss"，即在 index.scss 中引入所有的样式文件
  fs.writeFileSync(path.resolve(dir, 'index.scss'), importStr);
}

genIndexScssFile(path.resolve(__dirname, '../../packages/theme-lbx/src/'));
