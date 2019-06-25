<template>
  <div id="home">
    <van-tabs type="card" class="title">
      <van-tab title="首页">
      </van-tab>
    </van-tabs>
    <van-swipe :autoplay="3000">
      <van-swipe-item class="swipeItem" v-for="(image, index) in homeSwipes" :key="index">
        <img v-lazy="image" class="homeImage"/>
      </van-swipe-item>
    </van-swipe>
    <van-list
      v-model="plainArtice.loading"
      :finished="plainArtice.finished"
      finished-text="没有更多了"
    >
      <van-panel class="plain-artice-panel" :title="item.sysUser.username" :status="item.plate.name" :key="item.id"
                 v-for="item in plainArtice.data">
        <div>

          <div class="plain-artice-title">{{item.title}}</div>
          <div>{{item.cover}}</div>
        </div>
      </van-panel>
    </van-list>
  </div>
</template>

<script>
  import moment from 'moment'
  import _ from 'lodash'
  import qs from 'qs'

  export default {
    name: 'Home',
    data () {
      return {
        /**
         * 普通文章
         */
        plainArtice: {
          data: [],
          loading: false,
          finished: true,
          query: {
            page: 0,
            size: 3
          }
        },
        homeSwipes: [
          'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
          'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
          'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg'
        ]
      }
    },
    created: function() {
      if (typeof (EventSource) !== 'undefined') {
        let query = qs.stringify(this.plainArtice.query)
        var source = new EventSource('/api/article/stream/articleHomePage?' + query, { withCredentials: true })
        source.onmessage = function(event) {
          console.log(event);
          let data = JSON.parse(event.data)
        }
      } else {
        this.$axios.post('/api/article/articleHomePage', {
          ...this.plainArtice.query
        })
          .then(res => {
            this.plainArtice.data = _.map(res, item => {
              item.createTime = moment.unix(item.createTime / 1000).format('YYYY-MM-DD')
              return item
            })
          })
      }
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

    .homeImage {
      height: 25vh;
    }
  }

  .plain-artice-title {
    font-weight: bolder
  }

  .plain-artice-panel {
    margin-bottom: 50PX;
  }
</style>
