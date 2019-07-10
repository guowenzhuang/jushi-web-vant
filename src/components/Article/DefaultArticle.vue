<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div id="default-article" @click="showArticle">
        <van-cell class="plain-article-cell">
            <van-panel>
                <template v-slot:header>
                    <div style="display: flex; justify-content:space-between;">
                        <div class="plain-article-header">
                            <JushiImg
                                    :imgWidth="24"
                                    :imgUrl="article.sysUser.imageUrl"
                                    errorUrl="/img/avatar/defaultAvatar.png"
                            />
                            <div>
                                &nbsp;
                                {{article.sysUser.username}}
                            </div>
                        </div>
                        <div style="float: right;color:#ED6A0C;">
                            {{article.plate.name}}
                        </div>
                    </div>
                </template>
                <template v-slot:default>
                    <div>
                        <div class="plain-article-title">{{article.title}}</div>
                        <div class="van-ellipsis">{{article.cover}}</div>
                    </div>
                </template>
                <template v-slot:footer>
                    <div>
                  <span style="color: #FF976A;">
                    <font-awesome-icon :icon="['far', 'thumbs-up']" size="lg"/>
                  </span>
                        <span>
                    {{article.likeCount==null?0:article.likeCount}}
                  </span>
                        &nbsp;
                        <span style="color: #FF976A;">
                    <font-awesome-icon :icon="['far', 'comment']" size="lg"/>
                  </span>
                        <span>
                    {{article.commentCount==null?0:article.commentCount}}
                  </span>
                    </div>
                </template>
            </van-panel>
        </van-cell>
    </div>
</template>

<script>
  import JushiImg from '@/components/Img/JushiImg'

  export default {
    name: 'defaultArticle',
    props: {
      article: Object
    },
    methods: {
      showArticle () {
        this.$router.push({
          path: '/article',
          query: {
            articleId: this.article.id
          }
        })
      }
    },
    components: {
      JushiImg
    }
  }
</script>

<style lang="scss">
    #default-article {
        .plain-article-title {
            font-weight: bolder
        }

        .plain-article-header {
            padding-top: 1PX;
            display: flex;
            align-items: center
        }

        .van-panel__footer {
            padding: 0;
        }

        [class*="van-hairline"]::after {
            border: none;
        }

        .plain-article-cell {
            margin-top: 1vh;
        }
    }
</style>
