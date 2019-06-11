<template>
  <div id="app">
    <router-view/>
    <van-tabbar v-model="tabActive" route>
      <van-tabbar-item name="home" to="/home">
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active?tabBarIcon['home-select']:tabBarIcon.home"
        >
      </van-tabbar-item>
      <van-tabbar-item name="plate" to="/plate">
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active?tabBarIcon['plate-select']:tabBarIcon.plate"
        >
      </van-tabbar-item>
      <van-tabbar-item name="search" to="/search">
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active?tabBarIcon['search-select']:tabBarIcon.search"
        >
      </van-tabbar-item>
      <van-tabbar-item name="me" to="/me">
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active?tabBarIcon['me-select']:tabBarIcon.me"
        >
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
  export default {
    name: 'App',
    data () {
      return {
        tabActive: 0,
        tabBarIcon: {
          'home': 'http://psgrfzlre.bkt.clouddn.com/image/tabbar/home.png',
          'plate': 'http://psgrfzlre.bkt.clouddn.com/image/tabbar/plate.png',
          'search': 'http://psgrfzlre.bkt.clouddn.com/image/tabbar/search.png',
          'me': 'http://psgrfzlre.bkt.clouddn.com/image/tabbar/me.png',
          'home-select': 'http://psgrfzlre.bkt.clouddn.com/image/tabbar/home-select.png',
          'plate-select': 'http://psgrfzlre.bkt.clouddn.com/image/tabbar/plate-select.png',
          'search-select': 'http://psgrfzlre.bkt.clouddn.com/image/tabbar/search-select.png',
          'me-select': 'http://psgrfzlre.bkt.clouddn.com/image/tabbar/me-select.png'
        }
      }
    },
    methods: {}
  }
</script>
