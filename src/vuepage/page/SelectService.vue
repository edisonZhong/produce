<!--选择业务区-->
<template>
    <div>
        <div class="header">
           <input placeholder="输入关键字" class="input-seach" v-model="value"/>
           <p class="seach">搜索</p>
        </div>
        <!-- <div> -->
            <ul
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="loading"
                infinite-scroll-distance="10">
                <li v-for="item in list">{{ item }}</li>
            </ul>
        <!-- </div> -->
    </div>
</template>

<script>
export default {
    name:'selectService',
    data(){
        return{
            value:''
        }
    },
    
    methods:{
        loadMore() {
        this.loading = true;
        setTimeout(() => {
            let last = this.list[this.list.length - 1];
            for (let i = 1; i <= 10; i++) {
            this.list.push(last + i);
            }
            this.loading = false;
        }, 2500);
        }
    }
}
</script>

<style lang="less" scoped>
.seach{
    width: .9rem;line-height: .65rem;margin-left: .3rem;color:rgba(187,192,198,1);font-size: .28rem;
    text-align: center;
}
.input-seach{
    background:rgba(246,248,250,1);height:.72rem;width:100%;border-radius:4px;
}
.header{
    padding:.3rem;display:flex;box-sizing: border-box;
    position: absolute;
    top:0;
    width: 100%
}
</style>