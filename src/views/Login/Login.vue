<template>
    <div id="login">
        <van-row type="flex" justify="center">
            <van-col span="8">
                <van-image
                        src="http://psgrfzlre.bkt.clouddn.com/image/logo/logo.png"></van-image>
            </van-col>
        </van-row>

        <van-row type="flex" justify="center">
            <van-col span="22">
                <van-field
                        v-model="loginparams.username"
                        label="用户名:"
                        placeholder="手机号/邮箱"></van-field>
                <van-field
                        v-model="loginparams.password"
                        type="password"
                        label="密码:"
                        placeholder="密码"></van-field>
            </van-col>
        </van-row>

        <van-row type="flex" justify="center" style="margin-top: 8px;">
            <van-col span="22">
                <van-button type="info" @click="login" block>登录</van-button>
            </van-col>
        </van-row>

    </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'Login',
    data () {
      return {
        loginparams: {
          username: 'admin',
          password: 'password'
        }
      }
    },
    computed: {
      ...mapState({
        auth: state => state.modules.auth
      })
    },
    methods: {
      /**
       * 用户登录
       */
      login () {
        // 加密密码
        this.$axios({
          url: '/api/uaa/authorize',
          method: 'post',
          data: {
            ...this.loginparams
          }
        }).then(res => {
          this.$store.commit('modules/auth/login', res.token)
          this.getUserInfo()
        })
      },
      /**
       * 获取用户信息
       */
      getUserInfo () {
        // 获取用户信息
        this.$axios('/api/admin/user/getCurrentUser').then(
          res => {
            this.$store.commit('modules/user/setUserInfo', res);
          }
        )
      }
    }
  }
</script>

<style lang="scss">
    #login {

    }
</style>
