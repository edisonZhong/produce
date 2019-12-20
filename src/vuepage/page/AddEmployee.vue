<!--录入员工信息-->
<template>
    <div id="page">
        <!-- <mt-cell title="姓名" is-link>
            <input/>
        </mt-cell> -->
        <div id='main'>
            <mt-field label="姓名" placeholder="请填写" v-model="username"></mt-field>
            <mt-field label="客户工号" placeholder="请填写" v-model="username"></mt-field>
            <mt-field label="所属业务区" placeholder="请填写" v-model="username" @focus.native.capture="handleService"></mt-field>
            <mt-field label="入职日期" placeholder="请选择" v-model="username" @focus.native.capture="openPicker"></mt-field>
            <mt-field label="劳动合同牌照" placeholder="请选择" v-model="username"></mt-field>
            <mt-field label="服务客户名称" placeholder="请填写" v-model="username"></mt-field>
            <mt-field label="岗位属性" placeholder="请选择" v-model="username"></mt-field>
        </div>
        <mt-datetime-picker
            ref="picker"
            type="date"
            @confirm="handleConfirm"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            v-model="value">
        </mt-datetime-picker>
        <div class="footer">
            <mt-button class="bottom-save">保存</mt-button>
            <mt-button style="width:4rem;height:.88rem" type="primary">保存并继续添加</mt-button>
        </div>
    </div>
</template>

<script>
export default {
    name:'addEmployee',
    data(){
        return{
            username:'',
            value:''
        }
    },
    methods:{
        openPicker() {
        this.$refs.picker.open();
      },
      handleConfirm(value){
          console.log(value);
      },
        handleService(){
            this.$router.push({
                path:'/SelectService'
            })
        }
    }
}
</script>

<style lang="less" scoped>
label {
    text-align: right;
}
#page{
    height: 100%;
    position: relative;
    width: 100%;
    #main{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 1.58rem;
        // border-bottom: 1px solid #ccc;
        overflow-x: hidden;
        overflow-y: auto
    }
}
.bottom-save{
    height: .88rem;
    width: 1.6rem;
    background:rgba(235,159,75,1);
    color: #fff
}
.footer{
    position: absolute;
    // bottom: .7rem;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 1.58rem;
    background: #fff
}
</style>