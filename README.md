[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

### 国安广视前端

### Start
>* npm i
>* npm start

### 模块开发
#### 1.菜单配置
菜单的配置在src/consts/menu.js中，默认是顶部一级菜单的配置，
MENUS是具体各模块下的左侧菜单配置。
比如我要开发洞察分析>电视概况>用户覆盖模块。
在对应的模块下'ia'下，电视概况的children中添加用户覆盖配置。
```
{
      key: 'overview',
      name: '电视概况',
      icon: 'appstore',
      children: [
        {key: 'userCover', name: '用户覆盖'},
      ]
    },
```
#### 2.界面配置
所有的界面都在src/routes下，按需求建立相应的文件夹，
在洞察分析电视概况下新建用户覆盖模块：
src/routes/insightAnalysis/overview/UserCover.js
具体内容可以查看该文件，
由于右侧的界面大多数类似，都是采用条件框、图表、列表的方式呈现，因此可以抽出几个模板，满足快速开发。
模板放在src/routes/insightAnalysis/template下。

#### 3.映射配置
1、2步完成后，需要把节目和菜单关联起来，代码如下，详情见src/router.js
```
  genRoute(app, '/ia/overview/userCover', require('./models/insightAnalysis/common'), require('./routes/insightAnalysis/overview/UserCover')),
```
至此就完成了一个模块的开发。
