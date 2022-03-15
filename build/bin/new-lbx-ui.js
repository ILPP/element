'use strict';

/**
 * 新建组件脚本，以 lbx-city 组件为例
 * 1、在 packages 目录下新建组件目录，并完成目录结构的基本创建
 * 2、创建组件文档
 * 3、组件单元测试文件
 * 4、组件样式文件
 * 5、组件类型声明文件
 * 6、并将上述新建的相关资源自动添加的相应的文件，比如组件组件注册到 components.json 文件、样式文件在 index.scss 中自动引入等
 * 总之你只需要专注于编写你的组件代码即可，其它一概不用管
 */

console.log();
process.on('exit', () => {
  console.log();
});

if (!process.argv[2]) {
  console.error('[组件名]必填 - Please enter new component name');
  process.exit(1);
}

const path = require('path');
const fs = require('fs');
const fileSave = require('file-save');
const uppercamelcase = require('uppercamelcase');
// 组件名称 city
const componentname = process.argv[2];
// 组件中文名 城市列表
const chineseName = process.argv[3] || componentname;
// 组件大驼峰命名 City
const ComponentName = uppercamelcase(componentname);
// 组件路径：/packages/city
const PackagePath = path.resolve(__dirname, '../../packages', componentname);
const Files = [
  // packages/city/index.js 的内容
  {
    filename: 'index.js',
    content: `import ${ComponentName} from './src/main';

/* istanbul ignore next */
${ComponentName}.install = function(Vue) {
  Vue.component(${ComponentName}.name, ${ComponentName});
};

export default ${ComponentName};`
  },
  // packages/city/src/main.vue 组件定义
  {
    filename: 'src/main.vue',
    content: `<template>
  <div class="lbx-${componentname}"></div>
</template>

<script>
export default {
  name: 'Lbx${ComponentName}'
};
</script>`
  },
  // 组件中文文档
  {
    filename: path.join('../../examples/docs/zh-CN', `${componentname}.md`),
    content: `## ${ComponentName} ${chineseName}`
  },
  // 组件单元测试文件
  {
    filename: path.join('../../test/unit/specs', `${componentname}.spec.js`),
    content: `import { createTest, destroyVM } from '../util';
import ${ComponentName} from 'packages/${componentname}';

describe('${ComponentName}', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(${ComponentName}, true);
    expect(vm.$el).to.exist;
  });
});
`
  },
  // 组件样式文件
  {
    filename: path.join(
      '../../packages/theme-lbx/src',
      `${componentname}.scss`
    ),
    content: `@import "./base.scss";\n\n.lbx-${componentname} {
}`
  },
  // 组件类型声明文件
  {
    filename: path.join('../../types', `${componentname}.d.ts`),
    content: `import { ElementUIComponent } from './component'

/** ${ComponentName} Component */
export declare class Lbx${ComponentName} extends ElementUIComponent {
}`
  }
];

// 将新组件添加到 components.json
const componentsFile = require('../../components.json');
if (componentsFile[componentname]) {
  console.error(`${componentname} 已存在.`);
  process.exit(1);
}
componentsFile[componentname] = `./packages/${componentname}/index.js`;
fileSave(path.join(__dirname, '../../components.json'))
  .write(JSON.stringify(componentsFile, null, '  '), 'utf8')
  .end('\n');

// 在 index.scss 中引入新组件的样式文件
const lessPath = path.join(
  __dirname,
  '../../packages/theme-lbx/src/index.scss'
);
const lessImportText = `${fs.readFileSync(
  lessPath
)}@import "./${componentname}.scss";`;
fileSave(lessPath).write(lessImportText, 'utf8').end('\n');

// 添加到 element-ui.d.ts
const elementTsPath = path.join(__dirname, '../../types/element-ui.d.ts');

let elementTsText = `${fs.readFileSync(elementTsPath)}
/** ${ComponentName} Component */
export class ${ComponentName} extends Lbx${ComponentName} {}`;

const index = elementTsText.indexOf('export') - 1;
const importString = `import { Lbx${ComponentName} } from './${componentname}'`;

elementTsText =
  elementTsText.slice(0, index) +
  importString +
  '\n' +
  elementTsText.slice(index);

fileSave(elementTsPath).write(elementTsText, 'utf8').end('\n');

// 新建刚才声明的所有文件
Files.forEach(file => {
  fileSave(path.join(PackagePath, file.filename))
    .write(file.content, 'utf8')
    .end('\n');
});

// 将新组建添加到 nav.config.json
const navConfigFile = require('../../examples/nav.config.json');

Object.keys(navConfigFile).forEach(lang => {
  const groups = navConfigFile[lang].find(item => Array.isArray(item.groups))
    .groups;
  groups[groups.length - 1].list.push({
    path: `/${componentname}`,
    title:
      lang === 'zh-CN' && componentname !== chineseName
        ? `${ComponentName} ${chineseName}`
        : ComponentName
  });
});

fileSave(path.join(__dirname, '../../examples/nav.config.json'))
  .write(JSON.stringify(navConfigFile, null, '  '), 'utf8')
  .end('\n');

console.log('DONE!');

