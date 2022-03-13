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
      <i :class="'el-icon-' + name"></i>
      <span class="icon-name">{{'el-icon-' + name}}</span>
    </span>
  </li>
</ul>
