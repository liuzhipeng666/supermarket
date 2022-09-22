'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // router.get('/', controller.home.index);
  router.get('/api/home', controller.home.index);
  router.get('/api/product', controller.product.list);
  router.get('/api/product/category', controller.product.category);
  router.get('/api/product/:id', controller.product.detail);
  // router.get('/api/home/mall_nav', controller.home.mall_nav);
};
