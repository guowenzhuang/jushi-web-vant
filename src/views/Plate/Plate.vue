<template>
    <div id="plate">
        <van-tabs
                background="#ED6A0C"
                class="title"
                title-active-color="#FFFFFF"
                title-inactive-color="#F2F3F5"
                swipeable
                animated
                lazy-render>
            <van-tab style="color:#ffffff" v-for="plate in plates" :key="plate.id" :title="plate.name">
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
  export default {
    name: 'Plate',
    data () {
      return {
        plates: []
      }
    },
    methods: {
      plateQuery () {
        this.$axios.get('/api/article/plate')
          .then(res => {
            this.plates = res
          })
      }
    },
    created () {
      this.plateQuery()
    }
  }
</script>

<style lang="scss">
    .title {

    }
</style>
