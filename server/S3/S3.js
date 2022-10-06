//------------------------------------------S3 연결 설정
const multer = require('multer');
const AWS = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');

const {accessKey}  = require('./../awsAccessKey.js'); //엑세스 키

const s3 = new AWS.S3(accessKey)

exports.uploadS3 = multer({
  storage : multerS3({
      s3:s3,
      bucket:'sihcollab', //S3버킷 이름
      key : function(req, file, cb) {
          var ext = file.mimetype.split('/')[1];
          if(!['png', 'jpg', 'jpeg', 'gif', 'bmp'].includes(ext)) {
              return cb(new Error('Only images are allowed'));
          }
          cb(null, 'docPic/' + Date.now() + '.' + file.originalname.split('.').pop()); // 넣을 파일 이름 설정
      }
  }),
  acl : 'public-read-write',
  limits: { fileSize: 5 * 1024 * 1024 }, // 크기 제한
});