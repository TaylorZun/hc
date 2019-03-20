/*
 * @Description: 语音识别 Automic speech recognition
 * @Author: pxf
 * @Date: 2018-12-17 16:42:55
 * @LastEditTime: 2019-03-07 22:42:44
 * @LastEditors: Please set LastEditors
 * 
 */

const Base = require('./base.js')
const fs = require('fs')
const Multiparty = require('multiparty')
const ffmpeg = require('fluent-ffmpeg')
const AipSpeechServer = require('baidu-aip-sdk').speech

const APP_ID = "15185039"
const API_KEY = "ESn1t8mAiNZlGOfwPqvPUoFl"
const SECRET_KEY = "uNFeWk2RT7ie4GnhmK18qNyRcSWZUsKL"

//新建一个对象，建议只保存一个对象调用服务接口
const client = new AipSpeechServer(APP_ID, API_KEY, SECRET_KEY)



module.exports = class extends Base {

    // async asrvoiceAction() {


    //     //生成multiparty对象，并配置上传目标路径
    //     const form = new Multiparty.Form({
    //         uploadDir: '../../runtime/upload/audio'
    //     })
    //     //上传完成后处理
    //     const req = this.post() //得到录音文件？
    //     form.parse(req, function (err, fields, files) {
    //         const filesTemp = JSON.stringify(files, null, 2);
    //         if (err) {
    //             return this.success({
    //                 ret: -1,
    //                 data: {},
    //                 msg: '未知错误',
    //             })
    //         } else {
    //             const inputFile = files.file[0];
    //             const uploadedPath = inputFile.path;
    //             const command = ffmpeg()
    //             command.addInput(uploadedPath)
    //                 .saveToFile('../../runtime/upload/audio/16k.wav')
    //                 .on('error', function (err) {
    //                     console.log(err)
    //                 })

    //                 .on('end', function () {
    //                     const voices = fs.readFileSync('../../runtime/upload/audio/16k.wav')
    //                     let voiceBuffer = new Buffer(voices)
    //                     client.recognize(voiceBuffer, 'wav', 16000).then(function (result) {
    //                         console.log(result)
    //                         const result2 = JSON.stringify(result)
    //                         const data = []
    //                         if (result.err_no === 0) {
    //                             data = result.result
    //                         }
    //                         return this.success({
    //                             ret: result.err_no,
    //                             data: {
    //                                 data: data
    //                             },
    //                             msg: result.err_msg
    //                         })
    //                     }, function (err) {
    //                         console.log(err)
    //                     })

    //                     //删除上传的音频文件
    //                     fs.unlink(uploadedPath, function (err) {
    //                         if (err) {
    //                             console.log(uploadedPath + '文件删除失败')
    //                         } else {
    //                             console.log('文件删除成功')
    //                         }
    //                     })
    //                     //删除转换格式的
    //                     fs.unlink('../../runtime/upload/audio/16k.wav', function (err) {
    //                         if (err) {
    //                             console.log('.wav delete failed')
    //                         } else {
    //                             console.log('delete successfully')
    //                         }
    //                     })
    //                 })


    //         }
    //     })



    //     // const voice = this.file()
    //     // console.log(voice)
    //     // const uploadedPath = voice.file.File.path




    // }


    async asrbloodAction() {

        //生成multiparty对象，并配置上传目标路径
        const form = new Multiparty.Form({
            uploadDir: '../../runtime/upload/audio'
        })
        //上传完成后处理
        const req = this.post() //得到录音文件？
        console.log(req)
        form.parse(req, function (err, fields, files) {
            const filesTemp = JSON.stringify(files, null, 2);
            const inputFile = files.file[0];
            const uploadedPath = inputFile.path;
            const command = ffmpeg()
            command.addInput(uploadedPath)
                .save(uploadedPath.slice(0, -3) + "wav")
                .on('error', function (err) {
                    console.log(err)
                })

                .on('end', function () {
                    const voices = fs.readFileSync(uploadedPath.slice(0, -3) + "wav");
                    let voiceBuffer = new Buffer(voices)
                    client.recognize(voiceBuffer, 'wav', 16000).then(function (result) {
                        console.log(result)
                        const result2 = JSON.stringify(result)
                       
                        return this.success(result2)
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



        })


    }
}