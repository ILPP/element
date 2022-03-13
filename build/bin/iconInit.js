'use strict';

var postcss = require('postcss');
var fs = require('fs');
var path = require('path');

/**
 * 从指定的 icon 样式文件（entry）中按照给定正则表达式（regExp）解析出 icon 名称，然后输出到指定位置（output）
 * @param {*} entry 被解析的文件相对于当前文件的路径，比如：../../packages/theme-chalk/icon.css
 * @param {*} regExp 被解析的正则表达式，比如：/\.el-icon-([^:]+):before/
 * @param {*} output 解析后的资源输出到相对于当前文件的指定位置，比如：../../examples/icon.json
 */
function parseIconName(entry, regExp, output) {
  // 读取样式文件
  var fontFile = fs.readFileSync(path.resolve(__dirname, entry), 'utf8');
  // 将样式内容解析为样式节点
  var nodes = postcss.parse(fontFile).nodes;
  var classList = [];

  // 遍历样式节点
  nodes.forEach((node) => {
    // 从样式选择器中根据给定匹配规则匹配出 icon 名称
    var selector = node.selector || '';
    var reg = new RegExp(regExp);
    var arr = selector.match(reg);

    // 将匹配到的 icon 名称放入 classList
    if (arr && arr[1]) {
      classList.push(arr[1]);
    }
  });

  classList.reverse(); // 希望按 css 文件顺序倒序排列

  // 将 icon 名称数组输出到指定 json 文件中
  fs.writeFile(path.resolve(__dirname, output), JSON.stringify(classList), () => { });
}

// 根据 icon.css 文件生成所有的 icon 图标名
parseIconName('../../packages/theme-chalk/icon.css', /\.el-icon-([^:]+):before/, '../../examples/icon.json');

// 根据 icon.scss 文件生成所有的 sts icon 图标名
parseIconName('../../packages/theme-lbx/src/icon.scss', /\.lbx-icon-([^:]+):before/, '../../examples/lbx-icon.json');

