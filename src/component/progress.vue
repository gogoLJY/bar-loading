<template>
  <div class="progress-bar">
    <div class="progress-bar-outer" :style="outerStyle">
      <div class="progress-bar-inner" :style="innerStyle" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    },
    strokeWidth: {
      type: Number,
      default: 10
    }
  },
  computed: {
    outerStyle() {
      return {
        height: this.strokeWidth + "px"
      };
    },
    innerStyle() {
      let style = {};
      style.width = this.percent + "%";
      return style;
    }
  }
};
</script>

<style lang="scss" scoped>
.progress-bar {
  display: inline-block;
  width: 100%;
}
.progress-bar-outer {
  position: relative;
  width: 100%;
  border-radius: 7px;
  background-image: linear-gradient(to right, #3e69d8, #4d97e4);
  overflow: hidden;
}
.progress-bar-inner {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  border-radius: 7px;
  background-color: #79e0ff;
}
</style>
