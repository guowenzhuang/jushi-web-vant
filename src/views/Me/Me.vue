<template>
  <div id="me">
    <van-tabs type="card" sticky color="#1296db">
      <van-tab title="我">
        <van-list>
          <van-cell is-link>
            <template slot="default">
              <div class="login_list" @click="login()">
                <font-awesome-icon icon="user-secret" size="lg"/>
                <van-button style="margin-left: 20px;border: 0px;font-size: 18px;">
                  登录/注册
                </van-button>
              </div>
            </template>
          </van-cell>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  export default {
    name: 'Me',
    data () {
      return {}
    },
    methods: {
      login () {
        this.$router.push('/login')
      }
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
  }

</style>
