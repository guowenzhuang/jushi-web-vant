<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <van-image
            :class="{customClass:true}"
            :width="imgWidth"
            :height="imgHeight"
            lazy-load
            :src="imgUrl"
            :fit="imgFit"
    >
        <template v-slot:error>
            <van-image
                    :width="imgWidth"
                    :height="imgHeight"
                    :src="errorUrl"
                    :fit="imgFit"

            >
                <template v-slot:loading>
                    <van-loading type="spinner" size="20"/>
                </template>
            </van-image>
        </template>
    </van-image>
</template>

<script>
  export default {
    name: 'JushiImg',
    props: {
      imgUrl: String,
      errorUrl: {
        type: String,
        default: '/img/logo.png'
      },
      customClass: String,
      imgWidth: {
        type: [String, Number],
        default: 'auto'
      },
      imgHeight: {
        type: [String, Number],
        default: 'auto'
      },
      imgFit: String
    }
  }
</script>

<style scoped>

</style>
