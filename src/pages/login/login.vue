<template>
  <div class="login fillcontain">
    <transition name="form-fade" mode="in-out">
      <div class="center_container">
        <section class="form_contianer">
          <div class="manage_tip">
            <p>交易系统</p>
          </div>
          <div class="welcome-tip">
            <p>欢迎使用，请登录</p>
          </div>
          <el-form ref="loginForm" :model="user" :rules="rules">
            <el-form-item prop="name">
              <el-input
                type="text"
                v-model="user.name"
                placeholder="用户名"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                type="password"
                v-model="user.password"
                placeholder="密码"
              ></el-input>
            </el-form-item>
            <el-select
              v-model="user.server"
              placeholder="默认服务器"
              style="width: 100%"
            >
              <el-option
                v-for="item in servers"
                :key="item.server"
                :label="item.server"
                :value="item.server"
              >
              </el-option>
            </el-select>
            <div class="keep-pass">
              <el-checkbox v-model="isKeep">记住密码</el-checkbox>
              <a href="javaScript:void(0)">忘记密码？</a>
            </div>
            <el-form-item>
              <el-button type="primary" @click="login()" class="submit_btn"
                >登陆</el-button
              >
            </el-form-item>
          </el-form>
        </section>
      </div>
    </transition>
  </div>
</template>

<script>
import Mqtt from "@/utils/mqtt_helper";
import ServerList from "@/assets/server.json";

export default {
  name: "login",
  data() {
    return {
      isKeep: false,
      servers: [],
      user: {
        name: "",
        password: "",
        server: "",
      },
      rules: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
      verification: "",
      waitTime: "",
    };
  },
  created: function () {
    this.init();
  },
  methods: {
    init() {
      this.servers = ServerList;
      this.isKeep = this.$session.get("isKeep", this.isKeep);
      console.log(this.servers);
    },

    login() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          await Mqtt.setClient("17875865869");
          await Mqtt.init();
          const loading = this.$loading({
            lock: true,
            text: "Loading",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)",
          });
          setTimeout(() => {
            loading.close();
            this.$router.push("/main/btc_usdt");
            this.user.token = "123";
            this.$session.set("isKeep", this.isKeep);
            this.$store.dispatch("login", this.user);
          }, 2000);
        } else {
          this.showMessage("error", "登录失败，请检查账号密码");
        }
      });
    },

    //vue弹窗提示
    showMessage(type, err = "登录失败，请检查账号密码") {
      this.$message({
        type: type,
        message: err,
        showClose: true,
      });
    },
  },
};
</script>

<style lang="less">
.el-input__inner {
  border: none !important;
  border-bottom: 1px solid #333 !important;
}
</style>

<style lang="less" scoped>
@import "../../style/mixin";

.keep-pass {
  display: flex;
  justify-content: space-between;
  margin: 20px 0 35px 0;
}

.welcome-tip {
  text-align: start;
  margin-bottom: 20px;
  font-size: 15px;
}

.center_container {
  width: 320px;
  height: auto;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 5px 5px 5px #aaaaaa;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
}

.login {
  // display: flex;
  justify-content: center;
  align-items: center;
}
.fillcontain {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(../../assets/background.jpg);
  background-size: cover;
}
.manage_tip {
  padding-top: 30px;
  padding-bottom: 40px;
  width: 100%;
  display: -webkit-flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  p {
    font-size: 31px;
    color: #333;
  }
}

.form_contianer {
  padding-left: 30px;
  padding-right: 30px;
  width: 100%;
  border-radius: 7px;
  text-align: center;
  background-color: #fff;
  .submit_btn {
    border-radius: 30px;
    margin-top: 15px;
    width: 100%;
    height: 40px;
    font-size: 16px;
    background-image: linear-gradient(#1986f3, #1986f3);
    border: 1px solid #fff;
    background-color: transparent;
    letter-spacing: 2px;
  }
}

.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>
