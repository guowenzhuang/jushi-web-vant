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
          v-model="username"
          label="用户名:"
          placeholder="手机号/邮箱"></van-field>
        <van-field
          v-model="password"
          type="password"
          label="密码:"
          placeholder="密码"></van-field>
      </van-col>
    </van-row>

    <van-row type="flex" justify="center" style="margin-top: 8px;">
      <van-col span="22">
        <van-button type="info" block>登录</van-button>
      </van-col>
    </van-row>

  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      return {
        username: '',
        password: ''
      }
    }
  }
</script>

<style lang="scss">
  #login {

  }
</style>
