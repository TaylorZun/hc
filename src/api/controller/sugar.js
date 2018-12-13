/*
 * @Description: In User Settings Edit
 * @Author: pxf
 * @Date: 2018-12-08 17:03:19
 * @LastEditTime: 2018-12-13 15:51:43
 * @LastEditors: Please set LastEditors
 */

const Base = require('./base.js')

module.exports = class extends Base {
    /**
     * sssss
     */
    async sugarhandAction() {
        let data = this.post()  ///获取到提交上来的所有数据
        console.log(data)
        const sugardata = this.post(data.sugardata)
        const timedian = this.post(data.timedian)
        const beizhu = this.post(data.beizhu)
        // const buffer = Buffer.from(beizhu)
        const insertId = await this.model('sugardata').add({
            sugardata: sugardata,
            timedian: timedian,
            // beizhu: buffer.toString('base64'),
            beizhu: beizhu,
            add_time: this.getTime(),
            //user_id: this.getLoginUserId
        })

        if (insertId) {
            return this.success('数据保存成功')
        } else {
            return this.fail('数据保存失败')
        }
    }
}