/*
 * @Description: 部署打包后的静态资源文件到七牛cdn
 * @Author: LiuZhen
 * @Date: 2019-01-24 17:11:12
 * @Last Modified by: LiuZhen
 * @Last Modified time: 2019-01-25 14:16:39
 */
const fs = require('fs');
const qiniu = require('qiniu');

// 授权秘钥
const accessKey = `G3XeV8kr7iu0JgXiP355hYY67TijAqZXaTT3mV2b`;
const secretKey = `Uvo5AFXku7iWGvpGJ_qYenzu_N83MS4mt_HmmMXX`;

// 存储空间名称
const bucket = `cdn-static`;

// 要上传的资源目录
const staticPath = `dist/static`;

// 上传之后的文件前缀
const prefix = `ET-FE/dp/static`;

// 创建鉴权对象
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

// 创建并修改配置对象(Zone_z0=华东 Zone_z1=华北 Zone_z2=华南 Zone_na0=北美)
const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;

// 创建额外内容对象
const putExtra = new qiniu.form_up.PutExtra();

// 创建表单上传对象
const formUploader = new qiniu.form_up.FormUploader(config);

/**
 * @description 定义单个文件上传方法
 * @param {*} localFile 
 */
const uploadFile = function(localFile) {
  // 配置上传到七牛的完整路径
  const key = localFile.replace(staticPath, prefix);
  const options = {
    scope: `${bucket}:${key}`
  }
  const putPolicy = new qiniu.rs.PutPolicy(options);

  // 生成上传凭证
  const uploadToken = putPolicy.uploadToken(mac);

  // 上传文件
  formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr, respBody, respInfo) {
    if (respErr) throw respErr;
    console.log(`已上传：${respBody.key}`);
  })
}

/**
 * @description 定义上传文件夹方法
 * @param {*} dirPath 
 */
const uploadDirectory = function(dirPath) {
  fs.readdir(dirPath, function(err, files) {
    if (err) throw err;
    // 遍历目录下的内容
    files.forEach(item => {
      let path = `${dirPath}/${item}`;
      fs.stat(path, function(err, stats) {
        // 是目录就继续遍历，否则上传
        if (stats.isDirectory()) {
          uploadDirectory(path);
        } else {
          uploadFile(path, item);
        }
      })
    })
  })
}

// 判断目录是否存在，存在开始上传
fs.exists(staticPath, function(exists) {
  if (!exists) {
    console.log('目录不存在');
  } else {
    console.log('开始上传...');
    uploadDirectory(staticPath);
  }
})