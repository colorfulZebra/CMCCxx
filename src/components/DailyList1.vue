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
      <el-col :span="23" :offset="1">
        <span class="lsttitle">全量数据清单:</span> 西咸新区全量客户基础清单，包含字段xxx、xxx、xxx
        <el-upload
         action="/api/upload"
         :before-remove="beforeRemove"
         :limit="1">
          <a href="javascript:void(0)">点击上传</a>
        </el-upload>
      </el-col>
      <el-col :span="23" :offset="1" style="margin-top: 60px">
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
      <el-col :span="24">
        <el-button round v-for="(tg, idx) in deletedTags" :key="tg.title" :type="tg.type" @click="selectTag(idx)">{{ tg.title }}</el-button>
      </el-col>
      <el-col :span="22" :offset="1" style="margin-top: 30px;">
        说明<br><br>
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
      active: 0,
      deletedTags: [
        { type: 'primary',
          title: '不可营销产品',
          codes: [
            '99110156', '99428003', '99084001', '10284001', '99086061', '99086102', '99086081', '99086101', '99086161',
            '99086121', '10522001', '99220035', '10230014', '99999999', '99110073', '10082003', '10082004', '10082005',
            '10082006', '10225039', '99620003', '99160003', '10101001', '99110151', '99220056', '99220055', '99220053',
            '10106001', '10085001', '99225001', '10283003', '99086001', '99085007', '99220019', '10082001', '10082002',
            '99999310', '99081001', '10225002', '10224005', '10082008', '99160001', '99480002', '29184028', '29184148',
            '99250001', '99250002', '29083673', '13283004', '29183021', '13283003', '19105003', '19081001', '11081001',
            '13081001', '14081001', '17081001', '15081001', '29281500', '99428001', '12081001', '16081001', '10081001',
            '14085001', '14282005', '19282002', '19225002', '29282669', '29282080', '29282575', '11082007', '13282006',
            '12282008', '14282001', '14282004', '16282008', '16282003', '16282002', '16282009', '16282007', '11082002',
            '16282005', '13282003', '29282553', '13282002', '11082003', '29270001', '19225003', '12282003', '29282570',
            '29282582', '17082001', '29282581', '13282001', '29282001', '13282004', '19282001', '12282002', '15282007',
            '16282006', '16282001', '16282011', '99086021', '99999313', '29225037', '99086041', '99110119', '99110111',
            '99160002', '99083100', '99083102', '99083101', '99086181', '99086141', '99530015', '99530016', '99530017',
            '99530018', '99530033', '99530034', '99530035', '99530036', '99530038'
          ]
        },
        { type: 'success', title: '小号副卡' },
        { type: 'info', title: '必剔优惠' },
        { type: 'warning', title: '必剔营销包' },
        { type: 'danger', title: '预约不可营销产品' },
        { type: 'primary', title: '已办理' },
        { type: 'success', title: '集团' },
        { type: 'info', title: '办理模组' },
        { type: 'danger', title: '往欠' }
      ],
      explainStr: ''
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
    },
    selectTag (idx) {
      switch (idx) {
        case 0:
          this.explainStr = `产品编码为 "${this.deletedTags[idx].codes.join(' ')}" 的用户`
          break
        case 1:
          break
        case 2:
          break
        case 3:
          break
        case 4:
          break
        case 5:
          break
        case 6:
          break
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
    &:hover {
      cursor: pointer;
    }
  }

  .lsttitle {
    font-weight: 600;
    font-size: 18px;
  }
}
</style>
