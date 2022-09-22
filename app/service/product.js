const Service = require('egg').Service;

class productService extends Service {
  async select({ page, page_size, categoryId }) {
    const data = await this.app.mysql.select('product', {
      where: {
        categoryId,
      },
      limit: page_size,
      offset: (page - 1) * page_size,
    });
    return data;
  }
  async category() {
    const data = await this.app.mysql.select('category');
    return data;
  }
  async detail(id) {
    const data = await this.app.mysql.select('category', id);
    return data;
  }
}

module.exports = productService;
