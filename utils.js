var path = require('path')
var glob = require('glob')
var PAGE_PATH = path.resolve(__dirname,'./src/pages')
const titles = require('./title.js')
//多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在
// 那么就作为入口处理
console.log(PAGE_PATH,"PAGE_PATH")
exports.entries = function () {
    var entryFiles = glob.sync(PAGE_PATH + '/*/app.js')
    var map = {}
    entryFiles.forEach((filePath) => {
        var filename = filePath.split('/src/pages/')[1].split('/app.js')[0]
        const chunkFirstName = filename.split('/')[0]
        if (chunkFirstName === 'index') {
          map[filename] = {
            entry: filePath,
            // template: '/src/pages/index/index.html',
            title: titles[filename],
            chunks: ['chunk-vendors', 'chunk-common', filename]
         }
        }else{
         map[filename] = {
            entry: filePath,
            template: 'public/index.html',
            title: titles[filename],
            chunks: ['chunk-vendors', 'chunk-common', filename]
         }
        }
       
    })
    return map
}
