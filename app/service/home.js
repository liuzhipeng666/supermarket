const Service = require('egg').Service;

class HomeService extends Service {
  async banner() {
    const data = await this.app.mysql.select('banner');
    return data;
  }
  async mall_nav() {
    const data = await this.app.mysql.select('mall_nav');
    return data;
  }
  async hot_nav() {
    const data = await this.app.mysql.select('hot_nav');
    return data;
  }
  async product() {
    const data = await this.app.mysql.select('product');
    return data;
  }
  async category() {
    const data = await this.app.mysql.select('category');
    return data;
  }
}

module.exports = HomeService;
