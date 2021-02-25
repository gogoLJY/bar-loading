# bar-loading

> vue bar loading, It's a loading component

[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/PanJiaChen/vue-countTo)

## Installation

```bash
# yarn
yarn add bar-loading

# npm
npm install bar-loading
```

## Usage

```js
import Vue from "vue";
import BarLoading from "bar-loading";

Vue.use(BarLoading);
```

```js
this.$barLoading.show(options);

when complete

this.$barLoading.done();

or hidden directly

this.$barLoading.hide();
```

### As directive

```html
<div v-barLoading="options" class="wrapper"></div>
```

Or use the directives and components directly:

```javascript
import Vue from "vue";
import { BarLoadingDirective, BarLoadingComponent } from "bar-loading";

Vue.directive("loading", BarLoadingDirective);
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
