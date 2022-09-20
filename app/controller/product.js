'use strict';

const Controller = require('egg').Controller;

// class productController extends Controller {
//   async list() {
//     const
//   }
// }

class productController extends Controller {
  async list() {
    const { ctx } = this;
    const {
      page = 1,
      page_size = 10,
    } = ctx.query;
    console.log();
    const res = await ctx.service.product.select({
      page,
      page_size,
    });
    ctx.body = {
      code: 1,
      res,
    };
  }
}

module.exports = productController;
//   data: data.map(item => {
//     return {
//       ...item,
//       images: JSON.parse(item.images),
//       promotionInfoList: JSON.parse(item.promotionInfoList),
//     };
//   }),
