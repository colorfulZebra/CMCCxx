<template>
  <div id="mainContainer">
    <h1>{{ welcome }}{{ currTime }}</h1>
  </div>
</template>

<script>
export default {
  name: 'MainContainer',
  data () {
    return {
      welcome: '欢迎使用，现在是',
      currTime: this.$moment().format('MMMDo,a h:mm:ss')
    }
  },
  mounted () {
    setInterval(() => {
      this.currTime = this.$moment().format('MMMDo,a h:mm:ss')
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
#mainContainer {
  h1 {
    margin-top: 18%;
    font-size: 36px;
    font-weight: 700;
  }
}
</style>
