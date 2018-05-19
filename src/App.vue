<template>
  <div id="app" class="el-container is-vertical">
    <div id="header" class="el-header">
      header dayo!
    </div>
    <div class="el-container">
      <div id="sidebar" class="el-aside">
        sidebar dayo!
      </div>
      <div id="main" class="el-main">
        <pre class="language-javascript line-numbers">
          <code>
            const a = {}
          </code>
        </pre>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
