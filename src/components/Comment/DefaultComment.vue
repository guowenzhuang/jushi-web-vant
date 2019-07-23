<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="default-comment" @click="showComment">
    <van-cell class="plain-article-cell">
      <van-panel>
        <template v-slot:header>
          <div style="display: flex; justify-content:space-between;">
            <div class="plain-article-header">
              <div style="display: flex;align-items: center;">
                <JushiImg
                  :imgWidth="30"
                  :imgHeight="30"
                  :imgUrl="comment.sysUser.imageUrl"
                  errorUrl="/img/avatar/defaultAvatar.png"
                />
                &nbsp;
                <span style="line-height: 30px;">
                   {{comment.sysUser.username|userNameFilter(comment.sysUser.id,article)}}
                </span>
                <span style="margin-left: 2px;font-size: 12px">
                                    · {{comment.createTime|createFilter}}
                                </span>
              </div>
            </div>
            <div style="float: right;color:#FF976A;" v-if="isRightIcon">
              <span @click.stop="likeComment" :style="comment | commentLikeColor(user)">
                <font-awesome-icon :icon="['far', 'thumbs-up']" size="lg"/>
                <span>
                     {{comment.likeCount==null?0:comment.likeCount}}
                  </span>
              </span>
              &nbsp;
              <span>
                 <font-awesome-icon :icon="['far', 'comment']" size="lg"/>
              <span>
                    {{comment.commentCount==null?0:comment.commentCount}}
                  </span>
              </span>

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
            <div v-if="comment.commentCount!=null && comment.commentCount>2">
              <a href="javascript:void(0)" style="color:#1989FA">全部{{comment.commentCount==null?0:comment.commentCount}}条回复></a>
            </div>
          </div>
        </template>
      </van-panel>
    </van-cell>
    <div>
    </div>
  </div>
</template>

<script>
    import JushiImg from '@/components/Img/JushiImg'
    import {mapState} from 'vuex'
    import moment from 'moment'
    import dateUtil from '@/util/DateUtil.js'

    export default {
        name: 'DefaultComment',
        props: {
            comment: {
                type: Object,
                default: () => {
                    return {
                        sysUser: {}
                    }
                }
            },
            isRightIcon: {
                type: Boolean,
                default: true
            },
            parent: {
                type: Object,
                default: null
            },
            clickEvent: {
                type: Boolean,
                default: true
            }
        },
        data () {
            return {
                isLikeLoading: false
            }
        },
        computed: {
            ...mapState({
                article: state => state.modules.article,
                user: state => state.modules.user
            })
        },
        methods: {
            likeComment () {
                if (this.isLikeLoading) {
                    this.$toast('点的太快了')
                    return
                }
                if (this.user.info.id == null) {
                    // 未登录
                    this.$dialog.confirm({
                        message: '还没有登录,不能点赞哦',
                        confirmButtonText: '登录',
                        cancelButtonText: '暂不登录'
                    }).then(() => {
                        this.$router.push('/login')
                    }).catch(() => {
                        // on cancel
                    })
                    return
                }
                this.isLikeLoading = true
                this.$axios.post('/api/web/comment/like', {
                    commentId: this.comment.id,
                    userId: this.user.info.id
                }).then(res => {
                    this.isLikeLoading = false
                    if (res.flag) {
                        this.comment.likeCount = this.comment.likeCount == null ? 0 : this.comment.likeCount + 1
                        this.$toast.success(res.message)
                        this.$store.commit('modules/user/addLikeComment', Object.assign({}, this.comment))
                    } else {
                        this.comment.likeCount = this.comment.likeCount == null ? 0 : this.comment.likeCount - 1
                        this.$toast.success(res.message)
                        this.$store.commit('modules/user/removeLikeComment', Object.assign({}, this.comment))
                    }
                })
            },
            showComment () {
                if (this.clickEvent) {
                    this.$router.push({
                        path: '/comment',
                        query: {
                            commentId: this.comment.id
                        }
                    })
                }
            }
        },
        filters: {
            userNameFilter: (username, userId, article) => {
                if (article.details != null && userId === article.details.sysUser.id) {
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
            },
            commentLikeColor: (comment, user) => {
                const color = {
                    color: '#FF976A'
                }
                if (user.info.likeArticles != null && user.info.likeComments != null) {
                    let like = user.info.likeComments.filter(item => {
                        return item.id === comment.id
                    })
                    if (like.length > 0) {
                        color.color = '#1989FA'
                    }
                }
                return color
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
