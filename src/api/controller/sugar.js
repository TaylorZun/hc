/*
 * @Description: 关于血糖的数据
 * @Author: pxf
 * @Date: 2018-12-08 17:03:19
 * @LastEditTime: 2019-01-13 22:17:56
 * @LastEditors: Please set LastEditors
 */

const Base = require('./base.js')

module.exports = class extends Base {
    /**
     * 保存提交上来的血糖数据到数据库
     */
    async sugarhandAction() {
        var data = this.post() ///获取到提交上来的所有数据
        console.log(data)
        // const beizhu = data.beizhu
        //  const buffer = Buffer.from(beizhu)
        const sugar = this.model('sugardata')
        const insertId = await sugar.add({
            sugardata:data.sugardata,
            timedian:data.timedian,
            // beizhu: buffer.toString('base64'),哈哈哈这个地方暂时不需要了
             beizhu: data.beizhu,
            add_time: this.getTime(),
            //user_id: this.getLoginUserId
        })
        console.log(insertId)

        if (insertId) {
            return this.success('数据保存成功')
        } else {
            return this.fail('数据保存失败')
        }
    }
    
    async getsugarAction(){
        const model = this.model('sugardata')
        const sugar = await model.order('id DESC').select()
        return this.success(sugar)
    }
    /**
     * 对血糖数据分析处理
     */
    async sugaranalyzeAction(){
       
            const model = this.model('sugaranalysis')
            const result = await model.select()
            return this.success(result)
        
    }
}