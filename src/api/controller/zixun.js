/*
 * @Description: 关于医师咨询的相关的查询
 * @Author: your name
 * @Date: 2018-12-23 14:17:21
 * @LastEditTime: 2018-12-23 18:59:41
 * @LastEditors: Please set LastEditors
 */

const Base = require('./base.js')

module.exports = class extends Base {

    async getdoctorlistAction() {
        let model = this.model('doctor')
        let doctorList = await model.select()
        return this.success(doctorList)
    }
}