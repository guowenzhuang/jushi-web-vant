<template>
    <div id="plate" style="margin-bottom: 50px">
        <van-tabs
                @change="plateChange"
                background="#ED6A0C"
                class="title"
                title-active-color="#FFFFFF"
                title-inactive-color="#F2F3F5"
                swipeable
                animated
                lazy-render>
            <van-tab class="plate-tab" v-for="plate in plates" :key="plate.id"
                     :title="plate.name">
                <div style="color: red">
                    <articeList url="/api/web/article/queryPageByPlate" :query="article.query"></articeList>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
  import articeList from '@/components/Article/ArticeList'

  export default {
    name: 'Plate',
    data () {
      return {
        plates: [],
        article: {
          query: {
            page: 0,
            size: 9,
            plateId: '',
            order: 'weight'
          }
        }
      }
    },
    methods: {
      /**
       * 板块查询
       * @param func
       */
      plateQuery () {
        this.$axios.get('/api/web/plate/querySort')
          .then(res => {
            this.plates = res
            this.plateChange(0, res[0].name)
          })
      },
      /**
       * 板块更改事件
       */
      plateChange (index, title) {
        this.article.query.page = 0
        this.article.query.plateId = this.plates[index].id
      }
    },
    created () {
      this.plateQuery()
    },
    components: {
      articeList
    }
  }
</script>

<style lang="scss">
    #plate {
        .van-tabs__line {
            background-color: #ffffff;
        }

        .plate-tab {
            color: #ffffff
        }
    }
</style>
