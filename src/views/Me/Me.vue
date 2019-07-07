<template>
    <div id="me">
        <van-tabs
                background="#ED6A0C"
                class="title"
                title-active-color="#FFFFFF"
                title-inactive-color="#F2F3F5"
                swipeable
                animated
                lazy-render>
            <van-tab title="我">
            </van-tab>
        </van-tabs>
        <van-list>
            <div  @click="userClick">
                <van-row  type="flex" align="center" class="userinfo-cell">
                    <van-col span="5" style="padding: 8px 0 8px 15px;">
                        <JushiImg
                                imgFit="fill"
                                imgWidth="50"
                                :imgUrl="user.info.imageUrl"
                                errorUrl="/img/avatar/defaultAvatar.png"
                        />
                    </van-col>
                    <van-col span="8" >
                        <div v-if="isLogin">
                            <span style="font-size: 18px">{{user.info.username}}</span>
                        </div>
                        <div v-else>
                            <van-button  plain style="border: none;font-size: 18px">登录/注册</van-button>
                        </div>
                    </van-col>
                    <van-col span="11" >
                        <van-icon  name="arrow" style="line-height: 50px;float: right;"/>
                    </van-col>
                </van-row>
            </div>
            <div style="margin-top: 8px;" @click="$router.push('/issueArticle')" v-show="isLogin">
                <MeCell content="发表文章">
                    <van-icon
                            slot="icon"
                             name="plus"
                    />
                </MeCell>
            </div>
        </van-list>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import JushiImg from '@/components/Img/JushiImg'
  import MeCell from '@/components/Cell/MeCell'

  export default {
    name: 'Me',
    data () {
      return {
        isLogin: false

      }
    },
    computed: {
      ...mapState({
        auth: state => state.modules.auth,
        user: state => state.modules.user
      })
    },
    methods: {
      /**
       * 用户信息 第一行 点击
       */
      userClick () {
        // 判断是否登录
        if (this.isLogin) {

        } else {
          this.$router.push('/login')
        }
      }
    },
    created () {
      this.isLogin = this.auth.token !== null
      // 判断是否登录
      if (this.isLogin) {

      }
    },
    components: {
      JushiImg,
      MeCell
    }
  }
</script>

<style lang="scss">
    #me {
        .login_list {
            display: flex;
            align-items: center;
        }

        .van-tabs__nav--card {
            margin: 0;
        }

        .van-list > div {
            background-color: rgb(255, 255, 255);
        }

        .van-tabs__line {
            display: none;
        }

        .van-image__error {
            position: relative;
        }
    }

</style>
