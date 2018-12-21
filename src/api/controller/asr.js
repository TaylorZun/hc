/*
 * @Description: 语音识别 Automic speech recognition
 * @Author: pxf
 * @Date: 2018-12-17 16:42:55
 * @LastEditTime: 2018-12-18 18:04:13
 * @LastEditors: Please set LastEditors
 * 
 */

const Base = require('./base.js')
const fs = require('fs')
const Multiparty = require('multiparty')
const ffmpeg = require('fluent-ffmpeg')
const AipSpeechServer = require('baidu-aip-sdk').speech



module.exports = class extends Base {

    async asrvoiceAction() {

        const APP_ID = "15185039"
        const API_KEY = "ESn1t8mAiNZlGOfwPqvPUoFl"
        const SECRET_KEY = "uNFeWk2RT7ie4GnhmK18qNyRcSWZUsKL"
    
        //新建一个对象，建议只保存一个对象调用服务接口
        const client = new AipSpeechServer(APP_ID, API_KEY, SECRET_KEY)
        const voice = this.file()
        console.log(voice)
        const uploadedPath = voice.file.File.path
        const command = ffmpeg()
        command.addInput(uploadedPath)
            .saveToFile('../../runtime/upload/audio/16k.wav')
            .on('error', function (err) {
                console.log(err)
            })
            .on('end', function () {
                const voices = fs.readFileSync('../../runtime/upload/audio/16k.wav')
                let voiceBuffer = new Buffer(voices)
                client.recognize(voiceBuffer, 'wav', 16000).then(function (result) {
                    const data = []
                    if (result.err_no === 0) {
                        data = result.result
                    }
                }, function (err) {
                    console.log(err)
                })

                //删除上传的音频文件
                fs.unlink(uploadedPath, function (err) {
                    if (err) {
                        console.log(uploadedPath + '文件删除失败')
                    } else {
                        console.log('文件删除成功')
                    }
                })
                //删除转换格式的
                fs.unlink('../../runtime/upload/audio/16k.wav', function (err) {
                    if (err) {
                        console.log('.wav delete failed')
                    } else {
                        console.log('delete successfully')
                    }
                })
            })


    }
}