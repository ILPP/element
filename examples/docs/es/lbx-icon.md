## Icon

Element proporciona un conjunto de iconos propios.

### Uso básico

Simplemente asigna el nombre de la clase a `lbx-icon-iconName`.

:::demo

```html
<i class="lbx-icon-edit"></i>
<el-button type="primary" icon="lbx-icon-search">Search</el-button>

```
:::

### Iconos

<ul class="icon-list">
  <li v-for="name in $lbxIcon" :key="name">
    <span>
      <i :class="'lbx-icon-' + name"></i>
      <span class="icon-name">{{'lbx-icon-' + name}}</span>
    </span>
  </li>
</ul>
