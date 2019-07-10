<template>
    <div style="padding: 8px 0 8px 15px;">
        <van-row  type="flex" align="center">
            <slot name="icon"></slot>
            <van-col>
                <van-button plain style="border: none;">
                    {{content}}
                </van-button>
            </van-col>
        </van-row>
    </div>
</template>

<script>
  export default {
    name: 'MeCell',
    props: {
      content: String
    }
  }
</script>

<style scoped>

</style>
