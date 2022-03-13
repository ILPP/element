## Lbx Icon

Element provides a set of common icons.

### Basic usage

Just assign the class name to `el-icon-iconName`.

:::demo

```html
<i class="lbx-icon-add"></i>
<el-button type="primary" icon="lbx-icon-add">Search</el-button>

```
:::

### Icons

<ul class="icon-list">
  <li v-for="name in $lbxIcon" :key="name">
    <span>
      <i :class="'el-icon-' + name"></i>
      <span class="icon-name">{{'lbx-icon-' + name}}</span>
    </span>
  </li>
</ul>
