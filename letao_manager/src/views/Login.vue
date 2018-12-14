<template>
  <div class="login">
    <div class="container">
        <img
          src="../assets/0001.jpg"
          class="avatar"
        >
      <el-form
        ref="loginFrom"
        :model="loginFrom"
        label-width="60px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginFrom.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type='password' v-model="loginFrom.password"></el-input>
        </el-form-item>
        <el-button type="success" @click="login('loginFrom')" class="login-btn">登陆</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import {login} from '@/api/index.js'
export default {
  data () {
    return {
      loginFrom: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  mounted () {

  },
  methods: {
    login (formname) {
      this.$refs[formname].validate((valid) => {
        if (valid) {
          login(this.loginFrom).then(res => {
            console.log(res)
            if (res.success) {
              // 提示登陆成功
              this.$message({
                message: '登陆成功',
                type: 'success'
              })
              // 跳转
              this.$router.push({name: 'Home'})
            } else {
              this.$message({
                message: '登录失败',
                type: 'error'
              })
            }
          })
        } else {
          this.$message.error('数据不完整')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
position: fixed;
  width: 100%;
  height: 100%;
  background-color: #124488;
  .container {
    width: 400px;
    height: 250px;
    border: 1px solid #333;
    padding: 20px;
    margin: 200px auto;
    background: white;
    padding: 0px 40px 15px 40px;
    .avatar {
         position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
        width: 100%;
    }
}
}
</style>
