# vue_shop

## Project init
```
npm init -y
```

## Project setup
```
npm install
```

## Project visual develop
```
vue ui
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Deploy the product

#### 1、通过node创建服务器 app.js
```
// 启动服务 node app.js
// 通过express创建服务器：npm i express -S
const express = require('express')
// 开启gzip压缩：npm i compression -D
const compression = require('compression')
const app = express()

// 一定要在托管静态资源之前调用 gzip 中间件
app.use(compression())
app.use(express.static('./dist'))

app.listen(80, () => {
  console.log('Server running at http://127.0.0.1')
})
```
#### 2、使用pm2管理应用
```
输入命令：npm i pm2 -g
启动项目：pm2 start app.js --name 自定义名称
查看项目列表命令：pm2 ls
重启项目：pm2 restart 自定义名称或ID
停止项目：pm2 stop 自定义名称或ID
删除项目：pm2 delete 自定义名称或ID
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Have a try

Click to view [电商后台管理系统](http://shop.liulongbin.top/)
