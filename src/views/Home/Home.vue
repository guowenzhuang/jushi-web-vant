<template>
    <div id="home">
        <van-tabs type="card" class="title">
            <van-tab title="首页">
                <van-swipe :autoplay="3000">
                    <van-swipe-item class="swipeItem" v-for="(image, index) in homeSwipes" :key="index">
                        <img v-lazy="image" class="homeImage"/>
                    </van-swipe-item>
                </van-swipe>
            </van-tab>
        </van-tabs>
        <van-list
                v-model="plainArtice.loading"
                :finished="plainArtice.finished"
                finished-text="没有更多了"
        >
            <van-panel :title="item.title"  :desc="item.sysUserPO.username" :status="item.platePO.name" :key="item.id" v-for="item in plainArtice.data">
                <h1>{{item.cover}}</h1>
            </van-panel>
        </van-list>
    </div>
</template>

<script>
  export default {
    name: 'Home',
    data () {
      return {
        /**
         * 普通文章
         */
        plainArtice: {
          data: [],
          loading: false,
          finished: true,
          page: 0,
          size: 10
        },
        homeSwipes: [
          'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
          'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
          'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg'
        ]
      }
    },
    created () {
      this.$axios.post('/api/article/articleHomePage', {
        page: this.plainArtice.page,
        size: this.plainArtice.size,
      })
        .then(res => {
          this.plainArtice.data = res
        })
    }
  }
</script>

<style lang="scss">

    #home {
        .title {
            .van-tabs__nav--card {
                margin: 0;
            }

            .swipeItem {
                text-align: center;

                .homeImage {
                    height: 25vh;
                }
            }
        }
    }
</style>
