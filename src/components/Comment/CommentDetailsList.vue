<template>
    <div>
        <transition-group name="van-slide-left">
            <div
                    @click.capture.stop="showCommentFocus(item)"
                    :key="item.id"
                    v-for="(item) in childComment">

                <defaultComment
                        ref="commenetRef"
                        :parent="comment"
                        :comment="item"

                />
                <CommentDetailsList
                        ref="commentDetailsRef"
                        v-if="item.children!=null"
                        :comment="item"
                        :childComment="item.children"
                />
            </div>

        </transition-group>
    </div>
</template>

<script>
  import _ from 'lodash'
  import defaultComment from '@/components/Comment/DefaultComment'

  export default {
    name: 'CommentDetailsList',
    props: {
      comment: Object,
      childComment: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        /**
         * 子级评论详情
         */
        pullRefreshLoading: false
      }
    },
    methods: {
      /**
       * 调用评论输入框
       */
      showCommentFocus (parent) {
        this.$parent.showCommentFocus(parent)
      },
      // 增加一条评论数据
      pushComment (comment) {
        // FIXME 如果是回复的孙子级别会显示回复祖先级别
        // FIXME 因为他之会推动到直属级别
        // this.childComment.unshift(comment)
      },
      /**
       * 子级评论查询
       */
      childCommentQuery (func) {
        if (this.childComment.length > 0) {
          return
        }
        // 判断是否支持EventSource
        if (typeof (EventSource) !== 'undefined') {
          // 长连接方式
          this.childCommentQueryEvent(func)
        } else {
          this.$notify('你的浏览时不支持EventSource将采用传统方式')
          // 如果不支持采用传统的ajax
          this.childCommentQueryAxios(func)
        }
      },
      /**
       * 子级评论查询(EventSource方式)
       */
      childCommentQueryEvent (func) {
        let childCommentSource = new EventSource('/api/web/comment/commentDetails/SSE/' + this.comment.id, {
          withCredentials: true
        })
        // 每次返回调用
        childCommentSource.onmessage = (event) => {
          let data = JSON.parse(event.data)
          // 没有数据的情况
          if (data.flag != null && data.flag === false) {
            childCommentSource.close()
            if (_.isFunction(func)) {
              func(event)
            }
            return
          }
          this.childComment.push(data)
          if (!_.isEmpty(event.lastEventId)) {
            childCommentSource.close()
            if (_.isFunction(func)) {
              func(event)
            }
          }
        }
      },
      /**
       * 子级评论查询(axios方式)
       */
      childCommentQueryAxios (func) {
        this.$axios.get('/api/web/comment/commentDetails/' + this.comment.id)
          .then(res => {
            this.childComment = res
            if (_.isFunction(func)) {
              func()
            }
          })
      }
    },
    created () {
      this.childCommentQuery()
    },
    components: {
      defaultComment
    }
  }
</script>

<style scoped>

</style>
