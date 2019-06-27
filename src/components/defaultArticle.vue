<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div id="default-article">
        <van-cell class="plain-artice-cell">
            <van-panel>
                <template v-slot:header>
                    <div style="display: flex; justify-content:space-between;">
                        <div class="plain-artice-header">
                            <van-image
                                    width="24"
                                    lazy-load
                                    :src="artice.sysUser.imageUrl"
                            >
                                <template slot="error">
                                    <van-image
                                            width="24"
                                            src="https://i.loli.net/2019/06/26/5d12e7ea69d6285534.png"
                                    >
                                        <template slot="loading">
                                            <van-loading type="spinner" size="20"/>
                                        </template>
                                    </van-image>
                                </template>
                            </van-image>
                            <div>
                                &nbsp;
                                {{artice.sysUser.username}}
                            </div>
                        </div>
                        <div style="float: right;color:#ED6A0C;">
                            {{artice.plate.name}}
                        </div>
                    </div>
                </template>
                <template v-slot:default>
                    <div>
                        <div class="plain-artice-title">{{artice.title}}</div>
                        <div class="van-ellipsis">{{artice.cover}}</div>
                    </div>
                </template>
                <template v-slot:footer>
                    <div>
                  <span style="color: #FF976A;">
                    <font-awesome-icon :icon="['far', 'thumbs-up']" size="lg"/>
                  </span>
                        <span>
                    {{artice.likeCount==null?0:artice.likeCount}}
                  </span>
                        &nbsp;
                        <span style="color: #FF976A;">
                    <font-awesome-icon :icon="['far', 'comment']" size="lg"/>
                  </span>
                        <span>
                    {{artice.commentCount==null?0:artice.commentCount}}
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
      artice: null
    }
  }
</script>

<style lang="scss">
    #default-article {
        .plain-artice-title {
            font-weight: bolder
        }

        .plain-artice-header {
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

        .plain-artice-cell {
            margin-top: 1vh;
        }
    }
</style>
