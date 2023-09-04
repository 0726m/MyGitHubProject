<template>
  <div class="login-container">
    <particles-bg type="random" :bg="true" :config="config" />
    <div :bordered="false">
      <div class="top">
        <div class="header">
          <img :src="logoSvg" class="logo" alt="logo" />
          <span class="title">XXXXXXX系统</span>
          <div class="title">欢迎登陆</div>
        </div>
      </div>
      <el-form class="demo-ruleForm" :rules="rules" :model="form" ref="form">
        <el-form-item label="" prop="username" style="width: 300px;">
          <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            placeholder="请输入密码"
            v-model="form.password"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login('form')">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="toRegister()"
            >没有账号？点击注册</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ParticlesBg } from "particles-bg-vue";
import api from '@/api/login'
export default {
  name: "Login",
  components: {
    ParticlesBg,
  },
  data() {
    return {
      logoSvg: require("@/assets/logo.svg"),
      form: {
        username: "",
        password: "",
      },
      config: {
        num: [4, 7],
        rps: 0.1,
        radius: [5, 40],
        life: [1.5, 3],
        v: [2, 3],
        tha: [-30, 30],
        alpha: [0.6, 0],
        scale: [0.1, 0.4],
        position: "all",
        cross: "dead",
        random: 15,
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 11, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    login(formName) {
      //console.log(this.form);
      const that = this
      const data = {
        username:that.form.username,
        password:that.form.password
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let that = this
          api.loginApi(data).then(res =>{
            that.$store.commit("setToken", res.token);
            window.sessionStorage.setItem("CurUser",JSON.stringify(res))
            this.$message({
            message: "登录成功",
            type: "success",
          });
          setTimeout(() => {
            this.$router.push('/about')
          }, 1000);
          }).catch((err) =>{
            console.log(err)
            this.$message.error("用户名或密码错误");
          })
          
        } else {
          this.$message.error("用户名或密码不能为空");
          return false;
        }
      });
    },
    toRegister() {
      this.$router.push("/Register");
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  background-clip: padding-box;
  width: 450px;
  margin: 150px auto;
  padding: 35px 35px 15px 35px;
  background-color: transparent;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .top {
    text-align: center;
    .header {
      height: 44px;
      line-height: 44px;
      .logo {
        height: 44px;
        vertical-align: top;
        margin-right: 16px;
        border-style: none;
      }
      .title {
        font-size: 33px;
        color: rgba(0, 0, 0, 0.85);
        font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
        font-weight: 600;
        position: relative;
        top: 2px;
      }
    }
  }
  .demo-ruleForm {
    margin: 60px;
    margin-left: 10px;
    padding: 35px 35px 15px 105px;
  }
}
</style>
