<template>
  <div class="one">
    <el-button type="primary" @click="categorydialogFormVisible=true">添加分类</el-button>
    <template>
  <el-table
    :data="oneData"
    border
    style="width: 100%">
    <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
    <el-table-column
      prop="id"
      label="分类的编号">
    </el-table-column>
    <el-table-column
      prop="categoryName"
      label="分类的名称">
    </el-table-column>
  </el-table>
</template>
<!-- 分页 -->
<el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[1, 2, 3, 4]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
</el-pagination>
<!-- 添加分类 -->
<el-dialog title="添加分类" :visible.sync="categorydialogFormVisible">
  <el-form :model="categoryform" ref='categoryform'>
    <el-form-item label="分类名称" label-width="80px">
      <el-input v-model="categoryform.categoryName" auto-complete="off"></el-input>
    </el-form-item>
    </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="categorydialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addCategory('categoryform')">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
import {queryTopCategory, addTopCategory} from '@/api'
export default {
  data () {
    return {
      oneData: [],
      pageSize: 7,
      page: 1,
      total: 5,
      // 添加分类
      categorydialogFormVisible: false,
      categoryform: {
        categoryName: ''
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
    init () {
      queryTopCategory({pageSize: this.pageSize, page: this.page}).then(res => {
        console.log(res)
        this.oneData = res.rows
        this.total = res.total
        if (res.error) {
        // 跳转
          this.$router.push({name: 'Login'})
        }
      })
    },
    addCategory (nameform) {
      this.$refs[nameform].validate(valid => {
        if (valid) {
          addTopCategory(this.categoryform).then(res => {
            console.log(res)
            this.categorydialogFormVisible = false
            // 输入完成了清空
            this.$refs[nameform].resetFields()
            // 提示
            this.$message({
              type: 'success',
              message: '添加成功'
            })
            this.init()
          })
        }
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
  height: 400px;
  margin-top: 15px;
}
</style>
