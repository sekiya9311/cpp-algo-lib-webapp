<template>
  <div id="app" class="el-container is-vertical">
    <div id="header" class="el-header">
      header dayo!
      <input-token-dialog />
    </div>
    <div class="el-container">
      <div id="sidebar" class="el-aside">
        sidebar dayo!
        <repository-tree />
      </div>
      <div id="main" class="el-main">
        <pre>
          <code class="language-cpp">
            #include <bits/stdc++.h>
            using namespace std;
            int main() {
              cout << "Hello World!" << endl;
              return 0;
            }
          </code>
        </pre>
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import InputTokenDialog from './components/InputTokenDialog'
import RepositoryTree from './components/RepositoryTree'
export default {
  name: 'App',
  components: {
    InputTokenDialog,
    RepositoryTree
  }
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
