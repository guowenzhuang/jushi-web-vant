<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="default-article" @click="showArticle">
    <van-cell class="plain-article-cell">
      <van-panel>
        <template v-slot:header>
          <div style="display: flex; justify-content:space-between;">
            <div class="plain-article-header">
              <JushiImg
                :imgWidth="30"
                :imgHeight="30"
                :imgUrl="article.sysUser.imageUrl"
                errorUrl="/img/avatar/defaultAvatar.png"
              />
              <div>
                &nbsp;
                <span style="line-height: 30px;">                {{article.sysUser.username}}
              </span>
              </div>
            </div>
            <div style="float: right;color:#ED6A0C;">
              {{article.plate.name}}
            </div>
          </div>
        </template>
        <template v-slot:default>
          <div>
            <van-row type="flex" justify="space-between">
              <van-col class="van-ellipsis plain-article-content">
                <div class="plain-article-title">{{article.title}}</div>
                <div>
                  {{article.content|articleContentFilter}}
                </div>
              </van-col>
              <van-col v-if="article.isImage">
                <img :src="article.content|articleImgFilter" style="width: 70px;height: 70px;">
              </van-col>
            </van-row>

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
        filters: {
            articleImgFilter: (content) => {
                const imgReg = /<img.*?(?:>|\/>)/
                var img = content.match(imgReg)[0]
                let oDiv = document.createElement('div')
                oDiv.innerHTML = img
                return oDiv.childNodes[0].currentSrc
            },
            articleContentFilter: (content) => {
                let oDiv = document.createElement('div')
                oDiv.innerHTML = content
                let text = oDiv.innerText
                return text
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

    .plain-article-content {
      font-size: 13px;
      white-space: normal;
      /*设置成弹性盒子 */
      display: -webkit-box;
      /*显示的个数 */
      -webkit-line-clamp: 2;
      /* 属性规定框的子元素应该被水平或垂直排列。 */
      -webkit-box-orient: vertical;
    }
  }
</style>
