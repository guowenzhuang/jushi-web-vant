<template>
    <div id="register">
        <van-nav-bar
                title="注册"
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
                        v-model="registerparams.username"
                        label="用户名:"
                        placeholder="用户名"></van-field>
                <van-field
                        v-model="registerparams.oldPassword"
                        type="password"
                        label="密码:"
                        placeholder="密码"></van-field>
            </van-col>
        </van-row>
        <van-row type="flex" justify="center" style="margin: 8px 5px 0 5px;">
            <van-col span="24">
                <van-button type="info" @click="register" block>注册</van-button>
            </van-col>
        </van-row>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Cookies from 'js-cookie'

  export default {
    name: 'Register',
    data () {
      return {
        registerparams: {
          username: '',
          oldPassword: ''
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
       * 用户注册
       */
      register () {
        if (this.registerparams.username === '') {
          this.$toast('请输入用户名')
          return
        }
        if (this.registerparams.oldPassword === '') {
          this.$toast('请输入密码')
          return
        }
        // 加密密码
        let password = this.encryptString(this.registerparams.oldPassword)
        this.$axios.post('/api/admin/user/register', {
          username: this.registerparams.username,
          password: password
        }).then(res => {
          console.log(res)
          // 注册成功
          if (res.flag) {
            this.$toast.success('注册成功')
            this.$store.commit('modules/user/setUserInfo', res.data)
            this.login()
          } else { // 注册失败
            this.$toast.fail(res.message)
          }
        })
      },
      // 登录
      login () {
        // 加密密码
        let password = this.encryptString(this.registerparams.oldPassword)
        this.$axios({
          url: '/api/uaa/authorize',
          method: 'post',
          data: {
            username: this.registerparams.username,
            password: password
          }
        }).then(res => {
          this.$store.commit('modules/auth/login', res.token)
          Cookies.set('token', res.token)
          this.$router.push('/main/home')
        })
      }
    }
  }
</script>

<style scoped>

</style>
