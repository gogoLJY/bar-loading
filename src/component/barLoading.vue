<template>
  <transition name="loading-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      class="loading-wapper fixed-wrapper flex-wrapper"
      :class="wrapperClass"
      :style="wrapperStyle"
    >
      <div class="loading-content">
        <div class="loading-icon-box no-select" v-if="icon">
          <img :src="icon" alt="" class="no-event" />
        </div>
        <div class="progress-container" :class="progressContainer">
          <Progress :percent="percent" />
        </div>
        <span class="loading-text" v-if="text">{{ text }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
import Progress from "./progress.vue";
import { isUrl } from "../lib/utils";

export default {
  name: "BarLoading",
  components: {
    Progress
  },
  data() {
    return {
      background: "",
      icon: "",
      text: "",
      customClass: "",
      fullscreen: true,
      visible: true,
      progressContainer: [],
      percent: 0,
      waitPercent: 90,
      finishPercent: 100,
      timer: 0,
      speed: 30,
      finishSpeed: 5
    };
  },
  computed: {
    wrapperClass() {
      return [
        this.customClass,
        {
          "is-fullscreen": this.fullscreen
        }
      ];
    },
    wrapperStyle() {
      let style = {};
      if (isUrl(this.background)) {
        style.backgroundImage = `url(${this.background})`;
      } else {
        style.backgroundColor = this.background;
      }
      return style;
    }
  },
  methods: {
    start() {
      this.runTimer();
    },

    done() {
      this.runTimer(true);
    },

    runTimer(isFinished) {
      let speed = this.speed,
        waitPercent = this.waitPercent;

      if (isFinished) {
        this.clearTimer();
        speed = this.finishSpeed;
        waitPercent = this.finishPercent;
      }
      this.timer = setInterval(() => {
        if (this.percent >= waitPercent) {
          this.clearTimer();
          if (isFinished) {
            this.$emit("complete");
          }
        } else {
          this.percent++;
        }
      }, speed);
    },

    setText(text) {
      this.text = text;
    },

    handleAfterLeave() {
      this.$emit("after-leave");
    },

    clearTimer() {
      this.timer && clearInterval(this.timer);
    }
  },
  beforeDestroy() {
    this.clearTimer();
  }
};
</script>

<style lang="scss">
.parent-no-scroll {
  overflow: hidden !important;
}
</style>
<style lang="scss" scoped>
$bg_color: rgba(20, 18, 36, 0.8);

.loading-fade-enter,
.loading-fade-leave-active {
  opacity: 0;
}

.fixed-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  &.is-fullscreen {
    position: fixed;
  }
}

.flex-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-wapper {
  width: 100%;
  height: 100%;
  background-color: $bg_color;
  background-repeat: no-repeat;
  background-size: 100%;
  transition: opacity 0.5s ease-in-out;
  will-change: opacity;
  z-index: 99;
  .loading-content {
    color: #fff;
    text-align: center;
  }
  .loading-icon-box {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    img {
      width: 100%;
    }
  }
  .loading-text {
    display: inline-block;
    font-size: 14px;
    margin-top: 20px;
  }
}
.progress-container {
  width: 60px;
  text-align: center;
  margin: 30px auto 0;
}
</style>
