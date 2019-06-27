<template>
    <div id="home">
        <van-tabs type="card" class="title"  color="#ED6A0C">
            <van-tab title="首页">
            </van-tab>
        </van-tabs>
        <van-swipe :autoplay="3000">
            <van-swipe-item class="swipeItem" v-for="(image, index) in homeSwipes" :key="index">
                <van-image
                        class="homeImage"
                        lazy-load
                        :src="image"
                >
                    <template slot="loading">
                        <van-loading type="spinner" size="20"/>
                    </template>
                </van-image>
            </van-swipe-item>
        </van-swipe>
        <van-list
                v-model="plainArtice.loading"
                :finished="plainArtice.finished"
                finished-text="没有更多了"
        >
            <transition-group name="van-slide-left">

                <defaultArticle
                        :artice="item"
                        :key="item.id"
                        v-for="(item,index) in plainArtice.data"/>
            </transition-group>
        </van-list>
    </div>
</template>

<script>
  import moment from 'moment'
  import _ from 'lodash'
  import qs from 'qs'
  import defaultArticle from '@/components/defaultArticle'

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
            size: 5
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
    methods: {
      /**
       * 普通文章查询
       */
      plainArticeQuery (params) {
        // 判断是否支持EventSource
        if (typeof (EventSource) !== 'undefined') {
          // 长连接方式
          this.plainArticeQueryEvent(params)
        } else {
          this.$notify('你的浏览时不支持EventSource将采用传统方式')
          // 如果不支持采用传统的ajax
          this.plainArticeQueryAxios(params)
        }
      },
      /**
       * 普通文章查询(axios方式)
       */
      plainArticeQueryAxios (params) {
        this.$axios.post('/api/article/articleHomePage', {
          ...params
        })
          .then(res => {
            this.plainArtice.data = _.map(res, item => {
              item.createTime = moment.unix(item.createTime / 1000).format('YYYY-MM-DD')
              return item
            })
          })
      },
      /**
       * 普通文章查询(EventSource方式)
       */
      plainArticeQueryEvent (params) {
        let query = qs.stringify(params)
        let sourceBoolean = false
        let plainArticeSource = new EventSource('/api/article/stream/articleHomePage?' + query, { withCredentials: true })
        // 打开调用
        plainArticeSource.onopen = (event) => {
          if (sourceBoolean) {
            plainArticeSource.close()
            return
          }
          sourceBoolean = true
        }
        // 每次返回调用
        plainArticeSource.onmessage = (event) => {
          let data = JSON.parse(event.data)
          data.createTime = moment.unix(data.createTime / 1000).format('YYYY-MM-DD')
          this.plainArtice.data.push(data)
        }
      }
    },
    created () {
      this.plainArticeQuery(this.plainArtice.query)
    },
    components: {
      defaultArticle
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

</style>
