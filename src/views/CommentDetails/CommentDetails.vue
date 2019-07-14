<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div id="commentDetails" style="height: 100%">
        <van-nav-bar
                title="评论详情页"
                left-arrow
                @click-left="$router.back(-1)"
        />
        <div @click="disableComment" style="padding: 10px 8px 0 8px;height: 100%">
            <defaultComment :isRightIcon="false" :comment="commentAncestor"/>
            <div style="margin: 12px 0 44px;">
                <commentDetailsList
                        ref="commentRef"
                        v-if="commentAncestor.id!=null"
                        class="commentContent"
                        :comment="commentAncestor"></commentDetailsList>
            </div>
        </div>
        <div
                class="fixedComment">
            <van-row type="flex" justify="center" align="center">
                <van-col :span="commentLeftSpan">
                    <van-row type="flex" align="center">
                        <van-col v-show="isComment">
                            <van-icon @click.stop="showEmoji" :name="emojiIcon" size="20"/>
                        </van-col>
                        <van-col span="24">
                            <form action="/">
                                <van-search
                                        ref="commentInputRef"
                                        @focus="enableComment"
                                        :clearable="false"
                                        shape="round"
                                        v-model="comment.content"
                                        placeholder="请输入评论"
                                        @search="commentEnter"
                                >
                                    <template v-slot:left-icon>
                                        <span></span>
                                    </template>
                                </van-search>
                            </form>
                        </van-col>
                    </van-row>
                </van-col>
                <van-col :span="commentRightSpan" v-show="!isComment">
                    <van-row type="flex" justify="end" align="center">
                        <van-col span="8" style="color: #FF976A;">
                            <font-awesome-icon style="font-size: 22px" :icon="['far', 'thumbs-up']"/>
                            <span>
                {{commentAncestor.likeCount==null?0:commentAncestor.likeCount}}
              </span>
                        </van-col>
                        <van-col span="8" style="color: #FF976A;">
                            <font-awesome-icon style="font-size: 22px" :icon="['far', 'comment']" size="lg"/>
                            <span>
                {{commentAncestor.commentCount==null?0:commentAncestor.commentCount}}
              </span>
                        </van-col>
                    </van-row>
                </van-col>
                <van-col :span="commentRightSpan" v-show="isComment" style="height: 100%;">
                    <van-row type="flex" justify="space-around" align="center">
                        <van-col span="12" style="color: #ED6A0C;">
                            <font-awesome-icon style="font-size: 22px" @click="commentEnter"
                                               :icon="['far', 'paper-plane']"
                                               size="lg"/>
                        </van-col>
                    </van-row>
                </van-col>
            </van-row>
            <div>
                <VEmojiPicker :pack="pack" @select="selectEmoji" :style="{display: emojiDisplay}"/>
            </div>
        </div>

    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import JushiImg from '@/components/Img/JushiImg'
  import defaultComment from '@/components/Comment/DefaultComment'
  import commentDetailsList from '@/components/Comment/CommentDetailsList'
  // emoji表情插件
  import VEmojiPicker from 'v-emoji-picker'
  import packData from 'v-emoji-picker/data/emojis.json'

  export default {
    name: 'CommentDetails',
    data () {
      return {
        commentAncestor: {
          sysUser: {}
        },
        comment: {
          // 评论内容
          content: '',
          // 祖先评论id
          ancestorId: '',
          // 父级评论id
          parentId: ''
        },
        pack: packData,
        emojiDisplay: 'none',
        emojiIcon: 'smile-o',
        // 是否评论 (评论显示状态控制)
        isComment: false,
        commentLeftSpan: 13,
        commentRightSpan: 11,
      }
    },
    computed: {
      ...mapState({
        user: state => state.modules.user
      })
    },
    methods: {
      /**
       * 评论回车
       */
      commentEnter () {
        if (this.user.info.id == null) {
          // 未登录
          this.$dialog.confirm({
            message: '抱歉你还没有登录,不能发起评论',
            confirmButtonText: '登录',
            cancelButtonText: '暂不登录'
          }).then(() => {
            this.$router.push('/login')
          }).catch(() => {
            // on cancel
          })
          return
        }
        const userId = this.user.info.id
        const articleId = this.commentAncestor.article.id
        this.$axios.post('/api/web/comment/issueComment', {
          articleId: articleId,
          sysUserId: userId,
          ...this.comment

        }).then(res => {
          if (res.flag) {
            this.comment.content = ''
            this.$toast.success('评论成功')
            res.data.sysUser.username = this.user.info.username
            this.$refs.commentRef.pushComment(res.data)
          } else {
            this.$toast.fail(res.message)
          }
        })
      },
      selectEmoji (emoji) {
        this.comment.content += emoji.emoji
      },
      /**
       * 弹起表情选择
       */
      showEmoji () {
        if (this.emojiIcon === 'smile-o') {
          this.emojiDisplay = 'inline-flex'
          this.emojiIcon = 'other-pay'
        } else {
          this.emojiDisplay = 'none'
          this.emojiIcon = 'smile-o'
        }
      },
      /**
       * 开启评论显示
       */
      enableComment () {
        this.isComment = true
        this.commentLeftSpan = 18
        this.commentRightSpan = 5
      },
      /**
       * 关闭讨论状态显示
       */
      disableComment () {
        this.isComment = false
        this.commentLeftSpan = 13
        this.commentRightSpan = 11
        this.emojiDisplay = 'none'
        this.emojiIcon = 'smile-o'
        this.comment.parentId = this.$route.query.commentId
      },
      /**
       * 获取焦点评论框
       */
      showCommentFocus (parentId) {
        this.comment.parentId = parentId
        document.querySelector('.van-field__control').focus()
        // 获取搜索里的input框
        // this.$refs.commentInputRef.childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].focus()
      }
    },
    created () {
      const commentId = this.$route.query.commentId
      this.comment.ancestorId = commentId
      this.comment.parentId = commentId
      this.$axios.get(`/api/web/comment/${commentId}`)
        .then(res => {
          this.commentAncestor = res
        })
    },
    components: {
      JushiImg,
      VEmojiPicker,
      defaultComment,
      commentDetailsList
    }
  }
</script>

<style lang="scss">
    .fixedComment {
        position: fixed;
        bottom: 0;
        padding: 0px 0px 0px 8px;
        background-color: rgb(255, 255, 255);
        width: 100%;
        display: block;
        color: #ED6A0C;

        .van-search {
            border-radius: 100PX;
            background-color: #F2F3F5;
            padding: 5px 5px;
        }
    }
</style>
