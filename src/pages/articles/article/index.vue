<template>
  <div class="article-container" style="padding:24rpx">
    <div class="desc paragraph" v-for="(item,idx) in article.desc" :key="idx">{{item}}</div>
    <div class="content" :class="content.type" v-for="(content,idx) in article.contents" :key="idx">
      <div class="content-title">
        <van-icon v-if="content.icon" name="warn" style="font-size:15px"/>
        {{content.title}}
      </div>
      <div class="content-desc paragraph" v-for="(item, i) in content.desc" :key="i" v-if="item!==null">{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      article: {}
    }
  },
  onLoad (e) {
    const db = wx.cloud.database()
    db
      .collection('article')
      .where({
        _id: e.id
      })
      .get()
      .then(res => {
        this.article = res.data[0]
        this.WXP.setNavigationBarTitle({ title: this.article.title })
      })
      .catch(console.error)
  },
  onUnload () {
    this.article = {}
  }
}
</script>

<style scoped lang="scss">
.paragraph {
  margin: 12rpx 0;
  text-indent: 1.5em;
}
.article-container {
  background: #fff;
  margin: 24rpx;
  padding: 24rpx;
  border-radius: 16rpx;

  .content {
    margin: 24rpx 0;

    .content-title {
      font-weight: bold;
      background: #f59aaa;
      color: #fff;
      padding: 3px 25px 3px 10px;
      border-radius: 0 25px 25px 0;
      display: inline-block;
    }
  }
  .warn {
    .content-title {
      font-weight: bold;
      background: orange;
      background-image: repeating-linear-gradient(
        60deg,
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.2) 15px,
        transparent 0,
        transparent 30px
      );
      // border-left: 8rpx solid orange;
      padding-left: 18rpx;
      color: #fff;
    }
    .content-desc {
      background: orange;
      background-image: repeating-linear-gradient(
        60deg,
        rgba(255, 255, 255, 0.2),
        rgba(255, 255, 255, 0.2) 15px,
        transparent 0,
        transparent 30px
      );
      color: #fff;
      padding: 12rpx;
      border-radius: 5px;
    }
  }
}
</style>
