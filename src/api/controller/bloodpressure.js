/*
 * @Description: 后台血压管理
 * @Author: pxf
 * @Date: 2018-12-21 11:32:13
 * @LastEditTime: 2019-03-07 22:15:46
 * @LastEditors: Please set LastEditors
 */

const Base = require('./base.js')

module.exports = class extends Base {
    async pressurehandAction() {
        var data = this.post()
        const pressure = this.model('bloodpressure')
        const insertId = await pressure.add({
            hypertention: data.highpressure,
            hypotention: data.lowpressure,
            beizhu: data.beizhu,
            add_time: this.getTime(),
            //user_id: this.getLoginUserId
        })
        if(insertId) {
            return this.success('数据保存成功')
        }else {
            return this.fail('数据保存失败')
        }
    }

    async  analyzeAction() {
        const model = this.model('pressureAnalysis')
        const result = await model.select()
        return this.success(result)
    }

    
}