## Icônes

Element fournit un ensemble d'icônes basiques.

### Usage

Il vous suffit d'assigner le nom de classe `lbx-icon-iconName` à une balise `<i>`.

:::demo

```html
<i class="lbx-icon-edit"></i>
<el-button type="primary" icon="lbx-icon-search">Chercher</el-button>

```
:::

### Icônes

<ul class="icon-list">
  <li v-for="name in $lbxIcon" :key="name">
    <span>
      <i :class="'lbx-icon-' + name"></i>
      <span class="icon-name">{{'lbx-icon-' + name}}</span>
    </span>
  </li>
</ul>
