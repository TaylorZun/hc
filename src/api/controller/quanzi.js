/*
 * @Description: 社群圈子相关API——前后台均适用的吧
 * @Author: your name
 * @LastEditors: Please set LastEditors
 * @Date: 2019-02-23 15:43:03
 * @LastEditTime: 2019-03-28 22:37:03
 */

const Base = require('./base.js')

module.exports = class extends Base {

    async quanzidataAction() {
        const type = this.get('type')
        console.log(type)
        const model = this.model('quanzi')
        if(type == 0) {    //这个0 不加引号
            const info = await model.select()
            return this.success(info)
        }else {
            const info = await model.where({'type':type}).select();
            return this.success(info)
        }

        
    }

    async detailAction() {
            const quanziId = this.get('quanziId')
            const info = await this.model('quanzi').where({quanziId:quanziId}).find();
            return this.success(info)
    }
}