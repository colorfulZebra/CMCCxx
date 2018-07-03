<template>
  <div id="dailyList1">
    <el-row>
      <el-col :span="24">
        <el-steps :active="active"  finish-status="success">
          <el-step v-for="st in steps" :key="st.title" :title="st.title" :description="st.desc"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 50px">
      <el-col :span="2" :offset="22">
        <el-button v-show="active < 4" @click="next">下一步</el-button>
      </el-col>
    </el-row>
    <el-row v-show="active===0">
      <el-col :span="24">
        <span class="lsttitle">全量数据清单:</span> 西咸新区全量客户基础清单，包含字段xxx、xxx、xxx
        <el-upload
         action="/api/upload"
         :before-remove="beforeRemove"
         :limit="1">
          <a href="javascript:void(0)">点击上传</a>
        </el-upload>
      </el-col>
      <el-col :span="24" style="margin-top: 60px">
        <span class="lsttitle">目标客户清单:</span> 目标客户清单，包含用户号码
        <el-upload
         action="/api/upload"
         :before-remove="beforeRemove"
         :limit="1">
          <a href="javascript:void(0)">点击上传</a>
        </el-upload>
      </el-col>
    </el-row>
    <el-row v-show="active===1">
      <el-col :span="24">Step2</el-col>
    </el-row>
    <el-row v-show="active===2">
      <el-col :span="24">Summary</el-col>
    </el-row>
    <el-row v-show="active===3">
      <el-col :span="24">Report</el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'dailyList1',
  data () {
    return {
      steps: [
        { title: '导入数据', desc: '导入基础数据，包括全量数据清单(带所有相关字段)以及目标客户清单' },
        { title: '确认剔除规则', desc: '汇总显示当前剔除规则' },
        { title: '生成报表', desc: '汇总信息，生成目标清单、剔除清单以及汇总报表' }
      ],
      active: 0
    }
  },
  mounted () {
  },
  methods: {
    next () {
      if (this.active < this.steps.length) {
        this.active += 1
      }
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}?`)
    }
  }
}
</script>

<style lang="scss" scoped>
#dailyList1 {
  width: 100%;
  padding-top: 10px;
  text-align: left;
  a {
    text-decoration: none;
    &:visited {
      text-decoration: none;
    }
    &:hover {
      text-decoration: none;
    }
  }

  .lsttitle {
    font-weight: 600;
    font-size: 18px;
  }
}
</style>
