<template>
  <div class="login" style="margin-left: 20px;border: 0px;margin-right: 20px;">
 <van-image
  width="5rem"
  height="3rem"
  fit="contain"
 src="https://img.yzcdn.cn/vant/cat.jpeg"
/>
 
<van-cell-group>
  <van-field
    v-model="username"
    required
    clearable
    label="用户名"
    right-icon="question-o"
    placeholder="请输入用户名/手机号/邮箱"
    @click-right-icon="$toast('question')"
  />

  <van-field
    v-model="password"
    type="password"
    label="密码"
    placeholder="请输入密码"
    required
  />

   <van-field
    v-model="sms"
    center
    clearable
    label="短信验证码"
    placeholder="请输入短信验证码"
  >
    <van-button slot="button" size="small" type="primary">发送验证码</van-button>
  </van-field>
  <van-button type="info" class="registercss">注册</van-button>
</van-cell-group>

  </div>
</template>

<script>
  export default {
    name: 'Login'
  }
</script>

<style scoped>
#{
      display: flex;
      align-items: center;
}
#login{
  
}
</style>
