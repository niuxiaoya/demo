let version = 'v1'    //  版本

let branch = 'dev'    //  要推送的分支

let http_url = ''
let http_api = ''
switch(branch) {
  case 'dev':
    http_url = 'http://wwwdev.swisstimevip.com:8000'
    http_api = 'http://apidev.swisstimevip.com:8000'
    break;
  case 'master':
    http_url = 'http://wwwtest.swisstimevip.com:8080'
    http_api = 'http://apitest.swisstimevip.com:8080'
    break;
  case 'release':
    http_url = 'https://wwwrelease.swisstimevip.com'
    http_api = 'https://apirelease.swisstimevip.com'
    break;
  case 'gz_online':
    http_url = 'https://wap.swisstimevip.cn'
    http_api = 'https://api.swisstimevip.cn'
    break;
  case 'hk_online':
    http_url = 'https://wap.swisstimevip.com'
    http_api = 'https://api.swisstimevip.com'
    break;
}

module.exports = {
  prov_url: {
    // // 测试
    FRIENDS: `"${http_url}/friends"`,
    MARKET: `"${http_url}/market"`,
    NEWS: `"${http_url}/news"`,
    USER: `"${http_url}/user"`,
    VIP: `"${http_url}/vip"`
  },
  dev_url: {
    FRIENDS: '"http://192.168.10.104:8055"',
    MARKET: '"http://192.168.10.104:8055"',
    NEWS: '"http://192.168.10.104:8055"',
    USER: '"http://192.168.10.104:8055"',
    VIP: '"http://192.168.10.104:8055"'
  },
  prov_api: {
    DICT: `"${http_api}/dict/${version}"`,
    FINANCE: `"${http_api}/finance/${version}"`,
    FRIENDS: `"${http_api}/friends/${version}"`,
    MARKET: `"${http_api}/market/${version}"`,
    NEWS: `"${http_api}/news/${version}"`,
    SYSTEM: `"${http_api}/system/${version}"`,
    USER: `"${http_api}/user/${version}"`,
    VIP: `"${http_api}/vip/${version}"`
  },
  dev_api: {
    DICT: `"${http_api}/dict/${version}"`,
    FINANCE: `"${http_api}/finance/${version}"`,
    FRIENDS: `"${http_api}/friends/${version}"`,
    MARKET: `"${http_api}/market/${version}"`,
    NEWS: `"${http_api}/news/${version}"`,
    SYSTEM: `"${http_api}/system/${version}"`,
    USER: `"${http_api}/user/${version}"`,
    VIP: `"${http_api}/vip/${version}"`
  }
}
