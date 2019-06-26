<template>
  <div id="home">
    <van-tabs type="card" class="title">
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
      <van-cell
        class="plain-artice-cell"
        :key="item.id"
        v-for="item in plainArtice.data"
      >
        <van-panel
          slot="default"
        >
          <div slot="header" style="display: flex; justify-content:space-between;">
            <div class="plain-artice-header">
              <van-image
                width="24"
                lazy-load
                :src="item.sysUser.imageUrl"
              >
                <template slot="error">
                  <van-image
                    width="24"
                    src="https://i.loli.net/2019/06/26/5d12e7ea69d6285534.png"
                  >
                    <template slot="loading">
                      <van-loading type="spinner" size="20"/>
                    </template>
                  </van-image>
                </template>
              </van-image>
              <div>
                &nbsp;
                {{item.sysUser.username}}
              </div>
            </div>
            <div style="float: right;color:red;">
              {{item.plate.name}}
            </div>
          </div>
          <div slot="default">
            <div class="plain-artice-title">{{item.title}}</div>
            <div>{{item.cover}}</div>
          </div>
        </van-panel>
      </van-cell>

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
            size: 5
          },
          plainArticeSource: null
        },
        homeSwipes:
          [
            'http://iph.href.lu/1280x790?text=巨石',
            'http://iph.href.lu/1280x790?text=巨石',
            'http://iph.href.lu/1280x790?text=巨石'
          ]
      }
    },
    created () {
      // 判断是否支持EventSource
      if (typeof (EventSource) !== 'undefined') {
        // 长连接方式
        let query = qs.stringify(this.plainArtice.query)
        let plainArticeSource = new EventSource('/api/article/stream/articleHomePage?' + query, { withCredentials: true })
        // 打开调用
        plainArticeSource.onopen = (event) => {
          if (this.plainArtice.plainArticeSource != null) {
            this.plainArtice.plainArticeSource.close()
            return
          }
          this.plainArtice.plainArticeSource = plainArticeSource
        }
        // 每次返回调用
        plainArticeSource.onmessage = (event) => {
          let data = JSON.parse(event.data)
          data.createTime = moment.unix(data.createTime / 1000).format('YYYY-MM-DD')
          this.plainArtice.data.push(data)
        }
      } else {
        this.notify('你的浏览时不支持EventSource将采用传统方式')

        // 如果不支持采用传统的ajax
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

<style lang="scss" scoped>
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

  .plain-artice-cell {
    margin-top: 1vh;
  }

  .plain-artice-header {
    padding-top: 1PX;
    display: flex;
    align-items: center
  }

</style>
