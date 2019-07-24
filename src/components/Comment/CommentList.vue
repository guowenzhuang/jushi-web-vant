<template>
  <div style="margin-bottom: 30px;">
    <van-pull-refresh
      v-model="pullRefreshLoading"
      success-text="加载成功"
      @refresh="onRefresh"
      style="margin-bottom: 20px">
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
    </van-pull-refresh>
  </div>
</template>

<script>
    import defaultComment from '@/components/Comment/DefaultComment'
    import _ from 'lodash'
    import qs from 'qs'

    export default {
        name: 'CommentList',
        props: {
            url: String,
            query: Object
        },
        data () {
            return {
                /**
                 * 普通评论
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
            /**
             * 下拉刷新
             */
            onRefresh () {
                this.plainComment.data = []
                this.query.page = 0
                this.plainComment.loading = true
                this.plainComment.finished = false
                this.plainCommentLoad()
            },
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
                    this.pullRefreshLoading = false
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
                this.$eventSource(this.url + '/SSE', params,func, (event, source) => {
                    let data = JSON.parse(event.data)
                    this.plainComment.data.push(data)
                })
            }
        },
        components: {
            defaultComment
        }
    }
</script>

<style scoped>

</style>
