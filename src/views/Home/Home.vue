<template>
    <div id="home" style="margin-bottom: 50px">
        <van-tabs
                background="#ED6A0C"
                class="title"
                title-active-color="#FFFFFF"
                title-inactive-color="#F2F3F5"
                swipeable
                animated
                lazy-render>
            <van-tab title="首页">
            </van-tab>
        </van-tabs>

        <van-swipe :autoplay="3000">
            <van-swipe-item class="swipeItem" v-for="(image, index) in homeSwipes" :key="index">
                <JushiImg
                imgHeight="20vh"
                :imgUrl="image"/>
            </van-swipe-item>
        </van-swipe>
        <articeList url="/api/web/article/page" :query="plainArtice.query"></articeList>
    </div>
</template>

<script>

  import articeList from '@/components/Article/ArticeList'
  import JushiImg from '@/components/Img/JushiImg'

  export default {
    name: 'Home',
    data () {
      return {
        /**
         * 普通文章
         */
        plainArtice: {
          query: {
            page: 0,
            size: 9,
            order: 'weight'
          }
        },
        homeSwipes:
          [
            'http://iph.href.lu/1280x790?text=巨石',
            'http://iph.href.lu/1280x790?text=巨石',
            'http://iph.href.lu/1280x790?text=巨石'
          ]
      }
    },
    methods: {},
    created () {

    },
    components: {
      articeList,
      JushiImg
    }
  }
</script>

<style lang="scss">
    .title {
        .van-tabs__nav--card {
            margin: 0;
        }
    }

    .swipeItem {
        text-align: center;

    }

    #home .van-tabs__line {
        display: none;
    }

</style>
