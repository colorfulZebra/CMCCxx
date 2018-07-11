<template>
  <div id="app" v-loading="inprocess.flag" :element-loading-text="inprocess.title" element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-container>
      <el-header>
        <i class="el-icon-news"></i>
        {{ title }}
      </el-header>
      <el-container>
        <el-aside style="width: 220px">
          <el-menu :default-active="$route.path" background-color="#EBEDF3" @select="recordReport" router>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>所有清单报表</span>
              </template>
              <el-menu-item-group>
                <template slot="title">2018年分组</template>
                <el-menu-item index="/dailylist1">流量风暴清单</el-menu-item>
                <el-menu-item index="1-2">报表清单other</el-menu-item>
                <el-menu-item index="1-3">报表清单last</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view @inprocess="updateInprocess"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      title: '西咸自助分析平台',
      inprocess: {
        flag: false,
        title: ''
      },
      menuidx: null
    }
  },
  mounted () {
  },
  methods: {
    recordReport (idx) {
      this.menuidx = idx
    },
    updateInprocess (inprocessNew) {
      this.inprocess = inprocessNew
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;

  .el-container {
    width: 100%;
    height: 100%;
  }

  .el-header {
    background: #303643;
    font-size: 18px;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 36px;
    text-align: left;
    padding: {
      top: 10px;
      left: 48px;
      right: 48px;
    }
    i {
      margin: 5px;
    }
  }

  .el-aside {
    text-align: left;
    line-height: 200px;
    background-color: #EBEDF3;
    height: 100%;
    .el-menu {
      box-shadow: 0 1px 0 0 rgba(0,0,0,0.33);
      min-height: 500px;
      height: 100%;
    }
  }

  .el-main {
    margin: 5px;
    padding: 10px;
  }
}
</style>
