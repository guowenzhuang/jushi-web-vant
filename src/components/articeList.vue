<template>
    <div>
        <van-pull-refresh
                v-model="pullRefreshLoading"
                success-text="加载成功"
                @refresh="onRefresh"
                style="margin-bottom: 20px">
            <van-list
                    :offset="30"
                    @load="plainArticeLoad"
                    loading-text="加载中"
                    v-model="plainArtice.loading"
                    :finished="plainArtice.finished"
                    :finished-text="plainArtice.data.length==0?'暂无数据':'亲,已经到底部了哦'"
            >
                <transition-group name="van-slide-left">

                    <defaultArticle
                            :article="item"
                            :key="item.id"
                            v-for="(item) in plainArtice.data"/>
                </transition-group>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
  import defaultArticle from '@/components/defaultArticle'
  import moment from 'moment'
  import _ from 'lodash'
  import qs from 'qs'

  export default {
    name: 'articeList',
    props: {
      url: null,
      query: {}
    },
    data () {
      return {
        /**
         * 普通文章
         */
        plainArtice: {
          data: [],
          loading: false,
          finished: false,
          beforeData: []
        },
        pullRefreshLoading: false,
      }
    },
    methods: {
      /**
       * 普通文章查询
       */
      plainArticeQuery (params, func) {
        // 判断是否支持EventSource
        if (typeof (EventSource) !== 'undefined') {
          // 长连接方式
          this.plainArticeQueryEvent(params, func)
        } else {
          this.$notify('你的浏览时不支持EventSource将采用传统方式')
          // 如果不支持采用传统的ajax
          this.plainArticeQueryAxios(params, func)
        }
      },
      /**
       * 普通文章查询(axios方式)
       */
      plainArticeQueryAxios (params, func) {
        this.$axios.get(this.url, {
          params: {
            ...params
          }
        })
          .then(res => {
            this.plainArtice.data = _.map(res, item => {
              item.createTime = moment.unix(item.createTime / 1000).format('YYYY-MM-DD')
              return item
            })
            if (_.isFunction(func)) {
              func()
            }
          })
      },
      /**
       * 普通文章查询(EventSource方式)
       */
      plainArticeQueryEvent (params, func) {
        let query = qs.stringify(params)
        let plainArticeSource = new EventSource(this.url + '/SSE?' + query, {
          withCredentials: true
        })
        // 每次返回调用
        plainArticeSource.onmessage = (event) => {
          let data = JSON.parse(event.data)
          // 没有数据的情况
          if (data.flag != null && data.flag === false) {
            plainArticeSource.close()
            if (_.isFunction(func)) {
              func(event)
            }
            return
          }
          data.createTime = moment.unix(data.createTime / 1000).format('YYYY-MM-DD')
          this.plainArtice.data.push(data)
          if (!_.isEmpty(event.lastEventId)) {
            plainArticeSource.close()
            if (_.isFunction(func)) {
              func(event)
            }
          }
        }
      },
      /**
       * 下拉刷新
       */
      onRefresh () {
        this.plainArtice.data = []
        this.query.page = 0
        this.plainArtice.loading = true
        this.plainArtice.finished = false
        this.plainArticeLoad()
      },
      /**
       * 加载普通文章
       */
      plainArticeLoad () {
        this.plainArtice.beforeData = _.clone(this.plainArtice.data)
        this.plainArticeQuery(this.query, (res) => {
          this.pullRefreshLoading = false
          this.plainArtice.loading = false
          this.query.page++
          if (!_.isEmpty(res)) {
            if (this.plainArtice.beforeData.length + this.query.size > this.plainArtice.data.length) {
              this.plainArtice.finished = true
            }
          }
        })
      }
    },
    components: {
      defaultArticle
    }
  }
</script>

<style scoped>

</style>
