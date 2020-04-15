'use strict';

import express from 'express';
import Category from '../controller/shopping/category';
import Entry from '../controller/shopping/entry';
import Shop from '../controller/shopping/shop';
import Food from '../controller/shopping/food';
import Rating from '../controller/shopping/rating';
import Carts from '../controller/shopping/carts';
import Remark from '../controller/shopping/remark';
import Check from '../middlewares/check';

const router = express.Router();
//entry
router.get('/index_entry', Entry.getEntry);  //msite导航栏
//shop
router.post('/addshop', Check.checkAdmin, Shop.addShop);
router.get('/shops', Shop.getShops);
router.get('/shops/search', Shop.searchShop);
router.get('/shop/:shop_id', Shop.getShopDetail);
router.get('/shops/count', Shop.getShopCount);
router.post('/updateshop', Check.checkAdmin, Shop.updateShop);
router.delete('/shop/:shop_id', Check.checkSuperAdmin, Shop.deleteShop);
//food
router.post('/addfood', Check.checkAdmin, Food.addFood);
router.get('/food', Food.getFoods); //{ shop_id, limit = 20, offset = 0 } = req.query;
router.get('/foods/count', Food.getFoodsCount); //req.query.shop_id;
router.post('/updatefood', Check.checkAdmin, Food.updateFood);
router.delete('/food/:food_id', Check.checkSuperAdmin, Food.deleteFood);

router.post('/addMenu', Check.checkAdmin, Food.addMenu);
router.get('/allMenu/:shop_id', Food.allMenu);
router.get('/menu/:menu_id', Food.getMenuDetail);
//category
router.get('/getCategories', Category.getCategories);
router.get('/delivery_modes', Category.getDelivery);
router.get('/activity_attributes', Category.getActivity);
//rating
router.get('/Rating/:shop_id/ratings', Rating.getRatings)
router.get('/Rating/:shop_id/scores', Rating.getScores)
router.get('/Rating/:shop_id/tags', Rating.getTags)

router.post('/carts/checkout', Carts.checkout);
router.get('/carts/:cart_id/remarks', Remark.getRemarks);

export default router