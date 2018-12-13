/*
 * @Description: In User Settings Edit
 * @Author: pxf
 * @Date: 2018-12-01 15:49:00
 * @LastEditTime: 2018-12-12 22:52:49
 * @LastEditors: your name
 */

const Base = require('./base.js')

module.exports = class extends Base {
    async indexAction(){
        const baaner = await this.model('topic').limit(3).select();
    };

}