<template>
    <div>
        <van-list
                :offset="30"
                @load="plainCommentLoad"
                loading-text="加载中"
                v-model="plainComment.loading"
                :finished="plainComment.finished"
                :finished-text="plainComment.data.length==0?'暂无评论':'亲,已经到底部了哦'"
        >
            <transition-group name="van-slide-left">
                <defaultComment
                        :comment="item"
                        :key="item.id"
                        v-for="(item) in plainComment.data"/>
            </transition-group>
        </van-list>
    </div>
</template>

<script>
  import defaultComment from '@/components/Comment/DefaultComment'
  import _ from 'lodash'
  import qs from 'qs'
  import moment from 'moment'
  import dateUtil from '@/util/DateUtil.js'

  export default {
    name: 'CommentList',
    props: {
      url: String,
      query: Object
    },
    data () {
      return {
        /**
         * 普通文章
         */
        plainComment: {
          // 最新data
          data: [],
          loading: false,
          finished: false,
          // 这一次请求之前的data
          beforeData: []
        },
        pullRefreshLoading: false
      }
    },
    methods: {
      // 增加一条评论数据
      pushComment (comment) {
        this.plainComment.data.unshift(comment)
      },
      /**
       * 加载评论
       */
      plainCommentLoad () {
        this.plainComment.beforeData = _.clone(this.plainComment.data)
        this.plainCommentQuery(this.query, (res) => {
          this.plainComment.loading = false
          this.query.page++
          if (!_.isEmpty(res)) {
            if (this.plainComment.beforeData.length + this.query.size > this.plainComment.data.length) {
              this.plainComment.finished = true
            }
          }
        })
      },
      /**
       * 普通评论查询
       */
      plainCommentQuery (params, func) {
        // 判断是否支持EventSource
        if (typeof (EventSource) !== 'undefined') {
          // 长连接方式
          this.plainCommentQueryEvent(params, func)
        } else {
          this.$notify('你的浏览时不支持EventSource将采用传统方式')
          // 如果不支持采用传统的ajax
          this.plainCommentQueryAxios(params, func)
        }
      },
      /**
       * 普通评论查询(axios方式)
       */
      plainCommentQueryAxios (params, func) {
        this.$axios.get(this.url, {
          params: {
            ...params
          }
        })
          .then(res => {
            this.plainArtice.data = res
            if (_.isFunction(func)) {
              func()
            }
          })
      },
      /**
       * 普通评论查询(EventSource方式)
       */
      plainCommentQueryEvent (params, func) {
        let query = qs.stringify(params)
        let plainCommentSource = new EventSource(this.url + '/SSE?' + query, {
          withCredentials: true
        })
        // 每次返回调用
        plainCommentSource.onmessage = (event) => {
          let data = JSON.parse(event.data)
          // 没有数据的情况
          if (data.flag != null && data.flag === false) {
            plainCommentSource.close()
            if (_.isFunction(func)) {
              func(event)
            }
            return
          }
          this.plainComment.data.push(data)
          if (!_.isEmpty(event.lastEventId)) {
            plainCommentSource.close()
            if (_.isFunction(func)) {
              func(event)
            }
          }
        }
      }
    },
    components: {
      defaultComment
    }
  }
</script>

<style scoped>

</style>
