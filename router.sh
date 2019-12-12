#!/bin/bash
# 打开 pages 文件夹，并创建文件
cd src/pages

for file in $(ls)
do
  if [ $file != 'index' ];then
      html=$html'<p><a href="http://localhost:8080/'$file'">'$file'</a></p>'
  fi
done

cd index
# 生成 App.vue
echo "" > app.vue
echo '<template>
  <div id="app">
  <h1>多页面入口</h1>
  '$html'
  </div>
</template>

<script>
export default {
  name: "App"
}
</script>

<style>
#app {}
</style>' > app.vue

# 生成 index.js
echo "" > app.js
echo "import Vue from 'Vue'
import app from './app.vue'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(app)
})" > app.js




