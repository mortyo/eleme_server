'use strict';

import express from 'express';
import Category from '../controller/shopping/category';
import Food from '../controller/shopping/food';
import Shop from '../controller/shopping/shop';
import Rating from '../controller/shopping/rating';
import Carts from '../controller/shopping/carts';
import Remark from '../controller/shopping/remark';
import Entry from '../controller/shopping/entry';
import Check from '../middlewares/check';

const router = express.Router();

router.get('/index_entry', Entry.getEntry);  //msite导航栏

router.post('/addshop', Check.checkAdmin, Shop.addShop);
router.get('/restaurants', Shop.getRestaurants);
router.get('/restaurants/search', Shop.searchResaturant);
router.get('/restaurants/count', Shop.getShopCount);
router.post('/updateshop', Check.checkAdmin, Shop.updateshop);
router.delete('/restaurant/:restaurant_id', Check.checkSuperAdmin, Shop.deleteResturant);
router.get('/restaurant/:restaurant_id', Shop.getRestaurantDetail);

router.post('/addfood', Check.checkAdmin, Food.addFood);
router.get('/getcategory/:restaurant_id', Food.getCategory);
router.post('/addcategory', Check.checkAdmin, Food.addCategory);
router.get('/menu', Food.getMenu);
router.get('/menu/:category_id', Food.getMenuDetail);
router.get('/foods', Food.getFoods);
router.get('/foods/count', Food.getFoodsCount);
router.post('/updatefood', Check.checkAdmin, Food.updateFood);
router.delete('/food/:food_id', Check.checkSuperAdmin, Food.deleteFood);

router.get('/restaurant/category', Category.getCategories);
router.get('/restaurants/delivery_modes', Category.getDelivery);
router.get('/restaurants/activity_attributes', Category.getActivity);

router.get('/restaurants/:restaurant_id/ratings', Rating.getRatings)
router.get('/restaurants/:restaurant_id/ratings/scores', Rating.getScores)
router.get('/restaurants/:restaurant_id/ratings/tags', Rating.getTags)

router.post('/carts/checkout', Carts.checkout);
router.get('/carts/:cart_id/remarks', Remark.getRemarks);

export default router