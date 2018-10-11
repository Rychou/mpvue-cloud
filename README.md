# 一、前言

这两天在用踩坑了一下小程序云开发，用mpvue、vant组件库、wux组件库、小程序云开发开发了一款小程序。算是初试云开发了，所以总结一下使用上的注意事项。

这个是我用云开发写的一个小程序，欢迎大家使用，提供建议。

 猫叫助手 | 收录各种猫叫声，帮助与猫咪交流，分享一些养猫的小知识等。

![猫叫助手](https://camo.githubusercontent.com/32afa7cb4169b88b97df5fc509efbc0f70429e45/68747470733a2f2f692e6c6f6c692e6e65742f323031382f31302f31302f356262646130613938396439652e6a7067)


# 二、开启云开发功能

> 确保你的微信开发工具是最新版的
> [小程序云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

### 1. 注册一个小程序账号

小程序云开发必须有小程序AppId才能使用，所以首先应先注册一个小程序账号（如果已有请忽略）。记录下`设置->开发设置`中的小程序`AppId`

### 2. 用`mpvue`初始化一个项目

>参考：[mpvue官方文档](http://mpvue.com/mpvue/)

```shell
# 全局安装 vue-cli
$ npm install --global vue-cli

# 创建一个基于 mpvue-quickstart 模板的新项目
$ vue init mpvue/mpvue-quickstart my-project

# 安装依赖
$ cd my-project
$ npm install
# 启动构建
$ npm run dev
```

### 2. 在微信开发者工具中新建项目

新建项目选择的目录为`dist`目录，然后填写刚刚注册的小程序的`AppId`。

打开项目之后，可以发现开发者工具中多了个云开发的按钮。点击之后，安装提示配置，就可以了。微信默认免费提供开发者一个服务器进行云开发，对于小型程序来说是够用了。

# 三、正式使用云开发

### 1. 开发前的配置

首先在`src/main.js`文件添加以下语句。

```js
wx.cloud.init({
  traceUser: true
})
```

必须要初始化才能使用云开发，`traceUser`决定是否在将用户访问记录到用户管理中，在控制台中可见。

### 2. 初试数据库

云开发的数据库是一个`JSON`数据库，这里使用了查询数据的功能。

**添加数据**

首先得有数据，你可以在程序里进行插入数据（提交表单时使用）（[参考云开发的文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/database.html)），也可以手动的在云开发控制台中插入数据。

我直接在控制台插入数据好了。

在控制台的数据库中，`点击添加集合->填入集合名称->在集合中点击添加纪录->添加所需的数据`。这种插入数据的方式，是不带有用户态的(`openId`)，如果你的权限设置是管理员可读的话，那是没办法读取到信息的，因为没有openId，没办法识别你的身份。

![未命名1539162118.png](https://i.loli.net/2018/10/10/5bbdc013b0a56.png)

> 千万记住，要考虑你的集合数据的使用范围进行`权限设置`，比如我添加的是`article`文章，那这是公开的。那我就应该在权限设置中修改为`所有用户可读、仅管理员可写`，默认的是`仅创建者及管理员可读写`。
> ![img](https://i.loli.net/2018/10/10/5bbdc14657bc5.png)

**查询数据**

```js
mounted{
  // env是你云开发的环境id。
  const db = wx.cloud.database({ env: 'meow-helper-1b5609' })
  this.db.collection('article').get()
  .then(res=>{
    console.log(res.data)
    // 可以进行数据初始化
  })
  .cathc(console.error)
}
```

可以看到，使用方法很简单，当然你也可以使用回调的方式查询数据，具体参考云开发文档。

### 3. 云开发下的登录流程

云开发大大简化了登录流程，因为每当有用户访问时，都会在云开发控制台留下该用户的`openId`。所以，我处理登录流程如下：

- 使用`<button></button>`组件获取用户授权
- 使用云函数从后端返回用户`openId` (待会会讲如何使用云函数)
- 如果同时有`openId`以及用户是否授权，那么就登录了

若用户授权了，那么你能在云开发控制台的用户管理中看到用户信息，否则只能看到一条记录以及`openId`

![未命名1539170221.png](https://i.loli.net/2018/10/10/5bbddfb7a81c9.png)

### 4.云函数的使用

这里讲解如何通过云函数返回用户的`openId`

**配置云函数根目录**

在`/static`目录下创建目录`funtions`，然后在`project.config.json`文件下新增字段

```json
{
  "cloudfunctionRoot": "/static/functions/"
}
```

注意：这可能在编译后不会生效，保险起见，应在`npm run dev`后检查`dist/project.config.json`文件，看看刚刚的字段是否添加成功，如果没有，请在`dist/project.config.json`中也添加上述字段。

**新增云函数**

新增云函数这一步必须得在微信开发者工具中进行。

1. 打开开发者工具
2. 在编辑器窗口下，右键`/static/funtions`，选择新建Node云函数
3. 填写云函数名,如`user`，回车。
4. 在弹出的窗口中，会询问你是否安装`wx-server-sdk`，点击确定（如果安装没有进行，可以自己手动在命令行中运行`npm install`）

完成以上步骤后就可以在`index.js`中编写云函数了。以下的云函数代码用于返回用户`openId`

```js
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  return event.userInfo
}
```
编写完成后，一定要记得右键云函数目录，选择上传并部署之后，才能使用云函数。

**使用云函数**

```js
// 调用云函数，返回用户openId，参数为云函数名称
wx.cloud.callFunction({ name: 'user' }).then(res => {
          console.log(res)
	  // 更新store中的openId
          this.$store.commit('updateOpenId', res.result)
          return this.WXP.getSetting()
        })
        .then(res => {
	  // 检验是否授权
          const authUserInfo = res.authSetting['scope.userInfo']
          if (authUserInfo) {
            this.$store.commit('updateAuthUserInfo', authUserInfo)
          }
        })
        .catch(err => console.error(err))
```

### 5.存储的使用

云开发的存储具有上传，下载，删除等功能，具体可以查看[云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/guide/storage.html)。

它支持直接在`<image/>`,`<audio/>`等组件中直接使用云文件id。接下来演示一下。

首先我们手动在云存储中上传一张图片，然后复制其`fileId`
![未命名1539172169.png](https://i.loli.net/2018/10/10/5bbde7553e963.png)

在需要用到的地方引入即可：

```html
<image src="cloud://meow-helper-1b5609.6d65-meow-helper-1b5609/img/13.png"/>
```

# 四、总结

小程序云开发是属于最近刚出来的技术，目的是为了简化小程序的开发。特别适合于业务逻辑简单，功能不复杂的小程序。对于那些比如说电商平台等业务逻辑复杂的小程序，目前来说可能不适合了。


