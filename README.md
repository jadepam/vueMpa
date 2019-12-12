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
- selenium-webdriver实现e2e测试:npm run e2e
- UI样式回归测试：npm run ui
    ```
    backstop.cmd init
    ```
- karma实现unit测试：npm run unit
- node接口测试：npm run service
