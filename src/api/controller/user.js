/*
 * @Description: 后台管理系统专用接口————】用户基本信息---用户数据--用户权限
 * @Author: pxf
 * @LastEditors: Please set LastEditors
 * @Date: 2019-01-22 00:13:12
 * @LastEditTime: 2019-03-27 01:04:19
 */


//  今天收获是：当有一个action是错误的，要把它移栽下面。注意重启。

const Base = require('./base.js')

module.exports = class extends Base {

    //获取及查询数据
    async userlistAction() {
        const query = this.post('params')
        //  console.log(query)
        let model = this.model('users')
        if (query == undefined) {
            let userlist = await model.select()
            return this.success(userlist)
        } else if (query.gender == undefined && query.username != undefined) {
            let userlist = await model.where({
                username: query.username
            }).select()
            return this.success(userlist)
        } else if (query.username == undefined && query.gender != undefined) {
            let userlist = await model.where({
                gender: query.gender
            }).select()
            return this.success(userlist)
        } else {
            let userlist = await model.where({
                username: query.username,
                gender: query.gender
            }).select()
            return this.success(userlist)
        }
    }

    //修改用户基本信息
    async updateuserAction() {
        const data = this.post('params')
        let model = this.model('users')
        // console.log(data)
        const userid = data.userid
        let affectedRow = await model.where({
            userid: userid
        }).update({
            identity: data.identity,
            tel: data.tel,
            age: data.age,
            email: data.email,
        })
        if (affectedRow) {
            let userlist = await this.model('users').select()
            return this.success(userlist)
        }
    }

    //删除某个用户
    async removeuserAction() {
        const id = this.post('params')
        let affectedRow = await this.model('users').where({
            userid: id.id
        }).delete()
        if (affectedRow) {
            let userlist = await this.model('users').select()
            return this.success(userlist)
        }

    }

    //新增用户
    async adduserAction() {
        const data = this.post('params')
        const insertId = await this.model('users').add({
            username: data.username,
            age: data.age,
            tel: data.tel,
            email: data.email,
            identity: data.identity

        })

        if (insertId) {
            let userlist = await this.model('users').select()
            return this.success(userlist)
        } else {
            return this.fail('数据保存失败')
        }
    }



    //获取血压数据
    async bloodAction() {
        const query = this.post('params')
        let userid = query.userid
        let model = this.model('bloodpressure')
        //两个表相连哦
        let bloodpressure = await model.join('users on userid=user_id').where({userid:userid}).select()
        return this.success(bloodpressure)

    }


    //获取血糖
    async sugardataAction() {
        const query = this.post('params')
        let userid = query.userid
        if (userid == undefined) {
            let model = this.model('sugardata')
            let sugardata = await model.join('users on userid=user_id').select()
            return this.success(sugardata)
        } else {
            // let sql = await this.model('users').where({
            //     userid: userid
            // }).buildSelectSql()
            // let sugardata = await this.model('sugardata').join({
            //     table: sql,
            //     on: ['user_id', 'userid']
            // }).select()
            let model= this.model('sugardata')
            let sugardata = await model.join('users on userid=user_id').where({userid:userid}).select()
            return this.success(sugardata)
        }
    }


    //获取帖子数据
    async gettieziAction() {
        let model = this.model('tiezi')
        let tiezilist = await model.select()
        return this.success(tiezilist)
    }






}