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
      active-text-color="#ffd04b">
        <div class="avatar-box">
            <img
          src="../assets/0001.jpg"
          class="avatar"
        >
        <p>root</p>
        </div>
       <el-menu-item-group>
          <el-menu-item>
              <i class="el-icon-circle-check"></i>
              用户管理
          </el-menu-item>
        </el-menu-item-group>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>分类管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">一级分类管理</el-menu-item>
          <el-menu-item index="2-2">二级分类管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item-group>
          <el-menu-item>
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
        <template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      prop="date"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="电话"
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="状态">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">禁用</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    </el-main>
  </el-container>
</el-container>
    </div>
</template>
<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      currentPage4: 4
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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
        .el-table {
        height: 500px;
    }
    .el-pagination {
        padding-top: 10px;
    }
    }
}
</style>
