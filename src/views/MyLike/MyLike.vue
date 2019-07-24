<template>
  <div>
    <van-nav-bar
      title="我赞过的"
      left-arrow
      @click-left="$router.back(-1)"
    />
    <van-tabs v-model="likeActive">
      <van-tab title="文章">
        <transition-group name="van-slide-left">
          <defaultArticle
            :article="item"
            :key="item.id"
            v-for="(item) in user.info.likeArticles"/>
        </transition-group>
      </van-tab>
      <van-tab title="评论">
        <transition-group name="van-slide-left">
          <defaultComment
            :comment="item"
            :key="item.id"
            v-for="(item) in user.info.likeComments"/>
        </transition-group>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
    import {mapState} from 'vuex'
    import defaultArticle from '@/components/Article/DefaultArticle'
    import defaultComment from '@/components/Comment/DefaultComment'

    export default {
        name: 'MyLike',
        data () {
            return {
                likeActive: 0
            }
        },
        computed: {
            ...mapState({
                user: state => state.modules.user
            })
        },
        components: {
            defaultArticle,
            defaultComment
        }
    }
</script>

<style scoped>

</style>
