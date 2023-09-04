<template>
    <div style="display:flex">
    <div>
        <i :class="icon" style="font-size:20px" @click="collapse"></i>
    </div>
        
        <div style="flex:1;text-align:center;font-size:30px">
            <span>欢迎进入！！！！！</span>
        </div>
        <span style="margin-right:10px">{{user.user.username}}</span>
        <el-dropdown>
        <i class="el-icon-arrow-down" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="toUser">个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
</template>

<script>
import api from '@/api/login'
export default {
    name:'Header',
    props:['icon'],
    data(){
        return {    
            user: JSON.parse(sessionStorage.getItem('CurUser'))
        }
    },
    methods: {
        toUser(){
            //console.log(to_user)
            this.$router.push('/User')
        },
        logout(){
            this.$confirm('您确定要退出登录吗？','提示',{
                confirmButtonText:'确定',
                type:'warning',
                center:true
            }).then(() =>{
                api.logoutApi().then((res) =>{
                    console.log(res)
                    this.$message({
                    type:'success',
                    message:'退出登录成功'
                })
                window.localStorage.clear();
                this.$router.push('/')
                })
            }).catch(() =>{
                this.$message({
                    type:'info',
                    message:'退出登录已取消'
                })
            })
           
        },
        collapse(){
            this.$emit('doCollapse')
        }
    },
}
</script>

<style>
</style>