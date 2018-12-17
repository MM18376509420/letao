<template>
    <div class="home">
        <el-container>
  <el-aside width="200px" class="Aside">
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#2f4050"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router='true'>
        <div class="avatar-box">
            <img
          src="../assets/0001.jpg"
          class="avatar"
        >
        <p>root</p>
        </div>
       <el-menu-item-group>
          <el-menu-item index="user">
              <i class="el-icon-circle-check"></i>
              用户管理
          </el-menu-item>
        </el-menu-item-group>
      <el-submenu index='2'>
        <template slot="title">
          <i class="el-icon-location" index='/user'></i>
          <span>分类管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/one">一级分类管理</el-menu-item>
          <el-menu-item index="/tow">二级分类管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item-group>
          <el-menu-item index='/product'>
              <i class="el-icon-sold-out"></i>
              商品管理
          </el-menu-item>
        </el-menu-item-group>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header>
          <a href="javascrip:;" @click='collapse=!collapse'  class="myicon myicon-menu toggle-btn"></a>
         <div class="system-title">电商后台</div>
          <div class="hello"><span class="welcome">你好：***</span><span>退出</span></div>
        </el-header>
    <el-main>
        <router-view></router-view>
    </el-main>
  </el-container>
        </el-container>
    </div>
</template>
<script>
export default {
  data () {
    return {
      userData: [],
      total: 0,
      //   每一页条数
      pageSize: 1,
      //   页码
      page: 4
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
    height: 100%;
    background-color: #ddd;
    .el-menu-vertical-demo {
        height: 100%;
        .avatar-box {
            width: 100%;
            height: 190px;
            background-color: #243443;
            .avatar {
            height: 100px;
            width: 100px;
            border-radius: 50%;
            border: 5px solid #ddd;
            margin: 20px 45px;
        }
        p {
            margin: -8px 85px;
            color: #fff;
        }
        }
    }
    .el-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        border-bottom: 1px solid #ddd;
        a {
            width: 50px;
        }
        .system-title {
            flex: 1;
            text-align: center;
        }
        .hello {
            width: 200px;
        }
    }
    .el-main {
        background-color: #fff;
        height: 580px;
    }
}
</style>
