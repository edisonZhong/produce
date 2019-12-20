<!--选择业务区-->
<template>
  <div style="position: relative;height:100%">
    <!-- <div class="header">
           <input placeholder="输入关键字" class="input-seach" v-model="value"/>
           <img :src='imgUrl' alt=""/>
           <p class="seach">搜索</p>
    </div>-->
    <mt-search v-model="value" placeholder="搜索"></mt-search>
    <ul
      class="main"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      :loading="loading"
      infinite-scroll-distance="10"
    >
      <li v-for="(item,index) in list" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";
export default {
  name: "selectService",
  data() {
    return {
      imgUrl: require("@/assets/img/seach.png"),
      value: "",
      count: 0,
      list: [1],
      loading: false
    };
  },

  methods: {
    loadMore() {
      this.loading = true;
      // setTimeout(() => {
      let last = this.list[this.list.length - 1];
      for (let i = 1; i <= 9; i++) {
        this.list.push(last + i);
      }
      this.loading = false;
      // }, 2500);
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  width: 100%;
  position: absolute;
  top: 1.04rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  li {
    height: 0.88rem;
    line-height: 0.88rem;
  }
}
.seach {
  width: 0.9rem;
  line-height: 0.65rem;
  margin-left: 0.3rem;
  color: rgba(187, 192, 198, 1);
  font-size: 0.28rem;
  text-align: center;
}
.input-seach {
  background: rgba(246, 248, 250, 1);
  height: 0.72rem;
  width: 100%;
  border-radius: 4px;
}
.header {
  padding: 0.3rem;
  display: flex;
  box-sizing: border-box;
  position: absolute;
  top: 0;
  width: 100%;
  img {
    position: absolute;
    top: 0.5rem;
    padding: 0 0.3rem;
  }
}
.mint-indicator-wrapper {
  background: rgba(0, 0, 0, 0);
}
</style>