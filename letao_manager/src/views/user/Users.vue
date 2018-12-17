<template>
  <div class="users">
    <template>
      <el-table
        :data="userData"
        border
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="电话"
          width="180"
        >
        </el-table-column>
        <el-table-column
          label="状态"
          prop="isDelete"
        >
        <template slot-scope="scope">
        <span>{{scope.row.isDelete | levelFormat(isDelete)}}</span>
      </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
            >禁用</el-button>
            <!-- <el-button
              size="mini"
              type="success"
              v-show="isDelete===0"
              @click="handleDelete(scope.row)"
            >启用</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </template>
<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
</el-pagination>
<!-- 禁用对话 -->
<el-dialog
  title="提示"
  :visible.sync="updatedialogVisible"
  width="30%">
  <span>禁用成功</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
<!-- 启用对话 -->
<el-dialog
  title="提示"
  :visible.sync="qidialogVisible"
  width="30%">
  <span>启用成功</span>
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="qidialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
    </div>
</template>
<script>
import { userLits, updateUser } from '@/api'
export default {
  data () {
    return {
      userData: {
        username: '',
        mobile: '',
        isDelete: ''
      },
      total: 0,
      //   每一页条数
      pageSize: 5,
      //   页码
      page: 1,
      //   禁用对话
      updatedialogVisible: false,
      isDelete: '',
      //   启用
      qidialogVisible: false
    }
  },
  // 在单文件组件中，通过filters创建局部过滤器--只有当前组件中可以使用，它是一个对象hendleClose
  filters: {
    levelFormat (isDelete) {
      if (isDelete === 0) {
        return '已禁用'
      } else if (isDelete === 1) {
        return '已启用'
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.init()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.page = val
      this.init()
    },
    handleDelete (row) {
      console.log(row)
      //   if ('isDelete' = 0) {
      //     this.updatedialogVisible = true
      //   } else if ('isDelete' = 1) {
      //     this.qidialogVisible = true
      //   }
      // 禁用用户
      updateUser({id: this.id, isDelete: this.isDelete}).then(res => {
        console.log(res)
        if (res.error) {
        // 跳转
          this.$router.push({name: 'Login'})
        }
      })
    },
    init () {
      //   渲染用户列表
      userLits({ page: this.page, pageSize: this.pageSize }).then(res => {
        //   console.log(res)
        this.userData = res.rows
        this.total = res.total
      })
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.el-table {
  height: 500px;
}
.el-pagination {
  padding-top: 15px;
}
</style>
