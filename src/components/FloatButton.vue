<template>
<div>
  <div class="wux-backdrop--transparent" v-if="backdrop && buttonVisible"></div>
  <div class="wux-class wux-speed-dial" :class="[positionClass,themeClass,buttonVisibleClass]" >
    <div class="wux-speed-dial__action" hover-class="wux-speed-dial__action--hover">
      <image class="wux-speed-dial__text" :class="{ 'wux-speed-dial__text--rotate':buttonVisible && actionRotate}" @click="onToggle" :src="action" />
    </div>
    <div class="wux-speed-dial__buttons" v-if="buttons.length">
      <block v-for="(item,index) in buttons" :key="index">
        <div class="wux-speed-dial__button" :class="[{'wux-speed-dial__button--label':item.label},item.className ]" :data-index="index" :data-value="item" :data-label="item.label" @click="buttonClicked" hover-class="wux-speed-dial__button--hover" :style="{transitionDelay: index * 50 + 'ms'}">
          <i v-if="item.icon" class="iconfont" :class="item.icon"/>
          <image v-else class="wux-speed-dial__icon" :src="item.img" />
        </div>
      </block>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    theme: {
      type: String,
      default: 'balanced'
    },
    position: {
      type: String,
      default: 'bottomRight'
    },
    action: {
      type: String,
      default: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAHdElNRQfhBAQLCR5MtjrbAAAAjUlEQVRo3u3ZMRKAIAxEUbDirp4nXnctFFDHBtDQ/O1Nnk6aHUMgZCBKMkmmNAtgOmL9M+IQQGVM95zljy8DAAAAAAAAAAAAAACALsDZcppSx7Q+WdtUvA5xffUtrjeA8/qQ21S9gc15/3Nfzw0M5O0G2kM5BQAAAAAAAAAAAAAAQGk33q0qZ/p/Q/JFdmei9usomnwIAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTA0VDExOjA5OjMwKzA4OjAw1U4c3wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0wNFQxMTowOTozMCswODowMKQTpGMAAAAASUVORK5CYII='
    },
    actionRotate: {
      type: Boolean,
      default: true
    },
    backdrop: {
      type: Boolean,
      default: false
    },
    buttons: {
      type: Array,
      default: []
    },
    defaultVisible: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: false
    },
    auto: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      buttonVisible: false
    }
  },
  computed: {
    positionClass () {
      return this.position ? `wux-speed-dial--${this.position}` : ''
    },
    themeClass () {
      return this.theme ? `wux-speed-dial--${this.theme}` : ''
    },
    buttonVisibleClass () {
      return this.buttonVisible ? 'wux-speed-dial--opened' : ''
    }
  },
  mounted () {
    const { defaultVisible, visible, auto } = this
    const buttonVisible = !auto ? visible : defaultVisible

    this.buttonVisible = buttonVisible
  },
  watch: {
    visible (newVal, old) {
      if (!this.auto) {
        this.buttonVisible = newVal
      }
    }
  },
  methods: {
    /**
         * change 事件的回调
         */
    fireEvents (buttonVisible) {
      if (this.buttonVisible !== buttonVisible) {
        if (this.auto) {
          this.buttonVisible = buttonVisible
        }
      }
      this.$emit('change', { value: this.buttonVisible })
    },
    /**
         * 按钮点击事件
         */
    buttonClicked (e) {
      const { index, value } = e.mp.currentTarget.dataset
      const params = {
        index,
        value,
        buttons: this.buttons
      }

      this.$emit('click', params)
      this.fireEvents(false)
    },
    /**
         * 切换状态
         */
    onToggle (e) {
      this.fireEvents(!this.buttonVisible)
    }
  }
}
</script>

