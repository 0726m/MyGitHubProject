<template>
  <el-container style="height: 750px; border: 1px solid #eee">
    <el-aside :width="aside_width" style="background-color: rgb(238, 241, 246);margin-left:-1px;">
      <Aside :isCollapse="isCollapse"></Aside>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <Header @doCollapse="doCollapse" :icon="icon"></Header>
      </el-header>
      <el-main>
        <!-- <Main></Main> -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "@/components/Aside/Aside.vue";
import Header from "@/components/Header/Header.vue";
// import Main from "@/components/Main/Main.vue";
export default {
  name: "About",
  components: {
    Aside,
    Header,
    // Main,
  },
  data(){
    return{
      isCollapse:false,
      aside_width:'200px',
      icon:'el-icon-s-fold'
    }
  },
  methods:{
    doCollapse(){
      this.isCollapse = !this.isCollapse
      if(!this.isCollapse){
        this.aside_width = '200px'
        this.icon = 'el-icon-s-fold'
      }else{
        this.aside_width = '64px'
        this.icon = 'el-icon-s-unfold'
      }
    }
  }
};
</script>

<style>
.el-header {
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
