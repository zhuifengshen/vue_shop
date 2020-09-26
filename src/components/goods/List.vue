<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容"
                    v-model="queryInfo.query"
                    clearable
                    @clear="getGoodsList">
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="getGoodsList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"
                     @click="goAddPage">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 商品列表区域 -->
      <el-table :data="goodslist"
                stripe
                border>
        <el-table-column label="#"
                         type="index"></el-table-column>
        <el-table-column label="商品名称"
                         prop="goods_name"></el-table-column>
        <el-table-column label="商品价格(元)"
                         prop="goods_price"
                         width="95px"></el-table-column>
        <el-table-column label="商品重量"
                         prop="goods_weight"
                         width="70px"></el-table-column>
        <el-table-column label="创建时间"
                         prop="add_time"
                         width="140px">
          <template slot-scope="scope">
            {{ scope.row.add_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作"
                         width="130px">
          <template v-slot="scope">
            <!-- 修改按钮 -->
            <el-button type="primary"
                       icon="el-icon-edit"
                       size="mini"
                       @click="showEditDialog(scope.row.goods_id)"></el-button>
            <!-- 删除按钮 -->
            <el-button type="danger"
                       icon="el-icon-delete"
                       size="mini"
                       @click="removeGoodsById(scope.row.goods_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页导航区域 -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="queryInfo.pagenum"
                     :page-size="queryInfo.pagesize"
                     :page-sizes="[1, 2, 5, 10]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
                     background></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取商品列表的参数对象
      queryInfo: {
        query: '',
        // 当前页码
        pagenum: 1,
        // 每页显示条数
        pagesize: 10,
      },
      goodslist: [],
      total: 0,
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList() {
      const { data: res } = await this.$http.get('goods', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品列表失败！')
      }
      console.log(res)
      this.goodslist = res.data.goods
      this.total = res.data.total
    },
    async removeGoodsById(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该商品，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      // 如果用户确认删除，则返回字符串 confirm
      // 如果用户取消删除，则返回字符串 cancel
      if (confirmResult === 'cancel') {
        return this.$message.info('已取消删除！')
      }
      const { data: res } = await this.$http.delete('goods/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('删除商品失败！')
      }
      this.getGoodsList()
      this.$message.success('删除商品成功！')
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getGoodsList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getGoodsList()
    },
    goAddPage() {
      this.$router.push('/goods/add')
    },
  },
}
</script>

<style lang="less" scoped></style>
