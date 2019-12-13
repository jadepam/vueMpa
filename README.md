## vue-mpa多页面配置+自动化测试

### src/pages下快速新建单页面模板
```
 bash page.sh filename
```
### 多页面入口更新脚本
```
bash router.sh 
```
## 测试
- UI样式回归测试：npm run test:ui

- vue-mock:
//"@vue/cli-plugin-unit-mocha": "^4.1.1",
```
 "test:mocha": "vue-cli-service test:unit --reporter mochawesome --reporter-options reportDir=docs/mochawesome,reportFilename=index",
```
- vue-jest
 
//"@vue/cli-plugin-unit-jest": "^4.1.1",
//"jest-serializer-vue": "^2.0.2",
```
"test:jest": vue-cli-service test:unit,

"jest": {
    "preset": "@vue/cli-plugin-unit-jest",
    "collectCoverage": true,
    "collectCoverageFrom": [
      "**/tests/unit/**/*.spec.{j,t}s?(x)",
      "**/__tests__/*.{j,t}s?(x)",
      "!**/node_modules/**"
    ],//覆盖率
    "snapshotSerializers": [
      "jest-serializer-vue"
    ]//快照
  }
```

Karma and Mocha