'use strict';

const Controller = require('egg').Controller;

const arrToTree = arr => {
  const newArr = [];
  const arrJSON = {};
  arr.forEach(item => {
    arrJSON[item.categoryId] = item;
    if (item.parentId === 0) {
      newArr.push(item);
    }
  });
  arr.forEach(item => {
    if (item.parentId !== 0) {
      const parent = arrJSON[ item.parentId ];
      if (parent.children) {
        parent.children.push(item);
      } else {
        parent.children = [ item ];
      }
    }
  });
  return newArr;
};

const getTreeId = (tree, id, flag) => {
  let ids = [];
  if (flag) {
    tree.forEach(item => {
      ids.push(item.categoryId);
      if (item.children) {
        ids = ids.concat(getTreeId(item.children, id, true));
      }
    });
  } else {
    tree.forEach(item => {
      if (item.categoryId === id) {
        if (item.children) {
          ids = ids = ids.concat(getTreeId(item.children, id, true));
        }
        ids.push(item.categoryId);
      } else {
        if (item.categoryId === id) {
          ids = ids.concat(getTreeId(item.children, id, true));
        }
      }
    });
  }
  return ids;
};

class productController extends Controller {
  async list() {
    const { ctx } = this;
    const {
      page = 1,
      page_size = 10,
      category_id,
    } = ctx.query;
    let ids = '';
    if (category_id) {
      const data = await ctx.service.product.category();
      const tree = arrToTree(data);
      ids = getTreeId(tree, category_id * 1);
      console.log(ids);
    }
    const data = await ctx.service.product.select({
      page,
      page_size,
      categoryId: ids,
    });
    ctx.body = {
      code: 1,
      data: data.map(item => {
        return {
          ...item,
          // images: JSON.parse(item.images),
          // promotionInforList: JSON.parse(item.promotionInforList),
        };
      }),
    };
  }
  async category() {
    const { ctx } = this;
    const data = await ctx.service.product.category();
    ctx.body = {
      code: 1,
      data: arrToTree(data),
    };
    // const ids = getTreeId(tree, category_id)
  }
  async detail() {
    const { ctx } = this;
    const id = ctx.params;
    const data = await ctx.service.product.detail(id);
    ctx.body = {
      code: 1,
      data,
    };
  }

}

module.exports = productController;
