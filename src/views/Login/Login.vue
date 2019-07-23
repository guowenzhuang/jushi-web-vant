<template>
    <div id="login">
        <van-nav-bar
                title="登录"
                left-arrow
                @click-left="$router.back(-1)"
        />
        <van-row type="flex" justify="center">
            <van-col span="8">
                <van-image
                        src="/img/logo.png"></van-image>
            </van-col>
        </van-row>

        <van-row type="flex" justify="center">
            <van-col span="22">
                <van-field
                        v-model="loginparams.username"
                        label="用户名:"
                        placeholder="用户名"></van-field>
                <van-field
                        v-model="loginparams.oldPassword"
                        label="密码:"
                        :type="showPassword"
                        :right-icon="passwordIcon"
                        @click-right-icon="passwordIconClick"
                        placeholder="密码"></van-field>
            </van-col>
        </van-row>

        <div style="padding:0 5px;">
            <van-row type="flex" justify="center" style="margin-top: 8px;">
                <van-col span="24">
                    <van-button :loading="loginLoading" type="info" @click="login" block>登录</van-button>
                </van-col>
            </van-row>
            <van-row type="flex" justify="center" style="margin-top: 8px;">
                <van-col span="12">
                    <a @click="$router.push('/updatePassword')" style="color: #969799;" href="javascript:void(0)">忘记密码</a>
                </van-col>
                <van-col span="12">
                    <a @click="$router.push('/register')" href="javascript:void(0)"
                       style="float: right;color: #969799;">注册账号</a>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Cookies from 'js-cookie'

  export default {
    name: 'Login',
    data () {
      return {
        loginparams: {
          username: '',
          oldPassword: ''
        },
        passwordIcon: 'closed-eye',
        showPassword: 'password',
        loginLoading: false
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
        if (this.loginparams.username === '') {
          this.$toast('请输入用户名')
          return
        }
        if (this.loginparams.oldPassword === '') {
          this.$toast('请输入密码')
          return
        }
        this.loginLoading = true
        // 加密密码
        let password = this.encryptString(this.loginparams.oldPassword)
        this.$axios({
          url: '/api/uaa/authorize',
          method: 'post',
          data: {
            username: this.loginparams.username,
            password: password
          }
        }).then(res => {
          this.$store.commit('modules/auth/login', res.token)
          Cookies.set('token', res.token)
          this.getUserInfo()
        }).catch(res => {
            this.loginLoading = false
            this.loginLoading = false
          this.$toast.fail('登录失败请检查用户名和密码是否正确')
        })
      },
      /**
       * 获取用户信息
       */
      getUserInfo () {
        // 获取用户信息
        this.$axios('/api/admin/user/getCurrentUser').then(
          res => {
              this.loginLoading = false
              this.$store.commit('modules/user/setUserInfo', res)
            this.$router.push('/main/home')
          }
        )
      },
      /**
       * 密码框,文本 切换
       */
      passwordIconClick () {
        if (this.passwordIcon === 'closed-eye') {
          this.passwordIcon = 'eye-o'
        } else {
          this.passwordIcon = 'closed-eye'
        }
        if (this.showPassword === 'password') {
          this.showPassword = 'text'
        } else {
          this.showPassword = 'password'
        }
      }
    }
  }
</script>

<style lang="scss">
    #login {

    }
</style>
