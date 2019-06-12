<template>
  <div class="me">
  <div id="logincss">
  <van-button  type="default" @click="login()">登录</van-button>
  </div>
 </div>
</template>

<script>
  export default {
    name: 'Me',
     data(){
       return {

       }
     },
     methods:{
       login(){
         alert("登录中")
       }
     }
    }
     
 
  
</script>

<style scoped>
           
.logincss{
 padding-top: 100px;
 margin-top: 1000px;
}
</style>
