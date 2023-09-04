<template>
  <div>
    <el-menu 
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      default-active="/index"
      :collapse-transition="false"
      :collapse="isCollapse"
      style="height:750px;"
      router>
      <el-menu-item index="/index">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-menu-item index="/admin">
        <i class="el-icon-s-open"></i>
        <span slot="title">数据展示</span>
      </el-menu-item>

      <el-menu-item index="/home">
        <i class="el-icon-s-check"></i>
        <span slot="title">地图管理</span>
      </el-menu-item>

      <el-menu-item index="/textDemo">
        <i class="el-icon-s-check"></i>
        <span slot="title">聊天室</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside",
  data(){
    return{
        
    }
  },
  props:['isCollapse']
};
</script>

<style></style>
