/*
 * @Description: 后台管理系统专用接口————】用户基本信息---用户数据--用户权限
 * @Author: pxf
 * @LastEditors: Please set LastEditors
 * @Date: 2019-01-22 00:13:12
 * @LastEditTime: 2019-02-27 13:06:33
 */


//  今天收获是：当有一个action是错误的，要把它移栽下面。注意重启。

 const Base = require('./base.js')

 module.exports = class extends Base {
     
     async userlistAction() {
         let model = this.model('users')
         let userlist = await model.select()
         return this.success(userlist)
     }


     async bloodAction() {
         let model = this.model('bloodpressure')
         //两个表相连哦
         let bloodpressure = await model.join('users on userid=user_id').select()
         return this.success(bloodpressure)
        

     }



     async sugardataAction() {
         let model= this.model('sugardata')
         let sugardata = await model.join('users on userid=user_id').select()
         return this.success(sugardata)
     }

     async gettieziAction() {
         let model = this.model('tiezi')
         let tiezilist = await model.select()
         return this.success(tiezilist)
     }

    
    async updateuserAction() {
        let model = this.model('users')
        const userid1 = this.get('userid')
        const userid = parseInt(userid1)
        const identity = this.get('identity')
        const tel = this.get('tel')
        const age = this.get('age')
        const email = this.get('email')
        let affectedRow = await model.where({userid : userid }).update({
            identity :identity,
            tel : tel,
           //  'age': age,
           //  'email' : email,
        })
       //  return this.success(affectedRow)
    }

     


     
 }
