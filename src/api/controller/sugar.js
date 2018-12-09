const Base = require('./base.js')

module.exports = class extends Base {
    /**
     * sssss
     */
    async sugarhandAction() {
        const sugardata = this.post(data.sugardata)
        const timedian = this.post(data.timedian)
        const beizhu = this.post(data.beizhu)
        const buffer = Buffer.from(beizhu)
        const insertId = await this.model('sugarrecord').add({
            sugardata: sugardata,
            timedian: timedian,
            beizhu: buffer.toString('base64'),
            add_time: this.getTime(),
            user_id: this.getLoginUserId
        })

        if(insertId) {
            return this.success('数据保存成功')
        } else {
            return this.fail('数据保存失败')
        }
    }
}