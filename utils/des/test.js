/**
 * Created by zrz on 2016/7/25.
 * @version 1.0.0 created DES加解密测试
 */

"use strict";
var crypto = require('crypto');

var key = 'statistics_server';//对称密钥
//明文
var data = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IuW4uOW3nuaQnOaQnOenkeaKgCIsInByaWNlQXJlYUlkIjpudWxsLCJjaXR5SWQiOjMyMDQwMCwiY2l0eU5hbWUiOiLluLjlt57ljJciLCJ3YXJlaG91c2VJZCI6MSwicGxhdGZvcm0iOiJQQyIsImlhdCI6MTQ2OTI2NDM2MiwiZXhwIjoxNDY5MzUwNzYyfQ.HVkHAPPwCan9Ckep6_hTSpSclSL18tJ_F9P6GTid33Y';
var enc = 'des-ede3-cbc';//加密模式：aes-256位密钥-cbc模式
/*  ————    加密  ————    */
var cipher = crypto.createCipher(enc, key);//创建加密实例

//加密后数据
var cipherText = cipher.update(data, 'utf8', 'base64');//参见http://nodejs.cn/api/crypto.html#crypto_cipher_update_data_input_encoding_output_encoding
console.info(cipherText, '\n', cipherText.length);
cipherText += cipher.final('base64');//http://nodejs.cn/api/crypto.html#crypto_cipher_final_output_encoding
console.info(cipherText, '\n 密文长度：', cipherText.length);

/*  ————    解密  ————  */
var decipher = crypto.createDecipher(enc, key);//创建解密实例

//解密后数据
var decipherText = decipher.update(cipherText, 'base64', 'utf8');//加密encode和解密encode互换
console.info(decipherText, '\n', decipherText.length);
decipherText += decipher.final('utf8');//解密的encode
console.info(decipherText, '\n 明文长度：', decipherText.length);

console.info('---  解密后明文是否等于原明文:', decipherText == data, '  ---');
