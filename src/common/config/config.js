// default config
module.exports = {
  workers: 1,
  stickyCluster: true,
  default_module: 'api',
  weixin: {
    appid: '', // 小程序APPID
    secret: '', // 小程序密钥
    notify_url: '', // 微信异步通知
    partner_key: '' // 微信支付密钥
  }
};
