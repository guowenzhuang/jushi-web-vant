<template>
    <div id="main">
        <router-view/>
        <van-tabbar v-model="tabActive" route fixed>
            <van-tabbar-item name="home" to="/main/home">
                首页
                <van-icon
                        slot="icon"
                        class-prefix='jushi-icon' name="home"
                />
            </van-tabbar-item>
            <van-tabbar-item name="plate" to="/main/plate"> 板块
              <van-icon
                      slot="icon"
                      class-prefix='jushi-icon' name="wodebankuai"
              />
            </van-tabbar-item>
            <van-tabbar-item name="search" to="/main/search"> 搜索
              <van-icon
                      slot="icon"
                      class-prefix='jushi-icon' name="xiaoxi-"
              />
            </van-tabbar-item>

            <van-tabbar-item name="me" to="/main/me"> 我的
              <van-icon
                      slot="icon"
                      class-prefix='jushi-icon' name="me"
              />
            </van-tabbar-item>

        </van-tabbar>
    </div>
</template>
<script>
  export default {
    name: 'App',
    data () {
      return {
        tabActive: 'home'
      }
    },
    methods: {},
    created () {
    }
  }
</script>
