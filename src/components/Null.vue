/** 
   Null组件 当页面没有数据时使用
*/

<template>
  <div class="null"
       :style="{height}">
    <i class="iconfont"
       :class="'icon-'+icon"
       v-if="!hasImage" />
    <img :src="imageUrl"
         v-else/>
    <div class="title">{{title}}</div>
    <div class="content">{{content}}</div>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    imageUrl: String,
    title: String,
    content: String,
    height: {
      type: String,
      default: '100vh'
    }
  },
  computed: {
    hasImage () {
      return this.imageUrl
    }
  }
}
</script>

<style scoped lang="scss">
.null {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  image {
    width: 250rpx;
    height: 250rpx;
  }
  .title {
    color: #000;
    font-size: 36rpx;
  }
  .content {
    color: gray;
    font-size: 32rpx;
  }
}
</style>
