<template>
  <div style="padding:24rpx;">
    <van-cell-group :border="false">
      <block
        v-for="(article,idx) in articles"
        :key="idx">
      <van-transition name="fade-up" :duration="600+300*idx">
        <van-cell :title="article.title" is-link @click="toArticle(article._id)">
          <img v-if="article.iconSrc" :src="article.iconSrc" slot="icon"/>
        </van-cell>
        </van-transition>
      </block>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: {}
    }
  },
  mounted () {
    this.WXP.showNavigationBarLoading()
      .then(() => {
        return this.db.collection('article').get()
      }).then(res => {
        // res.data 包含该记录的数据
        console.log(res)
        this.articles = res.data
        this.WXP.hideNavigationBarLoading()
      }).catch(err => {
        this.WXP.hideNavigationBarLoading()
        console.error(err)
      })
  },
  methods: {
    toArticle (id) {
      this.WXP.navigateTo({
        url: `/pages/articles/article/main?id=${id}`
      })
    }
  }
}
</script>

<style>
</style>
