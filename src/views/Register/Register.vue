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
                        src="img/logo.png"></van-image>
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
                        label="密码:"
                        :type="showPassword"
                        :right-icon="passwordIcon"
                        @click-right-icon="passwordIconClick"
                        placeholder="密码"></van-field>
            </van-col>
        </van-row>
        <van-row type="flex" justify="center" style="margin: 8px 5px 0 5px;">
            <van-col span="24">
                <van-button type="info" :loading="registerLoading" @click="register" block>注册</van-button>
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
        },
        registerLoading: false,
        passwordIcon: 'closed-eye',
        showPassword: 'password'
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
        this.registerLoading = true
        // 加密密码
        let password = this.encryptString(this.registerparams.oldPassword)
        this.$axios.post('/api/admin/user/register', {
          username: this.registerparams.username,
          password: password
        }).then(res => {
          this.registerLoading = false
          // 注册成功
          if (res.flag) {
            this.$toast.success('注册成功')
            this.$store.commit('modules/user/setUserInfo', res.data)
            this.login()
          } else { // 注册失败
            this.$toast.fail(res.message)
          }
        }).catch(res => {
          this.loginLoading = false
          this.$toast.fail('注册失败 换个用户名试试')
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

<style scoped>

</style>
