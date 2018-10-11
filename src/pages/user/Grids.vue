/** 
    栅格组件
    使用方式：
    传入栅格数组，格式如下
    grids: [
      { icon: 'icon-plus', name: '测试', path: { path: '/pages/client/home/main', isTab: true },openType:'' },
    ]
*/
<template>
  <div class="grids">
    <block v-for="(item,index) in grids" :key="index">
      <div class="grid" :style="{width:width+'%;'}" >
        <button @click="onClick(item.path)" :open-type="item.openType">
          <i v-if="item.icon" class="iconfont" :class="item.icon" style="margin:10rpx 0;"></i>
          <img v-if="item.img" :src="item.img" style="margin:10rpx 0;">
          <label style="font-size:32rpx">{{item.name}}</label>
        </button>
      </div>
    </block>
  </div>
</template>

<script>
export default {
  props: {
    grids: {
      type: Array,
      require: true
    },
    limit: {
      type: Number,
      default: 5
    }
  },
  computed: {
    width () {
      if (this.grids.length > this.limit) {
        return 100 / this.limit
      }
      return 100 / this.grids.length
    }
  },
  methods: {
    onClick (path) {
      if (path) {
        this.WXP.navigateTo({
          url: path
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
button::after {
  border: none;
}
button {
  // position: static;

  margin: 0;
  padding: 0;
  font-size: 18px;
  text-align: inherit;
  text-decoration: none;
  line-height: 1;
  border-radius: 0;
  -webkit-tap-highlight-color: transparent;
  overflow: hidden;
  color: #000000;
  background-color: transparent;
}
input {
  outline: none;
  border: none;
  list-style: none;
}
.grids {
  display: flex;
  flex-wrap: wrap;
  .grid {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    .iconfont {
      font-size: 1.5em;
    }
  }
  img {
    width: 100rpx;
    height: 100rpx;
  }
}
</style>
