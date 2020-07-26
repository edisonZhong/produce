<!--统计图 华南大区-->
<template>
  <div id="page">
    <div class="bx">
      <div class="btn one" @click='produce(0)'>
        从1～35之间生成5位数字
      </div>
      <div class="">
        {{five_number}}
      </div>
      <div class="btn" @click='produce(1)'>
        从1～12之间生成2位数字
      </div>
      <div class="">
        {{two_number}}
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'index',
    components: {
    },

    data() {
      return {
        five_number:'0-0-0-0-0',
        two_number:'0-0'
      }
    },

    mounted() {


    },
    created() {
      // this.getStatis()
      // this.getHealth()
    },
    methods: {
      produce(idx){
        console.log(idx);
        var arr = [];
        var total_nums = 0;//数字最大直
        if(idx==0){
          for(var i=0;i<5;i++){
            total_nums = 35;
            this.getx(i,arr,total_nums,idx);
          }
        }else if(idx==1){
          for(var i=0;i<2;i++){
            total_nums = 12;
            this.getx(i,arr,total_nums,idx);
          }
        }
      },
      getx(ii,arr,total_nums,idx){
        for(var i=0;i>-1;i++){
               var flag = true;
               var num = Math.floor(Math.random()*total_nums)+1;
               for(var i in arr){
                   if(arr[i] == num){
                       flag= false;
                       break;
                   }
               }
               if(flag == true){
                   arr.push(num);
                   if(idx==0){
                     console.log(arr);
                     this.five_number = arr.join('-');
                   }else if(idx==1){
                     this.two_number = arr.join('-');
                   }
                   return;
               }
           }
      }
    }
  }
</script>

<style lang="less" scoped>
  #page{
    /* position:relative; */
  }
  .bx{
    position:absolute;
    bottom:0;
    top:0;
    left:0;
    right:0;
    margin:auto;
    width:3.5rem;
    height:4rem;
    /* height:100%; */

  }
  .one{
    /* margin-bottom:.5rem; */
  }
  .btn{
    border:1px solid #eee;
    width:3.5rem;
    height:1rem;
    line-height:1rem;
    font-size:.12rem;
    text-align:center;
    margin:auto;
  }
</style>
