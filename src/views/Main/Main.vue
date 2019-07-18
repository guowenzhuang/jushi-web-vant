<template>
    <div id="main">
        <router-view/>
        <van-tabbar v-model="tabActive" route fixed v-show="isOriginHei">
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
        tabActive: 'home',
        // 这里是给到了一个默认值 （这个很重要），
        screenHeight: document.body.clientHeight,
        // 默认高度在watch里拿来做比较
        originHeight: document.body.clientHeight,
        // 这个属性是固定定位按钮的显隐开关
        isOriginHei: true
      }
    },
    watch: {
      screenHeight (val) {
        if (this.originHeight === val) {
          this.isOriginHei = true
        }
      }
    },
    methods: {},
    created () {
    },
    mounted () {
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenHeight = document.body.clientHeight
          that.screenHeight = window.screenHeight
        })()
      }
    }
  }
</script>
