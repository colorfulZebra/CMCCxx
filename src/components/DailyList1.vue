<template>
  <div id="dailyList1">
    <el-row>
      <el-col :span="24">
        <el-steps :active="active"  finish-status="success">
          <el-step v-for="st in steps" :key="st.title" :title="st.title" :description="st.desc"></el-step>
        </el-steps>
      </el-col>
      <el-col :span="2" :offset="22">
        <el-button v-show="active < 4" @click="next">下一步</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'dailyList1',
  data () {
    return {
      steps: [
        {title: '导入数据', desc: '导入基础数据，包括全量数据清单(带所有相关字段)以及目标客户清单'},
        {title: '导入剔除清单', desc: '导入需要剔除号码清单，可以导入多个，每个清单需要自定义名称，最终清单里会给被剔除数据打上自定义名称的标签'},
        {title: '导入营销包', desc: '导入需要调取的营销包编码清单，最终清单里会给办理相关营销活动号码打上标签'},
        {title: '生成报表', desc: '得到处理后的清单以及汇总报表'}
      ],
      active: 0
    }
  },
  mounted () {
  },
  methods: {
    next () {
      if (this.active < 4) {
        this.active += 1
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#dailyList1 {
  width: 100%;
  padding-top: 10px;
  text-align: left;
}
</style>
