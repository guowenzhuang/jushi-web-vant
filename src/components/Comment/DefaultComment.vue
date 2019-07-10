<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div id="default-comment">
        <van-cell class="plain-article-cell">
            <van-panel>
                <template v-slot:header>
                    <div style="display: flex; justify-content:space-between;">
                        <div class="plain-article-header">
                            <div>
                                <JushiImg
                                        :imgWidth="30"
                                        :imgUrl="comment.sysUser.imageUrl"
                                        errorUrl="/img/avatar/defaultAvatar.png"
                                />
                                        {{comment.sysUser.username}}
                            </div>
                        </div>
                        <div style="float: right;color:#ED6A0C;">
                            <font-awesome-icon :icon="['far', 'thumbs-up']" size="lg"/>
                            &nbsp;
                            <font-awesome-icon :icon="['far', 'comment']" size="lg"/>
                        </div>
                    </div>
                </template>
                <template v-slot:default>
                    <div style="margin-top: 8px;padding-top:5px;">
                        <div class="van-ellipsis" v-html="comment.content"></div>
                    </div>
                </template>
                <template v-slot:footer>
                    <div style="font-size: 12px">
                        {{comment.createTime}}
                    </div>
                </template>
            </van-panel>
        </van-cell>
    </div>
</template>

<script>
  import JushiImg from '@/components/Img/JushiImg'

  export default {
    name: 'DefaultComment',
    props: {
      comment: Object
    },
    components: {
      JushiImg
    }
  }
</script>

<style scoped>

</style>
