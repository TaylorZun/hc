/*
 * @Description: 关于医师咨询的相关的查询
 * @Author: your name
 * @Date: 2018-12-23 14:17:21
 * @LastEditTime: 2019-03-27 20:25:51
 * @LastEditors: Please set LastEditors
 */

const Base = require('./base.js')

module.exports = class extends Base {

    //前后台
    async getdoctorlistAction() {
        let model = this.model('doctor')
        let doctorList = await model.select()
        return this.success(doctorList)
        
    }

    //医生详细信息页面----用于购买
    async getdoctordetailAction() {
        const doctorid = this.get('id')
        const model = this.model('doctor')
        const info = await model.where({'id': doctorid}).find();

        return this.success({
            info: info
        })
    }
    
    async recomandAction() {
        const doctorid = this.get('id')
        const keshi = await this.model('doctor').where({id:doctorid}).find()   //.find是返回一条数据，。select（）是多条
        console.log(keshi)
        const info = await this.model('doctor').where({keshi: keshi.keshi}).select()
        return this.success(info)
    }

    async queryAction() {
        const query = this.get('inputValue')
        const model = this.model('doctor')
        let doctorList = await model.where({'name|master|hospital' : ['like', '%'+query+'%']}).select()

        return this.success(doctorList)
        
    }

    /**
     * 下面是后台用接口
     */
    async adddoctorAction() {
        let data =this.post('params')
        const insertId = await this.model('doctor').add({
            name: data.name,
            hospital: data.hospital,
            zhicheng: data.zhicheng,
            keshi: data.keshi,
            
        })
        
        if(insertId) {
            let doctorlist = await this.model('doctor').select()
            return this.success(doctorlist)
        }else {
            return this.fail('数据保存失败')
        }
    }

    async querydoctorAction() {
        let data = this.post('params')
        if(data.name != undefined && data.zhicheng == undefined) {
            let doctor = await this.model('doctor').where({name:data.name}).select()
            return this.success(doctor)
        } else if(data.name == undefined && data.zhicheng != undefined) {
            let doctor = await this.model('doctor').where({zhicheng:data.zhicheng}).select()
            return this.success(doctor)
        } else {
            let doctor = await this.model('doctor').where({name:data.name,zhicheng:data.zhicheng}).select()
            return this.success(doctor)
        }
    }    

    async getbusinessAction() {
        let business = await this.model('doctorbusiness').join('doctor on id=doctorid').select()
        return this.success(business)
    }
    
    async updatebusinessAction() {
        let data = this.post('params')
        let res = await this.model('doctorbusiness').where({bn_id:data.bn_id}).update({
            video_price:data.video_price,
            tel_price:data.tel_price,
            text_price: data.text_price
        })
        if (res) {
            let list = await this.model('doctorbusiness').select()
            return this.success(list)
        }
    }

    

  

    
}