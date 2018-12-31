/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2018-12-01 14:53:31
 * @LastEditTime: 2018-12-31 15:04:04
 * @LastEditors: Please set LastEditors
 */

const Base = require('./base.js')

module.exports = class extends Base {
    
    async msghistoryAction(){
        let model =  this.model('msghistory')
        let messageList = await model.select()
        return this.success(messageList)
    }
}