<template>
  <div id="dailyList1">
    <el-row>
      <el-col :span="24">
        <el-steps :active="active"  finish-status="success">
          <el-step v-for="st in steps" :key="st.title" :title="st.title" :description="st.desc"></el-step>
        </el-steps>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 50px; margin-top: 20px">
      <el-col :span="2" :offset="22">
        <el-button v-show="active < steps.length" @click="next">下一步</el-button>
      </el-col>
    </el-row>
    <el-row v-show="active===0">
      <el-col :span="22" :offset="1" style="margin-bottom: 30px;">
        <span class="lsttitle">全量数据清单: </span>西咸新区全量客户基础清单，包含基础信息字段，如arpu、mou、dou等
        <el-upload
         action="/upload/fulllist"
         name="fullList"
         accept=".txt"
         :on-success="successUploaded"
         :before-remove="beforeRemove"
         :limit="1">
          <a href="javascript:void(0)">点击上传</a>
        </el-upload>
      </el-col>
      <el-col :span="22" :offset="1">
        <span class="lsttitle">全量营销清单: </span>西咸新区全量客户营销清单，包含用户办理优惠、营销活动或者产品变更
        <el-upload
         action="/upload/marketlist"
         name="marketList"
         accept=".txt"
         :on-success="successUploaded"
         :before-remove="beforeRemove"
         :limit="1">
          <a href="javascript:void(0)">点击上传</a>
        </el-upload>
      </el-col>
      <el-col :span="22" :offset="1" style="margin-top: 30px">
        <span class="lsttitle">目标客户清单:</span> 目标客户清单，包含用户号码和自定义标志
        <el-upload
        action="/upload/targetlist"
        name="targetList"
        accept=".txt"
        :on-success="successUploaded"
        :before-remove="beforeRemove"
        :limit="1">
          <a href="javascript:void(0)">点击上传</a>
        </el-upload>
      </el-col>
    </el-row>
    <el-row v-show="active===1">
      <el-col :span="24">
        <el-tooltip v-for="(tg, idx) in deletedTags" :key="tg.title" :placement="idx===0 ? 'bottom-start' : idx === deletedTags.length-1 ? 'bottom-end' : 'bottom'" effect="light">
          <div slot="content"><font style="font-size: 18px; padding: 10px;">{{ tg.desc }}</font></div>
          <el-button round :type="tg.type">{{ tg.title }}</el-button>
        </el-tooltip>
      </el-col>
      <el-col :span="22" :offset="1" style="margin-top: 30px;">
        {{ explainStr }}
      </el-col>
    </el-row>
    <el-row v-show="active===2">
      <el-col :span="24" style="margin-top: 20px;">
        <span class="lsttitle">全量客户清单: </span>
      </el-col>
      <el-col :span="24" style="margin-top: 20px;">
        <span class="lsttitle">目标客户清单: </span>
      </el-col>
      <el-col :span="24" style="margin-top: 20px;">
        <span class="lsttitle">剔除规则: </span>
        <el-tag v-for="tag in deletedTags" :key="tag.title" :type="tag.type">{{tag.title}}</el-tag>
      </el-col>
    </el-row>
    <el-row v-show="active===3">
      <el-col :span="20" :offset="2">
        <h3 style="margin-top:36px">
          共处理记录<span style="color: dimgray">{{result_list.total}}</span>条，剔除其中<span style="color: red">{{result_list.non_compliance}}</span>条记录，保留<span style="color: forestgreen">{{result_list.compliance}}</span>条记录
        </h3>
        <a href="/download/result">下载剔除后清单</a><a style="margin-left:36px;" href="/download/resulterr">下载被剔除清单</a>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'dailyList1',
  data () {
    return {
      steps: [
        { title: '导入数据', desc: '导入基础数据，包括全量数据清单(带所有相关字段)以及目标客户清单' },
        { title: '确认剔除规则', desc: '汇总显示当前剔除规则' },
        { title: '生成报表', desc: '汇总信息，生成目标清单、剔除清单以及汇总报表' }
      ],
      active: 0,
      deletedTags: [
        { type: 'primary', title: '不可营销产品(不含预约)', desc: '用户当前产品为不可参与流量风暴活动的产品' },
        { type: 'success', title: '不可营销产品(预约)', desc: '用户当月办理了不可参与流量风暴活动的产品' },
        { type: 'info', title: '必剔优惠(含预约)', desc: '用户当前使用或当月办理了与流量风暴互斥的优惠活动' },
        { type: 'warning', title: '必剔营销包(含预约)', desc: '用户当前使用或办理了与流量风暴互斥的营销包' },
        { type: 'danger', title: '已办理', desc: '用户已经办理流量风暴相关的产品、优惠、或营销包' },
        { type: 'success', title: '小号或副卡', desc: '用户办理了小号或副卡的优惠，或存在小号或副卡关系' }
      ],
      explainStr: '',
      files: {
        fulllist: '',
        marketlist: '',
        targetlist: ''
      },
      result_list: {
        total: 0,
        compliance: 0,
        non_compliance: 0
      }
    }
  },
  mounted () {
  },
  computed: {
    showPlace: function (idx) {
      if (idx === 0) {
        return 'bottom-start'
      } else if (idx < this.deletedTags.length - 1) {
        return 'bottom'
      } else {
        return 'bottom-end'
      }
    }
  },
  methods: {
    next () {
      if (this.active === 0) {
        if (this.files.fulllist.length && this.files.marketlist.length && this.files.targetlist.length) {
          let errorMsg = []
          this.$emit('inprocess', { flag: true, title: '正在检查输入文件，请稍等' })
          axios.post('/fileinfo', {
            file: this.files.fulllist
          }).then((response) => {
            if (response.data.return.code === 0) {
              if (!(response.data.data.lines > 0 && response.data.data.title.split('|').length === 18)) {
                errorMsg.push('全量数据清单文件内容错误，无数据或缺少必要字段')
              }
            } else {
              errorMsg.push(`全量数据清单，${response.data.return.message}`)
            }
            return axios.post('/fileinfo', { file: this.files.marketlist })
          }).then((response) => {
            if (response.data.return.code === 0) {
              if (!(response.data.data.lines > 0 && response.data.data.title.split('|').length === 7)) {
                errorMsg.push('全量营销清单文件内容错误，无数据或缺少必要字段')
              }
            } else {
              errorMsg.push(`全量营销清单，${response.data.return.message}`)
            }
            return axios.post('/fileinfo', { file: this.files.targetlist })
          }).then((response) => {
            if (response.data.return.code === 0) {
              if (!(response.data.data.lines > 0 && response.data.data.title.split('\t').length === 2)) {
                errorMsg.push('目标客户清单文件内容错误，无数据或缺少必要字段')
              }
            } else {
              errorMsg.push(`目标客户清单，${response.data.return.message}`)
            }
            this.$emit('inprocess', { flag: false, title: '' })
            if (errorMsg.length === 0) {
              this.active += 1
            } else {
              this.$message({
                dangerouslyUseHTMLString: true,
                message: errorMsg.join('<br><br>'),
                type: 'error',
                duration: 9000
              })
            }
          })
        } else {
          this.$message({
            message: '并未上传所有必须清单！',
            type: 'warning'
          })
        }
      } else if (this.active < this.steps.length - 1) {
        this.active += 1
      } else if (this.active === this.steps.length - 1) {
        this.$emit('inprocess', { flag: true, title: '拼命筛选清单中，请稍等' })
        axios.post('/result/list', {
          basefile: this.files.fulllist,
          marketfile: this.files.marketlist,
          targetfile: this.files.targetlist
        }).then((response) => {
          if (response.data.return.code !== 0) {
            this.$message({
              message: response.data.return.message,
              type: 'error'
            })
          } else {
            this.$message({
              message: '成功',
              type: 'success'
            })
            this.result_list = response.data.data
            this.active += 1
          }
          this.$emit('inprocess', { flag: false, title: '' })
        })
      } else {
        this.$message({
          message: '到达了无人可抵达的荒漠',
          type: 'error'
        })
      }
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}?`)
    },
    successUploaded (response, file, fileList) {
      if (response.filename.startsWith('fullList')) {
        this.files.fulllist = response.filename
      } else if (response.filename.startsWith('marketList')) {
        this.files.marketlist = response.filename
      } else if (response.filename.startsWith('targetList')) {
        this.files.targetlist = response.filename
      } else {
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

  a {
    text-decoration: none;
    &:visited {
      text-decoration: none;
    }
    &:hover {
      text-decoration: none;
    }
  }

  .el-tag {
    margin-left: 12px;
    font-size: 14px;
  }

  .lsttitle {
    font-weight: 600;
    font-size: 18px;
  }
}
</style>
