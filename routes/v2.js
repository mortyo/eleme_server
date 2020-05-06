'use strict';

import express from 'express';
import Category from '../controller/shopping/category';
import Entry from '../controller/shopping/entry';
import Shop from '../controller/shopping/shop';
import Food from '../controller/shopping/food';
import Carts from '../controller/shopping/carts';
import Remark from '../controller/shopping/remark';
import Order from '../controller/shopping/order';
import Rating from '../controller/shopping/rating';
import Check from '../middlewares/check';

const router = express.Router();
//shop
router.post('/addshop', Check.checkAdmin, Shop.addShop);
router.get('/shops', Shop.getShops);
router.get('/shop/:shop_id', Shop.getShopDetail);
router.post('/updateshop', Check.checkAdmin, Shop.updateShop);
router.get('/shops/search', Shop.searchShop);
router.get('/shops/count', Shop.getShopCount);
router.delete('/shop/:shop_id', Shop.deleteShop);
//food
router.post('/addfood',Food.addFood);
router.get('/foods', Food.getFoods); 
router.get('/foods/count', Food.getFoodsCount); 
router.post('/updatefood', Check.checkAdmin, Food.updateFood);
router.delete('/food/:food_id', Check.checkSuperAdmin, Food.deleteFood);
//menu
router.post('/addmenu', Check.checkAdmin, Food.addMenu);
router.get('/shopmenu/:shop_id', Food.allMenu);
router.get('/menu/:menu_id', Food.getMenuDetail);
//cart
router.post('/cart/checkout', Carts.checkout);
router.get('/cart/:cart_id/remarks', Remark.getRemarks);
//order
router.post('/user/:user_id/cart/:cart_id/order', Order.postOrder);
router.get('/user/:user_id/orders', Order.getOrders)
router.get('/user/:user_id/order/:order_id', Order.getDetail)
router.get('/orders', Order.getAllOrders)
router.get('/orders/count', Order.getOrdersCount)
//entry
router.get('/index_entry', Entry.getEntry);  //msite导航栏
//category
router.post('/addCategory', Category.addCategory)
router.get('/getCategories', Category.getCategories);
router.get('/delivery_modes', Category.getDelivery);
router.get('/activity_attributes', Category.getActivity);
//rating
router.get('/shop/:shop_id/ratings', Rating.getRatings)
router.get('/shop/:shop_id/ratings/scores', Rating.getScores)
router.get('/shop/:shop_id/ratings/tags', Rating.getTags)

export default router