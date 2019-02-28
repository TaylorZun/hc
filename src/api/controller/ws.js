

module.exports = class extends think.Controller {
  constructor(...arg) {
      super(...arg)
  }
  openAction() {
      console.log('ws open')
      this.emit('opend', 'this client opened successfully')
      this.broadcast('joined', 'there is a new client')
      return this.success()
  }
  closeAction() {
      console.log('ws close')
      return this.success()
  }

  addUserAction() {
      console.log('adduseraction..')
      return this.success()
  }
}