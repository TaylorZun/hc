const Base = require('./base.js')

module.exports = class extends Base {
    async indexAction(){
        const baaner = await this.model('topic').limit(3).select();
    };

}