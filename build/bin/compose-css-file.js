/**
 * 负责将打包后的两个 css 目录(lib/theme-chalk、lib/theme-lbx)合并
 * lib/theme-chalk 目录下的样式文件是通过主题配置自动生成的
 * lib/theme-lbx 是扩展组件的样式（覆写默认样式和自定义组件的样式）
 * 最后将样式都合并到 lib/theme-chalk 目录下
 */
const fs = require('fs');
const fileSave = require('file-save');
const { resolve: pathResolve } = require('path');
const shelljs = require('shelljs');

const themeChalkPath = pathResolve(__dirname, '../../lib/theme-chalk');
const themeStsUIPath = pathResolve(__dirname, '../../lib/theme-lbx');

// 判断样式目录是否存在
let themeChalk = null;
let themeStsUI = null;
try {
  themeChalk = fs.readdirSync(themeChalkPath);
} catch (err) {
  console.error('/lib/theme-chalk 不存在');
  process.exit(1);
}
try {
  themeStsUI = fs.readdirSync(themeStsUIPath);
} catch (err) {
  console.error('/lib/theme-lbx 不存在');
  process.exit(1);
}

/**
 * 遍历两个样式目录，合并相同文件，将 theme-lbx 的中样式追加到 theme-chalk 中对应样式文件的末尾
 * 如果 theme-lbx 中的文件在 theme-chalk 中不存在（比如扩展的新组件）,则直接将文件拷贝到 theme-chalk
 */
const excludeFiles = ['element-variables.css', 'variable.css'];
for (let i = 0, themeStsUILen = themeStsUI.length; i < themeStsUILen; i++) {
  if (excludeFiles.includes(themeStsUI[i])) continue;
  if (themeStsUI[i] === 'fonts') {
    shelljs.cp('-R', pathResolve(themeStsUIPath, 'fonts/*'), pathResolve(themeChalkPath, 'fonts'));
    continue;
  }

  if (themeStsUI[i] === 'assets') {
    shelljs.cp('-R', pathResolve(themeStsUIPath, 'assets'), themeChalkPath);
    continue;
  }
  if (themeChalk.includes(themeStsUI[i])) {
    // 说明当前样式文件是覆写 element-ui 中的样式
    const oldFileContent = fs.readFileSync(pathResolve(themeChalkPath, themeStsUI[i]), { encoding: 'utf-8' });
    fileSave(pathResolve(themeChalkPath, themeStsUI[i])).write(oldFileContent).write(fs.readFileSync(pathResolve(themeStsUIPath, themeStsUI[i])), 'utf-8').end();
  } else {
    // 说明当前样式文件是扩展的新组件的样式文件
    // fs.writeFileSync(pathResolve(themeChalkPath, themeStsUI[i]), fs.readFileSync(pathResolve(themeStsUIPath, themeStsUI[i])));
    shelljs.cp(pathResolve(themeStsUIPath, themeStsUI[i]), themeChalkPath);
  }
}

// 删除 lib/theme-lbx
shelljs.rm('-rf', themeStsUIPath);
