/*
 * @Description: 关于用药方面 记录 、展示 
 * @Author: pxf
 * @Date: 2018-12-19 10:26:31
 * @LastEditTime: 2018-12-31 11:12:08
 * @LastEditors: Please set LastEditors
 */

const Base = require('./base.js')

module.exports = class extends Base {
    async getmedicineAction() {
        let model = this.model('medicineRecord')
        let medicinedata = await model.select()
        return this.success(medicinedata)
      
    }
}