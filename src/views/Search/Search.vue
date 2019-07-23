<template xmlns:article="http://www.w3.org/1999/xhtml" xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="search" style="margin-bottom: 50px">
    <van-tabs
      background="#ED6A0C"
      class="title"
      title-active-color="#FFFFFF"
      title-inactive-color="#F2F3F5"
      swipeable
      animated
      lazy-render>
      <van-tab class="search-tab" title="搜索">
      </van-tab>
    </van-tabs>
    <div class="search">
      <form action="/">
        <van-search
          @blur="enableTabllar"
          @focus="disableTabbar"
          :clearable="false"
          shape="round"
          v-model="article.query.searchContent"
          placeholder="请输入搜索关键词"
          show-action
          @search="articleSearch"
          @cancel="searchCancel"
        >
        </van-search>
      </form>
    </div>
    <div class="cotent">
      <articeList
        ref="articeListRef"
        v-show="isSearch"
        url="/api/web/article/search"
        :query="article.query"></articeList>
      <div v-show="!isSearch" style="display:flex; justify-content: center;">
        <h3>请输入你要搜索的内容</h3>
      </div>
    </div>
  </div>
</template>

<script>
    import articeList from '@/components/Article/ArticeList'

    export default {
        name: 'Search',
        data () {
            return {
                article: {
                    query: {
                        page: 0,
                        size: 9,
                        searchContent: '',
                        order: 'weight'
                    }
                },
                isSearch: false
            }
        },
        methods: {
            /**
             * 显示导航栏
             */
            enableTabllar () {
                this.$parent.isOriginHei = true
            },
            /**
             *  隐藏底部导航
             */
            disableTabbar () {
                this.$parent.isOriginHei = false
            },
            /**
             * 文章搜索
             */
            articleSearch () {
                this.isSearch = true
                this.$refs.articeListRef.onRefresh()
            },
            /**
             * 搜索内容清空
             */
            searchCancel () {
                this.isSearch = false
            }
        },
        components: {
            articeList
        }
    }
</script>

<style lang="scss">
  #search {

    .van-tabs__line {
      display: none;

    }
  }
</style>
