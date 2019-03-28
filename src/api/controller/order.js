/*
 * @Description: 订单管理
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-01-27 07:52:13
 * @LastEditTime: 2019-03-27 08:11:03
 */

 
const Base = require('./base.js')

module.exports = class extends Base {
    async orderlistAction() {
        let res = await this.model('order').select()
        return this.success(res)
    }
}
