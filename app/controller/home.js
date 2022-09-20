'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    const banner = await ctx.service.home.banner();
    const mall_nav = await ctx.service.home.mall_nav();
    const hot_nav = await ctx.service.home.hot_nav();
    const product = await ctx.service.home.product();
    const category = await ctx.service.home.category();
    ctx.body = {
      code: 1,
      data: {
        banner,
        mall_nav,
        hot_nav,
        product,
        category,
      },
    };
  }
}

module.exports = HomeController;
