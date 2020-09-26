<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容"
                    v-model="queryInfo.query"
                    clearable
                    @clear="getOrderList">
            <el-button slot="append"
                       icon="el-icon-search"
                       @click="getOrderList"></el-button>
          </el-input>
        </el-col>
      </el-row>

      <!-- 订单列表数据 -->
      <el-table :data="orderlist"
                stripe
                border>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="order_number"
                         label="订单编号">
        </el-table-column>
        <el-table-column prop="order_price"
                         label="订单价格">
        </el-table-column>
        <el-table-column prop="pay_status"
                         label="是否付款">
          <template slot-scope="scope">
            <el-tag type="success"
                    v-if="scope.row.pay_status === '1'">已付款</el-tag>
            <el-tag type="danger"
                    v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send"
                         label="是否发货">
        </el-table-column>
        <el-table-column prop="create_time"
                         label="下单时间">
          <template slot-scope="scope">
            {{ scope.row.create_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="mini"
                       icon="el-icon-edit"
                       @click="handleEditAddress(scope.id)"></el-button>
            <el-button type="success"
                       size="mini"
                       icon="el-icon-location"
                       @click="showLogisticsDialog(scope.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page="queryInfo.pagenum"
                     :page-sizes="[5, 10, 15, 20]"
                     :page-size="100"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total">
      </el-pagination>
    </el-card>
    <!-- 修改地址对话框 -->
    <el-dialog title="修改地址"
               :visible.sync="addressDialogVisible"
               @close="addressDialogClosed"
               width="50%">
      <el-form :model="addressForm"
               :rules="addressFormRules"
               ref="addressFormRef"
               label-width="100px">
        <el-form-item label="省市区/县"
                      prop="address1">
          <el-cascader v-model="addressForm.address1"
                       :options="citydata"
                       :props="{ expandTrigger: 'hover' }"
                       clearable></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址"
                      prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="addressDialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="addressDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查看物流信息对话框 -->
    <el-dialog title="物流进度"
               :visible.sync="logisticsDialogVisible"
               width="50%">
      <el-timeline :reverse="true">
        <el-timeline-item v-for="(activity, index) in logisticsInfo"
                          :key="index"
                          :timestamp="activity.time">
          {{activity.context}}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import citydata from './citydata.js'

export default {
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10,
      },
      total: 0,
      orderlist: [],
      addressDialogVisible: false,
      addressForm: {
        address1: [],
        address2: '',
      },
      addressFormRules: {
        address1: [{ required: true, message: '请选择省市区/县', trigger: 'blur' }],
        address2: [{ required: true, message: '请填写详细地址', trigger: 'blur' }],
      },
      citydata,
      logisticsDialogVisible: false,
      logisticsInfo: [],
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    async getOrderList() {
      const { data: res } = await this.$http.get('orders', { params: this.queryInfo })

      if (res.meta.status !== 200) {
        return this.$message.error('获取订单列表失败！')
      }

      console.log(res)
      this.total = res.data.total
      this.orderlist = res.data.goods
    },
    handleSizeChange(val) {
      this.queryInfo.pagesize = val
      this.getOrderList()
    },
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val
      this.getOrderList()
    },
    handleEditAddress() {
      this.addressDialogVisible = true
    },
    addressDialogClosed() {
      this.$refs.addressFormRef.resetFields()
    },
    async showLogisticsDialog() {
      const { data: res } = await this.$http.get('/kuaidi/1106975712662')
      if (res.meta.status !== 200) {
        return this.$message.error('获取物流信息失败！')
      }

      console.log(res)
      this.logisticsInfo = res.data
      this.logisticsDialogVisible = true
    },
  },
}
</script>

<style lang="less" scoped>
.el-cascader {
  width: 100%;
}
</style>
