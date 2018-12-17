/*
 * @Description: 语音识别 Automic speech recognition
 * @Author: pxf
 * @Date: 2018-12-17 16:42:55
 * @LastEditTime: 2018-12-17 17:58:59
 * @LastEditors: Please set LastEditors
 * 
 */

 const Base = require ('./base.js')
 const fs = require('fs')
 const Multiparty = require('multiparty')
 const ffmpeg = require('fluent-ffmpeg')
 const AipSpeechServer = require('baidu-aip-sdk').speech

 const APP_ID = "15185039"
 const API_KEY = "ESn1t8mAiNZlGOfwPqvPUoFl"
 const SECRET_KEY = "uNFeWk2RT7ie4GnhmK18qNyRcSWZUsKL"
 

 module.exports = class extends Base {

    async asrAction() {
        //新建一个对象，建议只保存一个对象调用服务接口
        const client = new AipSpeechServer(APP_ID, API_KEY, SECRET_KEY)
        const voice = this.file()

    }
 }
