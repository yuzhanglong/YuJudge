const uploader = require("qiniu");
const fs = require('fs');
const paths = require('../config/paths');

const MIME_TYPE_MAP = {
  "css": "text/css",
  "ico": "image/x-icon",
  "jpe": "image/jpeg",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "application/javascript",
  "svg": "image/svg+xml",
  "json": "application/json",
  "woff2": "font/woff2"
}

// 打包完成文件路径
const BUILD_PATH = paths.appBuild;
const BUILD_MANIFEST_JSON_PATH = `${BUILD_PATH}/asset-manifest.json`;

// 上传凭证以及配置
const ACCESS_KEY = 'o4fgM7P2lPEyo3FZ7s_N已作废Gdo_xJVNDdKf55apCubX';
const SECRET_KEY = 'YxRkcS8o-GSLMo1ajWu已作废LjeFxFsMo1WKnOvyrLjB8';
const options = {
  scope: "yzlyzl123",
};
let config = new uploader.conf.Config();
// 空间对应的机房
config.zone = uploader.zone.Zone_z2;


let mac = new uploader.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
let putPolicy = new uploader.rs.PutPolicy(options);
let uploadToken = putPolicy.uploadToken(mac);
let formUploader = new uploader.form_up.FormUploader(config);

// 需要读取的json文件
let manifest = JSON.parse(fs.readFileSync(BUILD_MANIFEST_JSON_PATH).toString());

// 获取 mimeType
const getMimeType = (fileName) => {
  let fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
  let type = MIME_TYPE_MAP[fileExtension];
  return type ? type : "application/javascript";
}

// 文件上传
const uploadFile = (key, localFile) => {
  let putExtra = new uploader.form_up.PutExtra(
    null,
    null,
    getMimeType(key)
  );

  formUploader.putFile(uploadToken, key, localFile, putExtra, (respErr, respBody, respInfo) => {
    if (respErr) {
      throw respErr;
    }
    if (respInfo.statusCode === 200) {
      console.log(localFile + "上传成功");
    } else {
      console.log(respInfo.statusCode);
      console.log(respBody);
    }
  });
}

for (let key in manifest.files) {
  if (manifest.files.hasOwnProperty(key) && !manifest.files[key].endsWith(".gz")) {
    let filePath = "";
    filePath = BUILD_PATH + manifest.files[key];
    uploadFile(manifest.files[key].slice(1), filePath);
  }
}