<style>
.wux-speed-dial {
  position: fixed;
  z-index: 1500;
}
.wux-speed-dial--topLeft {
  left: 30rpx;
  top: 30rpx;
}
.wux-speed-dial--topRight {
  right: 30rpx;
  top: 30rpx;
}
.wux-speed-dial--bottomLeft {
  left: 30rpx;
  bottom: 30rpx;
}
.wux-speed-dial--bottomRight {
  right: 30rpx;
  bottom: 30rpx;
}
.wux-speed-dial--topLeft .wux-speed-dial__button:after,
.wux-speed-dial--bottomLeft .wux-speed-dial__button:after {
  left: 120rpx;
}
.wux-speed-dial--topRight .wux-speed-dial__button:after,
.wux-speed-dial--bottomRight .wux-speed-dial__button:after {
  right: 120rpx;
}
.wux-speed-dial--topLeft .wux-speed-dial__buttons,
.wux-speed-dial--topRight .wux-speed-dial__buttons {
  bottom: inherit;
  top: 100%;
  margin-bottom: 0;
  margin-top: 32rpx;
}
.wux-speed-dial__action {
  position: absolute;
  right: 30rpx;
  bottom: 30rpx;
  width: 100rpx;
  height: 100rpx;
  border-radius: 50%;
  z-index: 1500;
  background-color: #33cd5f;
  color: #fff;
  overflow: hidden;
  -webkit-transition-duration: .3s;
          transition-duration: .3s;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
          align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
          justify-content: center;
  box-shadow: 0 0 8rpx rgba(0, 0, 0, 0.14), 0 8rpx 16rpx rgba(0, 0, 0, 0.28);
  right: 0;
  bottom: 0;
  position: relative;
}
.wux-speed-dial__action--hover {
  -webkit-transition-duration: 0s;
          transition-duration: 0s;
  opacity: .8 !important;
}
.wux-speed-dial__icon {
  display: inline-block;
  width: 40rpx;
  height: 40rpx;
  font-size: 40rpx;
  line-height: 1;
}
.wux-speed-dial__text {
  display: inline-block;
  width: 40rpx;
  height: 40rpx;
  font-size: 40rpx;
  line-height: 1;
  -webkit-transition: -webkit-transform 150ms cubic-bezier(0.4, 0, 1, 1);
  transition: -webkit-transform 150ms cubic-bezier(0.4, 0, 1, 1);
  transition: transform 150ms cubic-bezier(0.4, 0, 1, 1);
  transition: transform 150ms cubic-bezier(0.4, 0, 1, 1), -webkit-transform 150ms cubic-bezier(0.4, 0, 1, 1);
}
.wux-speed-dial__text--rotate {
  -webkit-transform: scale(1) rotate(135deg);
          transform: scale(1) rotate(135deg);
}
.wux-speed-dial__buttons {
  position: absolute;
  width: 80rpx;
  left: 50%;
  margin-left: -40rpx;
  bottom: 100%;
  margin-bottom: 32rpx;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: reverse;
  -webkit-flex-direction: column-reverse;
          flex-direction: column-reverse;
  visibility: hidden;
  pointer-events: none;
}
.wux-speed-dial__button {
  width: 80rpx;
  height: 80rpx;
  opacity: 0;
  color: #fff;
  border-radius: 50%;
  position: relative;
  z-index: 1;
  overflow: visible;
  background-color: #33cd5f;
  -webkit-transition-duration: .3s;
          transition-duration: .3s;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
          align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
          justify-content: center;
  -webkit-transform: translate3d(0, 16rpx, 0) scale(0.3);
          transform: translate3d(0, 16rpx, 0) scale(0.3);
  -webkit-transform-origin: center bottom;
          transform-origin: center bottom;
  box-shadow: 0 0 8rpx rgba(0, 0, 0, 0.14), 0 8rpx 16rpx rgba(0, 0, 0, 0.28);
}
.wux-speed-dial__button + .wux-speed-dial__button {
  margin-bottom: 32rpx;
}
.wux-speed-dial__button--label.wux-speed-dial__button:after {
  content: attr(data-label);
  position: absolute;
  top: 50%;
  padding: 8rpx 20rpx;
  font-size: 24rpx;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 6rpx;
  color: rgba(255, 255, 255, 0.8);
  pointer-events: none;
  white-space: nowrap;
  opacity: 0;
  box-sizing: border-box;
  -webkit-transform: translate3d(0, -50%, 0);
          transform: translate3d(0, -50%, 0);
  -webkit-transition: all 0.3s;
  transition: all 0.3s;
}
.wux-speed-dial__button__button--hover {
  -webkit-transition-duration: 0s;
          transition-duration: 0s;
  opacity: .8 !important;
}
.wux-speed-dial--opened .wux-speed-dial__buttons {
  visibility: visible;
  pointer-events: auto;
}
.wux-speed-dial--opened .wux-speed-dial__button {
  opacity: 1;
  -webkit-transform: translate3d(0, 0, 0) scaleY(1);
          transform: translate3d(0, 0, 0) scaleY(1);
}
.wux-speed-dial--opened .wux-speed-dial__button:after {
  opacity: 1;
}
.wux-speed-dial--light .wux-speed-dial__action,
.wux-speed-dial--light .wux-speed-dial__button {
  background-color: #ddd;
}
.wux-speed-dial--stable .wux-speed-dial__action,
.wux-speed-dial--stable .wux-speed-dial__button {
  background-color: #b2b2b2;
}
.wux-speed-dial--positive .wux-speed-dial__action,
.wux-speed-dial--positive .wux-speed-dial__button {
  background-color: #387ef5;
}
.wux-speed-dial--calm .wux-speed-dial__action,
.wux-speed-dial--calm .wux-speed-dial__button {
  background-color: #11c1f3;
}
.wux-speed-dial--assertive .wux-speed-dial__action,
.wux-speed-dial--assertive .wux-speed-dial__button {
  background-color: #ef473a;
}
.wux-speed-dial--balanced .wux-speed-dial__action,
.wux-speed-dial--balanced .wux-speed-dial__button {
  background-color: #33cd5f;
}
.wux-speed-dial--energized .wux-speed-dial__action,
.wux-speed-dial--energized .wux-speed-dial__button {
  background-color: #ffc900;
}
.wux-speed-dial--royal .wux-speed-dial__action,
.wux-speed-dial--royal .wux-speed-dial__button {
  background-color: #886aea;
}
.wux-speed-dial--dark .wux-speed-dial__action,
.wux-speed-dial--dark .wux-speed-dial__button {
  background-color: #444;
}

</style>
