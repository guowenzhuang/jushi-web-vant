<template>
  <div id="me">
    <van-tabs v-model="van_tabs_active" type="card" sticky color="#1296db">
      <van-tab title="我">
    <van-list>
      <van-cell is-link>
        <template slot="default">
          <div class="login_list">
            <van-icon name="contact" size="30px"/>
            <van-button   style="margin-left: 20px;border: 0px;">登录/注册</van-button>
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
      return {
        van_tabs_active: 0
      }
    },
    methods: {}
  }
</script>

<style lang="scss">
  #me{
    .login_list {
      display: flex;
      align-items: center;
    }
    .van-tabs__nav--card{
      margin: 0;
    }
  }

</style>
