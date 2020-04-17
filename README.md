# bar-loading

> vue bar loading, It's a loading component

[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/PanJiaChen/vue-countTo)

### Installation

1. Install the plugin:

```
npm install --save bar-loading
```

2. Add the plugin into your app:

```javascript
import Vue from "vue";
import BarLoading from "bar-loading";

Vue.use(BarLoading);
```

# Usage

```js
this.$barLoading.start(options);

when complete

this.$barLoading.done();
```

### options

- `background` - loading wrapper background-image.
- `icon` - loading content icon.
- `text` - loading text.
- `visible` - show loading.

### Options

| Property   | Description                      |  type   |     default     |
| ---------- | -------------------------------- | :-----: | :-------------: |
| background | loading wrapper background-image | String  |       ""        |
| icon       | loading content icon             | String  |       ""        |
| text       | loading text                     | String  | "正在加载中..." |
| visible    | show loading                     | Boolean |      true       |
