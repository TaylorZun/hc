/*
 * @Description: In User Settings Edit
 * @Author: pxf
 * @Date: 2018-12-01 15:58:19
 * @LastEditTime: 2018-12-04 10:52:30
 * @LastEditors: Please set LastEditors
 */

module.exports = class extends think.Controller {
    async _before() {
        //根据token获取用户的id
        //header部分是与小程序中utils文件里面封装的微信request的header部分相对应的
        this.ctx.state.token = this.ctx.header['x-hc-token'] || ''
        const tokenService = think.service('token', 'api')
        this.ctx.state.userId = await tokenService.getUserId(this.ctx.state.token)
             
        //下面的设置与config里面的配置相呼应
        const publicController = this.config('publicController')
        const publicAction = this.config('publicAction')
        //如果是非公开，则验证用户是否登录
        const controllerAction = this.ctx.controller + '/' + this.ctx.action
        if(!publicController.includes(this.ctx.controller) && !publicAction.includes(controllerAction)) {
            if(this.ctx.state.userId <= 0) {
                return this.fail(401, '请先登录')
            }
        }
    }

    /**
     * 获取时间戳
     * @returns {number}
     */
    getTime() {
        return parseInt(Date.now() / 1000)
    }

    /**
     * 获取当前登录用户的id
     * @returns {*}
     */
    getLoginUserId() {
        return this.ctx.state.userId
    }
}