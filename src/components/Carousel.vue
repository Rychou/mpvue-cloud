<template>
  <div>
    <swiper indicator-dots
            autoplay
            circular>
      <block v-for="(item,index) in items"
             :key="index">
        <swiper-item class="swiper-item"
                     @click="$router.push(item.path)">
          <block v-if="isMutiple">
            <image v-for="(i,idx) in item"
                   :key="idx"
                   mode="aspectFill"
                   class="carousel-image"
                   style="margin:0 10px"
                   :src="i.src" />
          </block>
          <image v-else
                 mode="aspectFill"
                 class="carousel-image"
                 :src="item.src" />
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  props: {
    items: {
      type: Array,
      defalut: []
    },
    test: {
      type: String,
      default: 'abc'
    }
  },
  data () {
    return {
    }
  },
  computed: {
    isMutiple () {
      return this.typeof(this.items[0]) === 'Array'
    }
  },
  mounted () {
    console.log(this.test)
  }
}
</script>

<style scoped lang="scss">
.swiper-item {
  display: flex;
  justify-content: center;
  .carousel-image {
    max-width: 100%;
    max-height: 100%;
    border-radius: 10rpx;
  }
}
</style>
