<template>
  <div>
    <block>
      <user-info/>
      <div class="user-actions">
        <user-actions :grids="grids"/>
      </div>
    </block>
  </div>
</template>

<script>
import UserInfo from './UserInfo'
import UserActions from './Grids'
export default {
  components: {
    UserInfo,
    UserActions
  },
  data () {
    return {
      isLogin: false,
      grids: [
        { icon: 'icon-share', name: '分享小程序', openType: 'share' },
        { icon: 'icon-shuru', name: '意见反馈', openType: 'feedback' }
      ]
    }
  },
  onShareAppMessage () {
    return {
      title: '猫叫助手|与猫咪交流的好帮手',
      path: '/pages/index/main',
      imageUrl: '/static/img/code.jpg'
    }
  },
  methods: {
    onClick () {
      console.log(1)
    }
  }
}
</script>

<style scoped lang="scss">
.user-actions {
  width: 80vw;
  background-color: #fff;
  border-radius: 10rpx;
  margin: 30rpx auto;
  padding: 20rpx 0;
  font-size: 16px;
}
.van-hairline,
.van-hairline--bottom,
.van-hairline--left,
.van-hairline--right,
.van-hairline--surround,
.van-hairline--top,
.van-hairline--top-bottom {
  position: static;
}
</style>
