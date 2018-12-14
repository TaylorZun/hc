/*
 * @Description: In User Settings Edit
 * @Author: pxf
 * @Date: 2018-12-08 17:03:19
 * @LastEditTime: 2018-12-14 17:25:18
 * @LastEditors: Please set LastEditors
 */

const Base = require('./base.js')

module.exports = class extends Base {
    /**
     * sssss
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
}