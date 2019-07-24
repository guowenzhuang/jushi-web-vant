<template>
  <div id="myArticle">
    <van-nav-bar
      title="我的文章"
      left-arrow
      @click-left="$router.back(-1)"
    />
    <articeList url="/api/web/article/pageByUser" :query="plainArtice.query"></articeList>

  </div>
</template>

<script>
    import articeList from '@/components/Article/ArticeList'
    import {mapState} from 'vuex'

    export default {
        name: 'MyArticles',
        data () {
            return {
                /**
                 * 普通文章
                 */
                plainArtice: {
                    query: {
                        page: 0,
                        size: 9,
                        userId: null,
                        order: 'create_time'
                    }
                }
            }
        },
        computed: {
            ...mapState({
                user: state => state.modules.user
            })
        },
        created () {
            if (this.user.info.id == null) {
                this.$router.push('/main/home')
            }
            this.plainArtice.query.userId = this.user.info.id
        },
        components: {
            articeList
        }
    }
</script>

<style scoped>

</style>
