<template>
    <div id="issueArticle">
        <van-nav-bar
                title="发表文章"
                left-arrow
                @click-left="$router.back(-1)"
        />
        <div style="margin: 10px 0 0 0" class="webfont">
            <van-row type="flex" style="margin-top: 10px;">
                <van-col>
                    <span style="font-size: 18px">文章标题:</span>
                </van-col>
            </van-row>
            <van-row type="flex" justify="center">
                <van-field v-model="article.title" placeholder="请输入标题 6-50 字符"/>
            </van-row>
            <van-row type="flex" style="margin-top: 10px;">
                <van-col>
                    <span style="font-size: 18px">文章内容:</span>
                </van-col>
            </van-row>
            <van-row type="flex">
                <van-col>
                    <vue-html5-editor :content="article.content" :height="400"
                                      @change="updateData"></vue-html5-editor>
                </van-col>
            </van-row>
            <van-row type="flex">
                <van-col span="24">
                    <van-button type="info" @click="selectPlate" block>发表文章</van-button>
                </van-col>
            </van-row>
            <van-action-sheet
                    @select="plateselect"
                    v-model="actionSheet.show"
                    :actions="actionSheet.actions"
            />
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'IssueArticle',
    data () {
      return {
        article: {
          title: '',
          content: '',
          plateId: '',
          userId: '',
          // FIXME 文章是否公开 需要改成可以选择 私密或公开
          isPublic: true
        },
        actionSheet: {
          show: false,
          actions: []
        }
      }
    },
    computed: {
      ...mapState({
        user: state => state.modules.user
      })
    },
    methods: {
      /**
       * 更改富文本编辑器内容
       * @param e
       */
      updateData (e = '') {
        this.article.content = e
        console.log('e', e)
      },
      /**
       * 加载板块信息
       */
      selectPlate () {
        // 校验
        if (this.article.title.length < 6 || this.article.title.length > 50) {
          this.$toast('文章标题内容长度在6-50之间')
          return
        }
        // 选择板块
        // 未加载板块
        if (this.actionSheet.actions.length === 0) {
          this.$axios.get('/api/web/plate/querySort')
            .then(res => {
              this.actionSheet.actions = res
              this.$toast('请选择所属板块')
              this.actionSheet.show = true
            })
        } else {
          // 已加载板块
          this.$toast('请选择所属板块')
          this.actionSheet.show = true
        }
      },
      /**
       * 板块选择
       */
      plateselect (item) {
        this.$dialog.confirm({
          message: `确定选择板块: ${item.name} 吗?`
        }).then(() => {
          this.article.plateId = item.id
          this.actionSheet.show = false
          this.issueArticle()
        }).catch(() => {
          this.actionSheet.show = false
        })
      },
      /**
       * 发表文章
       */
      issueArticle () {
        this.article.userId = this.user.info.id
        this.$axios({
          url: '/api/web/article/issueArticle',
          method: 'post',
          data: {
            ...this.article
          }
        }).then(res => {
          if (res.flag) {
            this.$dialog.alert({
              message: res.message
            }).then(() => {
              this.$router.back(-1)
            })
          } else {
            this.$toast(res.message)
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
