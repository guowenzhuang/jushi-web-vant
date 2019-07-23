<template>
    <div id="login">
        <van-nav-bar
                title="修改密码"
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
                        v-model="updatePasswordparams.username"
                        label="用户名:"
                        placeholder="用户名"></van-field>
                <van-field
                        v-model="updatePasswordparams.oldPassword"
                        label="原密码:"
                        :type="oldShowPassword"
                        :right-icon="oldPasswordIcon"
                        @click-right-icon="oldPasswordIconClick"
                        placeholder="原密码"></van-field>
                <van-field
                        v-model="updatePasswordparams.newPassword"
                        label="新密码:"
                        :type="newShowPassword"
                        :right-icon="newPasswordIcon"
                        @click-right-icon="newPasswordIconClick"
                        placeholder="新密码"></van-field>
            </van-col>
        </van-row>

        <div style="padding:0 5px;">
            <van-row type="flex" justify="center" style="margin-top: 8px;">
                <van-col span="24">
                    <van-button :loading="updatePasswordLoading" @click="changePassword" type="info" block>修改密码
                    </van-button>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import Cookies from 'js-cookie'

  export default {
    name: 'UpdatePassword',
    data () {
      return {
        updatePasswordparams: {
          username: '',
          oldPassword: '',
          newPassword: ''
        },
        newPasswordIcon: 'closed-eye',
        newShowPassword: 'password',
        oldPasswordIcon: 'closed-eye',
        oldShowPassword: 'password',
        updatePasswordLoading: false
      }
    },
    computed: {
      ...mapState({
        auth: state => state.modules.auth
      })
    },
    methods: {
      /**
       * 修改密码
       */
      changePassword () {
        if (this.updatePasswordparams.username === '') {
          this.$toast('请输入用户名')
          return
        }
        if (this.updatePasswordparams.oldPassword === '') {
          this.$toast('请输入原密码')
          return
        }
        if (this.updatePasswordparams.newPassword === '') {
          this.$toast('请输入新密码')
          return
        }

        this.$dialog.confirm({
          title: '是否确认修改密码',
          message: '新密码:' + this.updatePasswordparams.newPassword
        }).then(() => {
          this.updatePasswordLoading = true
          // 加密密码
          this.$axios.put('/api/admin/user/changePassword', {
            username: this.updatePasswordparams.username,
            oldPassword: this.encryptString(this.updatePasswordparams.oldPassword),
            newPassword: this.encryptString(this.updatePasswordparams.newPassword)
          }).then(res => {
            this.updatePasswordLoading = false
            // 注册成功
            if (res.flag) {
              this.$toast.success('修改密码成功')
              this.$store.commit('modules/user/setUserInfo', res.data)
               this.login()
            } else { // 注册失败
              this.$toast.fail(res.message)
            }
          }).catch(res => {
            this.loginLoading = false
            this.$toast.fail('修改密码失败')
          })
        }).catch(() => {
          // on cancel
        })
      },
      // 登录
      login () {
        // 加密密码
        let password = this.encryptString(this.updatePasswordparams.newPassword)
        this.$axios({
          url: '/api/uaa/authorize',
          method: 'post',
          data: {
            username: this.updatePasswordparams.username,
            password: password
          }
        }).then(res => {
          this.$store.commit('modules/auth/login', res.token)
          Cookies.set('token', res.token)
          this.$router.push('/main/home')
        })
      },
      /**
       * 新密码框,文本 切换
       */
      newPasswordIconClick () {
        if (this.newPasswordIcon === 'closed-eye') {
          this.newPasswordIcon = 'eye-o'
        } else {
          this.newPasswordIcon = 'closed-eye'
        }
        if (this.newShowPassword === 'password') {
          this.newShowPassword = 'text'
        } else {
          this.newShowPassword = 'password'
        }
      },
      /**
       * 原密码框,文本 切换
       */
      oldPasswordIconClick () {
        if (this.oldPasswordIcon === 'closed-eye') {
          this.oldPasswordIcon = 'eye-o'
        } else {
          this.oldPasswordIcon = 'closed-eye'
        }
        if (this.oldShowPassword === 'password') {
          this.oldShowPassword = 'text'
        } else {
          this.oldShowPassword = 'password'
        }
      }
    }
  }
</script>

<style lang="scss">
    #login {

    }
</style>
