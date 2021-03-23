---
title: 前端上传图片至S3
date: 2021-03-23 11:34:51
sidebar: 'auto'
categories: 
    - 日常记录
tags: 
    - 图片上传
---

### 研发背景

> 以往的上传图片流程是：前端上传图片到后端，再由后端上传到亚马逊S3服务器。现在优化成前端直接上传到S3，优化流程，减少上传时间。

### 创建上传图片实例

1. 在页面中添加以下代码，引入`WebUploader`，jq，layer等依赖文件

```javascript
<?php
    $this->loadTmplate(TEMPLATE_PATH."house/post/uploaderLink.tpl.php"); // 圖片上傳依賴JS
?>
```
> 注意：因为旧框架引入`jQuery`版本比较多，所以需要把依赖放在页面的最底部，减少`jQuery`版本冲突的影响


2. 在相应位置引入上传的子模板
```javascript
<?php
    $this->loadTmplate(TEMPLATE_PATH."house/houseBlock/post.newUpload.tpl.php");
?>
```

3. 创建webuploader
参考api文档地址：http://fex.baidu.com/webuploader/doc/index.html
源码地址：`tw591/public/lib/webuploader/webuploader.js`

为了统一配置，创建`webuploader`需要统一使`include/javascript/newPublic/createS3Uploader.js`文件配置，基本使用方法，参数配置，事件作用可以查阅上述文档或源码
```javascript
    function initUploader(data){
        var createUploader = require('createS3Uploader')
        uploader = createUploader({
            fileNumLimit: fileNumLimit
        }) 
    }  
    ....
```
### 上传到S3服务器
官方api地址: https://docs.aws.amazon.com/AmazonS3/latest/API/sigv4-authentication-HTTPPOST.html

需引入上传到s3的公共方法文件`include/javascript/newPublic/s3Commonfn.js`

1. 获取aws密钥

由于上传到S3的接口需要policy，signature等秘钥。需要从后端先获取这些秘钥再进行初始化。

```javascript
var s3CommonFn = require('s3Commonfn')  //封装s3相关的公共代码
s3CommonFn.awsSignature(rootUrl, typeText, function (data) {
    initUploader(data)
})
```

2. 上传开始的回调函数`uploadStart`中添加对应的证书秘钥，以及文件路径key值（需要和后端协商好路径地址）

```javascript
uploader.on('uploadStart', function (file) {
    // 生成key值
    function saveImgPath(uploader,uploadPath,filename){
        // 产生随机数并赋值给file
        uploader.options.formData['key'] = uploadPath + '/src_' + filename + '.png'
        file.url = uploadPath + '/' + filename + '.png'
    }

    // 通过uploader.options设置formData,server等信息
    s3CommonFn.addFormData(uploader, file, data, saveImgPath)
})
    s3CommonFn = {
        addFormData: function (uploader, file, data, cb) {
            var _this = this
            uploader.options.server = data.attributes['action']
            uploader.options.formData['acl'] = 'public-read'
            uploader.options.formData['content-type'] = 'image/jpeg'
            uploader.options.formData['X-Amz-Signature'] = data.additionalData['X-Amz-Signature']
            uploader.options.formData['X-Amz-Date'] = data.additionalData['X-Amz-Date']
            uploader.options.formData['X-Amz-Algorithm'] = data.additionalData['X-Amz-Algorithm']
            uploader.options.formData['X-Amz-Credential'] = data.additionalData['X-Amz-Credential']
            uploader.options.formData['policy'] = data.additionalData.Policy

            // 产生随机数并赋值给file
            var uploadPath = data.path
            var fileName = _this.random_filename()
            cb(uploader,uploadPath,fileName)
        },
    }
```

### 功能实现参考
二手家具刊登和修改页的图片上传都已经更新为S3上传方式, 可进行研发参考

模板文件: `tmpl/index/newFurniture/postFurn.tpl.php`

JS 文件: `include/javascript/newPublic/pictureUploader.js`





