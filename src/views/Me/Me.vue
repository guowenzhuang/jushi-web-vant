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
      <div @click="userClick">
        <van-row type="flex" align="center" class="userinfo-cell">
          <van-col span="5" style="padding: 8px 0 8px 15px;">
            <JushiImg
              imgFit="fill"
              :imgUrl="user.info.imageUrl"
              errorUrl="img/avatar/defaultAvatar.png"
            />
          </van-col>
          <van-col span="8">
            <div v-if="isLogin">
              &nbsp;
              <span style="font-size: 18px">{{user.info.username}}</span>
            </div>
            <div v-else>
              <van-button plain style="border: none;font-size: 18px">登录/注册</van-button>
            </div>
          </van-col>
          <van-col span="11">
            <van-icon name="arrow" style="line-height: 50px;float: right;"/>
          </van-col>
        </van-row>
      </div>
      <div style="margin-top: 8px;font-size: 18px" @click="$router.push('/updatePassword')" v-show="isLogin">
        <MeCell content="修改密码">
          <van-icon
            slot="icon"
            name="setting-o"
          />
        </MeCell>
      </div>
      <div style="margin-top: 8px;font-size: 18px" @click="fileSelectShow" v-show="isLogin">
        <MeCell content="修改头像">
          <van-icon
            slot="icon"
            name="user-circle-o"
          />
        </MeCell>
      </div>
      <div style="margin-top: 8px;font-size: 18px" @click="$router.push('/myArticles')" v-show="isLogin">
        <MeCell content="我的文章">
          <van-icon
            slot="icon"
            name="newspaper-o"
          />
        </MeCell>
      </div>
      <div style="margin-top: 8px;" @click="$router.push('/myLike')" v-show="isLogin">
        <MeCell content="我赞过的">
          <font-awesome-icon slot="icon" style="font-size: 18px" :icon="['far', 'thumbs-up']"/>
        </MeCell>
      </div>
      <div style="margin-top: 8px;" @click="$router.push('/issueArticle')" v-show="isLogin">
        <MeCell content="发表文章">
          <van-icon
            slot="icon"
            name="plus"
          />
        </MeCell>
      </div>
      <div style="margin-top: 8px;" v-show="isLogin">
        <div s>
          <van-row type="flex" align="center" justify="center">
            <van-col style="font-size: 18px;">
              <van-button @click="logout" plain style="border: none;font-weight: bold;">
                退出登录
              </van-button>
            </van-col>
          </van-row>
        </div>
      </div>
    </van-list>
    <div>
      <van-action-sheet v-model="selectFile" title="选择图片">
        <div style="margin-top: 8px;">
          <van-uploader :after-read="avatarAfterRead" capture="camera">
            <van-button icon="photograph" size="large" type="primary">拍照</van-button>
          </van-uploader>
        </div>
        <div style="margin-top: 8px;">
          <van-uploader :after-read="avatarAfterRead">
            <van-button icon="photo" size="large" type="primary">上传图片</van-button>
          </van-uploader>
        </div>

      </van-action-sheet>

    </div>
  </div>
</template>

<script>
    import {mapState} from 'vuex'
    import JushiImg from '@/components/Img/JushiImg'
    import MeCell from '@/components/Cell/MeCell'
    import Cookies from 'js-cookie'

    export default {
        name: 'Me',
        data () {
            return {
                isLogin: false,
                selectFile: false,
                isUploadLoading: false
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
             * 退出
             */
            logout () {
                Cookies.remove('token')
                this.$store.commit('modules/user/logout')
                this.$store.commit('modules/auth/logout')
                localStorage.removeItem('jushi')
                this.$router.push('/login')
            },
            /**
             * 文件选择显示
             */
            fileSelectShow () {
                this.selectFile = true
            },
            /**
             * 选择图片回调
             */
            avatarAfterRead (file) {
                this.isUploadLoading = true
                let formData = new FormData()
                formData.append('file', file.file)
                formData.append('path', '/img/avatar/')
                this.$axios.post('/api/oss/file/upload/aliyun', formData)
                    .then(res => {
                        if (res.flag) {
                            // 上传图片后 开始修改用户头像
                            this.$axios.put('/api/admin/user/userSetAvatar', {
                                userId: this.user.info.id,
                                imgUrl: res.data
                            }).then(userRes => {
                                if (userRes.flag) {
                                    this.$store.commit('modules/user/setUserImg', res.data)
                                    this.$toast.success('修改成功')
                                    this.selectFile = false
                                    this.isUploadLoading = false
                                }
                            })
                        }
                    })
            },
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
    .van-image {
      border-radius: 50%;
      overflow: hidden;
    }

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

    .van-popup .van-cell__title {
      text-align: center;
    }

    .van-uploader {
      display: block;

    }

    .van-uploader__wrapper {
      display: block;
    }

    .van-uploader__input-wrapper {
      position: static;
    }
  }
</style>
