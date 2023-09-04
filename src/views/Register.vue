<template>
  <div class="login-container">
    <particles-bg type="random" :bg="true" :config="config" />
    <div :bordered="false">
      <div class="top">
        <div class="header">
          <img :src="logoSvg" class="logo" alt="logo" />
          <span class="title">欢迎注册</span>
        </div>
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="" prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            placeholder="请输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
            placeholder="请再次输入密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="Register('ruleForm')"
            >立即注册</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="text" @click="toLogin()"
            >已有账号？返回登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ParticlesBg } from "particles-bg-vue";
import api from "@/api/login";
export default {
  name: "Register",
  components: {
    ParticlesBg,
  },
  data() {
    var checkUserName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      logoSvg: require("@/assets/logo.svg"),
      ruleForm: {
        password: "",
        checkPass: "",
        username: "",
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
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkUserName, trigger: "blur" }],
      },
    };
  },
  methods: {
    Register(formName) {
      const that = this;
      const data = {
        username: that.ruleForm.username,
        password: that.ruleForm.password,
      };
      this.$refs[formName].validate((valid) => {
        if (valid) {
          api.registerApi(data).then((res) => {
            this.$message({
              message: "注册成功,点击登录",
              type: "success",
            });
            this.$router.push("/");
          }).catch((err) =>{
            console.log(err.message)
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toLogin() {
      this.$router.push("/");
    },
  },
};
</script>

<style>
.login-container {
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
    margin: 40px;
    margin-left: 0px;
    padding: 35px 35px 15px 0px;
  }
}
</style>
