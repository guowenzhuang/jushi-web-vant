<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div id="default-comment" @click="showComment">
        <van-cell class="plain-article-cell">
            <van-panel>
                <template v-slot:header>
                    <div style="display: flex; justify-content:space-between;">
                        <div class="plain-article-header">
                            <div>
                                <JushiImg
                                        :imgWidth="30"
                                        :imgUrl="comment.sysUser.imageUrl"
                                        errorUrl="/img/avatar/defaultAvatar.png"
                                />
                                {{comment.sysUser.username|userNameFilter(comment.sysUser.id,article)}}
                                <span style="margin-left: 2px;font-size: 12px">
                                    · {{comment.createTime|createFilter}}
                                </span>
                            </div>
                        </div>
                        <div style="float: right;color:#ED6A0C;" v-if="isRightIcon">
                            <font-awesome-icon :icon="['far', 'thumbs-up']" size="lg"/>
                            &nbsp;
                            <font-awesome-icon :icon="['far', 'comment']" size="lg"/>
                        </div>
                    </div>
                </template>
                <template v-slot:default>
                    <div style="margin-top: 8px;padding-top:5px;display: flex;">
                        <div v-if="parent!=null">
                            回复 <a href="javascript:void(0)" style="color: #1989FA">
                            {{parent.sysUser.username}}：
                        </a>
                        </div>
                        <div class="van-ellipsis" v-html="comment.content"></div>
                    </div>
                </template>
                <template v-slot:footer>
                    <div class="childComment" v-if="comment.popularChildren!=null">
                        <div v-for="child in comment.popularChildren" :key="child.id">
                            <div style="display: flex;">
                                {{child.sysUser.username|userNameFilter(child.sysUser.id,article)}}：
                                <div v-if="child.replyUser!=null">
                                    回复 <a href="javascript:void(0)" style="color: #1989FA">
                                    {{child.replyUser.username}}：
                                </a>
                                </div>
                                <div style="color:#7D7E80 " v-html="child.content"></div>
                            </div>
                        </div>
                    </div>
                </template>
            </van-panel>
        </van-cell>
    </div>
</template>

<script>
  import JushiImg from '@/components/Img/JushiImg'
  import { mapState } from 'vuex'
  import moment from 'moment'
  import dateUtil from '@/util/DateUtil.js'

  export default {
    name: 'DefaultComment',
    props: {
      comment: Object,
      isRightIcon: {
        type: Boolean,
        default: true
      },
      parent: {
        type: Object,
        default: null
      }
    },
    computed: {
      ...mapState({
        article: state => state.modules.article
      })
    },
    methods: {
      showComment () {
        this.$router.push({
          path: '/comment',
          query: {
            commentId: this.comment.id
          }
        })
      }
    },
    filters: {
      userNameFilter: (username, userId, article) => {
        if (userId === article.details.sysUser.id) {
          return username + '(作者)'
        }
        return username
      },
      createFilter: (time) => {
        if (time != null) {
          const date = moment.unix(time / 1000).format('YYYY-MM-DD HH:mm:ss')
          return dateUtil.timeDifferenceToContent(date)
        }
        return ''

      }
    },

    components: {
      JushiImg
    }
  }
</script>

<style scoped>
    .childComment {
        font-size: 12px;
        background-color: #F2F3F5;
        padding: 5px 12px;
    }
</style>
