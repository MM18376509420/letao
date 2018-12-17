<template>
  <div class="one">
    <el-button type="primary" @click="getAddGoods">添加商品</el-button>
    <template>
  <el-table
    :data="primaryData"
    border
    style="width: 100%">
    <el-table-column
          type="selection"
          width="50"
        >
        </el-table-column>
    <el-table-column
      prop="id"
      width="50"
      label="商品编号">
    </el-table-column>
    <el-table-column
      prop="proName"
      width="350"
      label="商品名称">
    </el-table-column>
    <el-table-column
      prop="proDesc"
      label="商品描述">
    </el-table-column>
    <el-table-column
      prop="statu"
      width="50"
      label="商品库存">
    </el-table-column>
    <el-table-column
      prop="size"
      width="100"
      label="商品尺寸">
    </el-table-column>
    <el-table-column
      prop="brandId"
      width="50"
      label="是否下架">
    </el-table-column>
    <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              width="100"
              type="danger"
              @click="userDelete(scope.$index, scope.row)"
            >下架</el-button>
          </template>
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
<!-- 添加商品 -->
<el-dialog title="添加商品" :visible.sync="goodsdialogFormVisible">
  <el-form :model="goodsform" ref='Secondform'>
    <el-form-item>
      <template>
  <el-select v-model="goodsform.categoryName" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.id"
      :label="item.categoryName"
      :value="item.categoryName">
    </el-option>
  </el-select>
</template>
    </el-form-item>
    <el-form-item>
      <el-input v-model="goodsform.proName" auto-complete="off" placeholder="请输入产品名称"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="goodsform.proDesc" auto-complete="off" placeholder="请输入产品描述"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="goodsform.num" auto-complete="off" placeholder="请输入产品数量"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="goodsform.size" auto-complete="off" placeholder="请输入产品尺码，如20-40"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="goodsform.oldPrice" auto-complete="off" placeholder="请输入商品原价"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input v-model="goodsform.price" auto-complete="off" placeholder="请输入商品折扣价"></el-input>
    </el-form-item>
    <el-form-item>
      <el-upload
  class="upload-demo"
  action='http://127.0.0.1:3000/product/addProductPic'
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
    <el-button type="primary" @click="addgoods('Secondform')">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
import {ProductDetailList, addProduct, queryTopCategory} from '@/api'
export default {
  data () {
    return {
      primaryData: [],
      pageSize: 7,
      page: 1,
      total: 5,
      // 添加商品
      goodsdialogFormVisible: false,
      goodsform: {
        proName: '',
        oldPrice: '',
        proDesc: '',
        price: '',
        size: '',
        statu: '',
        num: '',
        brandId: ''
      },
      // 上传图片
      fileList: [{name: '', url: ''}],
      options: []
    }
  },
  methods: {
    getAddGoods () {
      this.goodsdialogFormVisible = true
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
      this.goodsform.brandLogo = file.response.picName
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    init () {
      ProductDetailList({pageSize: this.pageSize, page: this.page}).then(res => {
        console.log(res)
        this.primaryData = res.rows
        this.total = res.total
        if (res.error) {
        // 跳转
          this.$router.push({name: 'Login'})
        }
      })
    },
    addgoods (namefrom) {
      this.$refs[namefrom].validate(valid => {
        if (valid) {
          addProduct(this.goodsform).then(res => {
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
}
</style>
