<!--
 * @Author: your name
 * @Date: 2022-03-13 23:44:53
 * @LastEditTime: 2022-03-14 23:17:36
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \element\examples\docs\zh-CN\lbx-icon.md
-->
## Lbx Icon 图标

提供了一套常用的图标集合。

### 使用方法

直接通过设置类名为 `lbx-icon-iconName` 来使用即可。例如：

:::demo
```html
<i class="lbx-icon-add"></i>
<el-button type="primary" icon="lbx-icon-add">搜索</el-button>

```
:::

### 图标集合

<ul class="icon-list">
  <li v-for="name in $lbxIcon" :key="name">
    <span>
      <i :class="'lbx-icon-' + name"></i>
      <span class="icon-name">{{'lbx-icon-' + name}}</span>
    </span>
  </li>
</ul>
