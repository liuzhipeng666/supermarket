const Service = require('egg').Service;

class productService extends Service {
  async select({ page, page_size }) {
    console.log(page, page_size);
    const data = await this.app.mysql.select('product', {
      // where: {},
      limit: page_size,
      offset: (page - 1) * page_size,
    });
    return data;
  }
}

module.exports = productService;
