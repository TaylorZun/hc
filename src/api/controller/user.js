/*
 * @Description: 后台管理系统专用接口————】用户基本信息---用户数据--用户权限
 * @Author: pxf
 * @LastEditors: Please set LastEditors
 * @Date: 2019-01-22 00:13:12
 * @LastEditTime: 2019-03-19 23:37:30
 */


//  今天收获是：当有一个action是错误的，要把它移栽下面。注意重启。

 const Base = require('./base.js')

 module.exports = class extends Base {
     
    //获取及查询数据
     async userlistAction() {
        //  const data = this.post()  //新增的时候用到
         const query = this.get()
         console.log(query)
         let model = this.model('users')
         let userlist = await model.select()
         return this.success(userlist)
     }

//获取血压数据
     async bloodAction() {
         let model = this.model('bloodpressure')
         //两个表相连哦
         let bloodpressure = await model.join('users on userid=user_id').select()
         return this.success(bloodpressure)

     }


//获取血糖
     async sugardataAction() {
         let model= this.model('sugardata')
         let sugardata = await model.join('users on userid=user_id').select()
         return this.success(sugardata)
     }

     
//获取帖子数据
     async gettieziAction() {
         let model = this.model('tiezi')
         let tiezilist = await model.select()
         return this.success(tiezilist)
     }

//修改用户基本信息
    async updateuserAction() {
        const data = this.post('params')
        let model = this.model('users')
        console.log(data)
        const userid = data.userid
     let affectedRow =  await model.where({userid:userid }).update({
            identity :data.identity,
            tel : data.tel,
            age: data.age,
            email : data.email,
        })
          return this.success(affectedRow)
    }

     


     
 }
