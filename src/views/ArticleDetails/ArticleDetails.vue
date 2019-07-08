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
          <!--
                              <van-field  v-model="comment.content" placeholder="请输入评论"/>
          -->
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
    </div>
  </div>
</template>

<script>
  import JushiImg from '@/components/Img/JushiImg'

  // emoji表情插件
  // import VEmojiPicker from 'v-emoji-picker'
  // import packData from 'v-emoji-picker/data/emojis.json'

  export default {
    name: 'ArticleDetails',
    data () {
      return {
        article: {
          sysUser: {}
        },
        comment: {
          content: ''
        }
      }
    },
    methods: {
      /**
       * 评论回车
       */
      commentEnter () {
        console.log(this.comment.content)

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
      JushiImg
      // emoji表情插件 以后要用到
      // VEmojiPicker
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
