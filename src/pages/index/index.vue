<template>
  <div>
    <scroll-view scroll-y style="height:100vh">
    <van-notice-bar :text="noticeText"/>
    <div class="voice" style="padding:0 40px;">
      <grids :grids="grids" :limit="2" @playVoice="playVoice"/>
    </div>
    </scroll-view>
    <div v-if="hasSrc" hover-class="voice-control-click" class="voice-control" style="width:45px;height:45px;box-shadow:0 10rpx 20rpx gray;">
      <wux-circle
        class="circle"
        :size="45"
        :strokeWidth="5"
        :percent="percent"
        :speed="100"
        background-color="#ef473a"
      >
        <i
          class="iconfont circle-icon"
          :class="['icon-'+circleIcon]"
          @click="circleClick"
          style="color:#33CD5F"
        />
      </wux-circle>
    </div>
  </div>
</template>

<script>
import Grids from '@/components/Grids'
export default {
  components: {
    Grids
  },
  data () {
    return {
      grids: [
        {
          img: '/static/img/4.svg',
          name: '奶猫叫',
          voiceSrc:
            'cloud://meow-helper-1b5609.6d65-meow-helper-1b5609/cat-meow-resource/milk-cat-meow.mp3'
        },
        {
          img: '/static/img/6.png',
          name: '撒娇',
          voiceSrc:
            'cloud://meow-helper-1b5609.6d65-meow-helper-1b5609/cat-meow-resource/coquetry.mp3'
        },
        {
          img: '/static/img/5.png',
          name: '饿了',
          voiceSrc:
            'cloud://meow-helper-1b5609.6d65-meow-helper-1b5609/cat-meow-resource/hungry.mp3'
        },
        {
          img: '/static/img/7.png',
          name: '驱鼠音效',
          voiceSrc:
            'cloud://meow-helper-1b5609.6d65-meow-helper-1b5609/cat-meow-resource/rat-control.mp3'
        },
        {
          img: '/static/img/13.png',
          name: '伤心',
          voiceSrc:
            'cloud://meow-helper-1b5609.6d65-meow-helper-1b5609/cat-meow-resource/sad-cat.mp3'
        },
        {
          img: '/static/img/12.svg',
          name: '受到惊吓',
          voiceSrc:
            'cloud://meow-helper-1b5609.6d65-meow-helper-1b5609/cat-meow-resource/get -scared.mp3'
        },
        {
          img: '/static/img/17.svg',
          name: '嘶嘶声（生气）',
          voiceSrc:
            'cloud://meow-helper-1b5609.6d65-meow-helper-1b5609/cat-meow-resource/hissing.mp3'
        },
        {
          img: '/static/img/15.png',
          name: '求主人撸猫',
          voiceSrc:
            'cloud://meow-helper-1b5609.6d65-meow-helper-1b5609/cat-meow-resource/want-touch.mp3'
        },
        {
          img: '/static/img/8.png',
          name: '咕噜声(开心)',
          voiceSrc:
            'cloud://meow-helper-1b5609.6d65-meow-helper-1b5609/cat-meow-resource/purring.mp3'
        },
        {
          img: '/static/img/18.svg',
          name: '哭泣',
          voiceSrc:
            'cloud://meow-helper-1b5609.6d65-meow-helper-1b5609/cat-meow-resource/crying.mp3'
        }
      ],
      innerAudioContext: wx.createInnerAudioContext(),
      percent: 0,
      hasSrc: false,
      circleIcon: 'play',
      noticeText: ''
    }
  },
  computed: {
    isPaused () {
      return this.circleIcon === 'play'
    }
  },
  onLoad () {
    this.getData()
  },
  mounted () {
    this.innerAudioContext.autoplay = true
    this.innerAudioContext.onCanplay(res => {
      this.percent = 0
      this.WXP.hideNavigationBarLoading()
    })
    this.innerAudioContext.onPlay(() => {
      console.log('start')
      this.circleIcon = 'pause'
    })
    this.innerAudioContext.onPause(() => {
      this.circleIcon = 'play'
    })
    this.innerAudioContext.onTimeUpdate(res => {
      console.log('update')
      this.percent = Math.floor(
        this.innerAudioContext.currentTime /
          this.innerAudioContext.duration *
          100
      )
      this.hasSrc = !!this.innerAudioContext.src
    })
    this.innerAudioContext.onEnded(() => {
      console.log('end')
      this.percent = 100
      this.circleIcon = 'play'
      this.WXP.showToast({ title: '播放完毕', icon: 'none' })
      this.WXP.hideNavigationBarLoading()
    })
    this.innerAudioContext.onError(res => {
      this.WXP.showToast({ title: res.errMsg, icon: 'none' })
    })
  },
  methods: {
    playVoice (voiceSrc) {
      if (this.innerAudioContext.src === voiceSrc) {
        this.innerAudioContext.play()
      } else {
        this.WXP.showNavigationBarLoading()
        this.innerAudioContext.src = voiceSrc
      }
    },
    getData () {
      this.db
        .collection('meow')
        .get()
        .then(res => {
          console.log(res)
          this.grids = res.data
          return this.db.collection('noticeText').get()
        })
        .then(res => {
          console.log(res)
          this.noticeText = res.data[0].noticeText
        })
    },
    circleClick () {
      console.log('circle-click')
      this.isPaused
        ? this.playVoice(this.innerAudioContext.src)
        : this.innerAudioContext.pause()
    }
  }
}
</script>

<style lang="scss">
// .voice-control-click{
//   // background: rgb(247, 247, 247) !important;
//   transform: scale(1.02)
// }
.voice-control {
  background: #fff;
  border-radius: 50%;
  margin: 0 auto;
  position: fixed;
  right:50rpx;
  bottom:50rpx;
  .circle {
    .circle-icon {
      .van-icon {
        font-weight: bold;
        text-align: center;
        vertical-align: middle;
      }
    }
  }
}

.voice {
  .grids {
    button {
      margin: 24rpx 0;
    }
  }
}
</style>
