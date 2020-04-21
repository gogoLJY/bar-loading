# bar-loading

> vue bar loading, It's a loading component

[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/PanJiaChen/vue-countTo)

## Getting started

**1**、Install the plugin:

```
npm install --save bar-loading
```

**2**、Add the plugin into your app:

```js
import Vue from "vue";
import BarLoading from "bar-loading";

Vue.use(BarLoading);
```

```js
this.$barLoading.start(options);

when complete

this.$barLoading.done();
```

**3**、Use the `v-barLoading` directive:

```html
<div v-barLoading="options" class="wrapper"></div>
```

Or use the directives and components directly:

```javascript
import Vue from "vue";
import { barLoading } from "bar-loading";

Vue.directive("loading", barLoading);
```

```html
<div v-loading="options"></div>
```

### Options

| Property          | Description                         |  type   |     default     |
| ----------------- | ----------------------------------- | :-----: | :-------------: |
| background        | loading wrapper background-image    | String  |       ""        |
| icon              | loading content icon                | String  |       ""        |
| text              | loading text                        | String  | "正在加载中..." |
| visible           | show loading                        | Boolean |      true       |
| lock              | make the wrapper no scroll          | Boolean |      false      |
| show              | show loading, only use in directive | Boolean |      false      |
| progressContainer | progress container class            |  Array  |       []        |
| customClass       | loading wrapper class               | String  |       ''        |
