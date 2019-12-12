#!/bin/bash
# 打开 pages 文件夹，并创建文件
cd src/pages
for file in $(ls)
do
  if [ $file == $1 ];then
      echo $1' 文件已存在, 请使用其他名字'
      exit
  fi
done
mkdir $1
cd $1
# 生成 index.html
# echo "" > app.html
# echo '<!DOCTYPE html>
#   <html>
#   <head>
#     <meta charset="utf-8">
#     <meta name="viewport" content="width=device-width,initial-scale=1.0">
#     <title></title>
#   </head>
#   <body>
#     <div id="app"></div>
#     <!-- built files will be auto injected -->
#   </body>
# </html>' > app.html

# 生成 App.vue
echo "" > app.vue
echo '<template>
  <div id="app">
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