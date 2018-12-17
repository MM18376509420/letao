<template>
  <div class="tow">
    <el-button
      type="primary"
      @click="showGoods"
    >添加品牌</el-button>
    <template>
      <el-table
        :data="towData"
        border
        style="width: 100%"
      >
        <el-table-column
          type="selection"
          width="55"
        >
        </el-table-column>
        <el-table-column
          prop="id"
          label="品牌编号"
        >
        </el-table-column>
        <el-table-column
          prop="brandName"
          label="品牌名称"
        >
        </el-table-column>
        <el-table-column label="品牌logo">
          <template slot-scope="scope">
            <img
              :src="'http://127.0.0.1:3000'+scope.row.brandLogo"

            >
          </template>
        </el-table-column>
        <el-table-column
          prop="categoryName"
          label="所属分类"
        >
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
<el-dialog title="添加分类" :visible.sync="SeconddialogFormVisible">
  <el-form :model="Secondform" label-width="100px"  ref='Secondform'>
    <el-form-item>
      <template>
  <el-select v-model="Secondform.categoryName" clearable placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.categoryName"
      :value="item.categoryName">
    </el-option>
  </el-select>
</template>
    </el-form-item>
    <el-form-item label="分类名称">
      <el-input v-model="Secondform.brandName" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-upload
  class="upload-demo"
  action='http://127.0.0.1:3000/category/addSecondCategoryPic'
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :before-remove="beforeRemove"
  multiple
  :limit="3"
  :on-exceed="handleExceed"
  :on-success="addimg"
  :file-list="fileList"
  name='pic1'
  :with-credentials="true"
  >
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="addSecond('Secondform')">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
import { SecondCategory, addSecondCategory, queryTopCategory } from '@/api'
export default {
  data () {
    return {
      towData: [],
      pageSize: 6,
      page: 1,
      total: 5,
      brandLogo: '',
      // 添加分类
      SeconddialogFormVisible: false,
      Secondform: {
        id: '',
        brandName: '',
        brandLogo: '',
        categoryName: ''
      },
      // 上传图片
      fileList: [{name: '', url: ''}],
      options: []
    }
  },
  methods: {
    showGoods () {
      this.SeconddialogFormVisible = true
      queryTopCategory({pageSize: this.pageSize, page: this.page}).then(res => {
        this.options = res.rows
        console.log(this.options)
      })
    },
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
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    addimg (response, file, fileList) {
      this.Secondform.brandLogo = file.response.picAddr
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    init () {
      SecondCategory({ pageSize: this.pageSize, page: this.page }).then(res => {
        console.log(res)
        this.towData = res.rows
        this.total = res.total
        if (res.error) {
          // 跳转
          this.$router.push({ name: 'Login' })
        }
      })
    },

    addSecond (namefrom) {
      this.$refs[namefrom].validate(valid => {
        if (valid) {
          addSecondCategory(this.Secondform).then(res => {
            console.log(res)
            this.init()
            if (res.error) {
              // 跳到登陆页面
              this.$router.push({ name: 'Login' })
            }
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
  img {
    width: 100px;
    height: 100px;
  }
}
</style>
