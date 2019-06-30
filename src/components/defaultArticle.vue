<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div id="default-article">
        <van-cell class="plain-article-cell">
            <van-panel>
                <template v-slot:header>
                    <div style="display: flex; justify-content:space-between;">
                        <div class="plain-article-header">
                            <van-image
                                    width="24"
                                    lazy-load
                                    :src="article.sysUser.imageUrl"
                            >
                                <template v-slot:error>
                                    <van-image
                                            width="24"
                                            src="https://i.loli.net/2019/06/26/5d12e7ea69d6285534.png"
                                    >
                                        <template v-slot:loading>
                                            <van-loading type="spinner" size="20"/>
                                        </template>
                                    </van-image>
                                </template>
                            </van-image>
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
  export default {
    name: 'defaultArticle',
    props: {
      article: null
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
