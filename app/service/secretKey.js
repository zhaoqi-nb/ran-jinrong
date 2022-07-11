/*
 * @FileDescription    : 公共 aes 加密 解密模块  
 * @Author             : lin.li@fengjr.com
 * @Date               : 2018-08-20 14:27:45 
 * @Last Modified by: lin.li@fengjr.com
 * @Last Modified time: 2018-08-20 14:36:46
 */
 
'use strict';
const   crypto = require('crypto'),
        Service = require('egg').Service;

class SecretKey extends Service {
    /**
     * @aes192加密模块
     * @param str string 要加密的字符串
     * @param secret string 要使用的加密密钥(要记住,不然就解不了密啦)
     * @retrun string 加密后的字符串
     * */
    getEncData(str){
        try {
            const secret = this.config.keys;
            let cipher = crypto.createCipher("aes192", secret); //设置加密类型 和 要使用的加密密钥
            let enc = cipher.update(str, "utf8", "hex");    //编码方式从utf-8转为hex;
            enc += cipher.final("hex"); //编码方式从转为hex;
            return enc; //返回加密后的字符串
        } catch (error) {
            return null;    
        }
    }
    /**
     * @aes192解密模块
     * @param str string 要解密的字符串
     * @param secret string 要使用的解密密钥(要和密码的加密密钥对应,不然就解不了密啦)
     * @retrun string 解密后的字符串
     * */
    getDecData(str){
        try {
            const secret = this.config.keys;
            let decipher = crypto.createDecipher("aes192", secret);
            let dec = decipher.update(str, "hex", "utf8");//编码方式从hex转为utf-8;
            dec += decipher.final("utf8");//编码方式从utf-8;
            return dec;
        } catch (error) {
            return null;
        }
    }
}

module.exports = SecretKey;