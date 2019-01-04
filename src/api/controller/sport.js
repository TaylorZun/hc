/*
 * @Description: In User Settings Edit
 * @Author: pxf
 * @Date: 2018-12-01 15:22:14
 * @LastEditTime: 2019-01-04 15:25:07
 * @LastEditors: Please set LastEditors
 */

const Base = require('./base.js')

module.exports = class extends Base {
    async getsportAction() {
        const model = this.model('sports')
        const data = await model.select()
        return this.success(data)
    }
}