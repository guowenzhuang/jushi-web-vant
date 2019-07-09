<template xmlns:v-solt="http://www.w3.org/1999/xhtml" xmlns:v-slot="http://www.w3.org/1999/xhtml">
    <div id="articleDetails">
        <van-nav-bar
                title="文章详情页"
                left-arrow
                @click-left="$router.back(-1)"
        />
        <div style="padding: 10px 8px 0 8px;" class="webfont">
            <van-row type="flex" gutter="8">
                <van-col>
                    <JushiImg
                            imgFit="fill"
                            imgWidth="30"
                            :imgUrl="article.sysUser.imageUrl"
                            errorUrl="/img/avatar/defaultAvatar.png"
                    />
                </van-col>
                <van-col>
                    <div>
                        <span>{{article.sysUser.username}}</span>
                    </div>
                </van-col>
            </van-row>
            <van-row type="flex" gutter="8">
                <van-col>
                    <p style="font-size: 30px;">
                        {{article.title}}
                    </p>
                </van-col>
            </van-row>
            <van-row type="flex" gutter="8">
                <van-col>
                    <p v-html="article.content">
                    </p>
                </van-col>
            </van-row>
        </div>
        <van-row type="flex" gutter="8" style="background-color: rgb(255,255,255);margin: 8px 0 0 0;">

        </van-row>
        <div class="fixedComment">
            <van-row>
                <van-col span="13">
                    <van-row type="flex" align="center">
                        <van-col span="3">
                            <van-icon @click="showEmoji" :name="emojiIcon" size="20"/>
                        </van-col>
                        <van-col span="21">
                            <form action="/">
                                <van-search
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
                <van-col span="11">
                    <van-row type="flex" justify="end" align="center">
                        <van-col span="8" style="color: #FF976A;margin-top: 5px">
                            <font-awesome-icon style="font-size: 22px" :icon="['far', 'thumbs-up']"/>
                            <span>
                               {{article.likeCount==null?0:article.likeCount}}
                            </span>
                        </van-col>
                        <van-col span="8" style="color: #FF976A;margin-top: 5px">
                            <font-awesome-icon style="font-size: 22px" :icon="['far', 'comment']" size="lg"/>
                            <span>
                {{article.commentCount==null?0:article.commentCount}}
              </span>
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
  import JushiImg from '@/components/Img/JushiImg'
  import { mapState } from 'vuex'

  // emoji表情插件
  import VEmojiPicker from 'v-emoji-picker'
  import packData from 'v-emoji-picker/data/emojis.json'

  export default {
    name: 'ArticleDetails',
    data () {
      return {
        article: {
          sysUser: {}
        },
        comment: {
          content: ''
        },
        pack: packData,
        emojiDisplay: 'none',
        emojiIcon: 'smile-o'
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
        if (this.user.info == null) {
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
        }
        let content = this.comment.content
        const userId = this.user.info.id
        const articleId = this.article.id
        this.$axios.post('/api/web/comment/issueComment', {
          articleId: articleId,
          sysUserId: userId,
          content: content
        }).then(res => {
          this.comment.content = ''
          this.$toast.success('评论成功')
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

      }
    },
    created () {
      const articleId = this.$route.query.articleId
      this.$axios.get(`/api/web/article/${articleId}`)
        .then(res => {
          this.article = res
        })
    },
    components: {
      JushiImg,
      // emoji表情插件 以后要用到
      VEmojiPicker
    }
  }
</script>

<style lang="scss">
    .fixedComment {
        position: fixed;
        bottom: 0;
        padding: 8px 20px 8px 8px;
        background-color: rgb(255, 255, 255);
        width: 100%;

        .van-search {
            border-radius: 100PX;
            background-color: #F2F3F5;
            padding: 5px 5px;
        }
    }
</style>
