'use strict';

import express from 'express';
import User from '../controller/user/user';
import Address from '../controller/address/address';
import Order from '../controller/user/order';
import Hongbao from '../controller/user/hongbao';

const router = express.Router();

router.post('/login', User.login);
router.get('/user', User.getInfo);
router.get('/user/:user_id', User.getInfoById);
router.post('/users/:user_id/avatar', User.updateAvatar)
router.get('/signout', User.signout);
router.post('/changepassword', User.chanegPassword);

router.get('/users/list', User.getUserList);
router.get('/users/count', User.getUserCount);
router.get('/user/city/count', User.getUserCity);

router.get('/users/:user_id/addresses', Address.getAddress);
router.post('/users/:user_id/addresses', Address.addAddress);
router.delete('/users/:user_id/addresses/:address_id', Address.deleteAddress);
router.get('/address/:address_id', Address.getAddAddressById);

router.post('/users/:user_id/carts/:cart_id/orders', Order.postOrder);
router.get('/users/:user_id/orders', Order.getOrders)
router.get('/users/:user_id/orders/:order_id/snapshot', Order.getDetail)
router.get('/orders', Order.getAllOrders)
router.get('/orders/count', Order.getOrdersCount)


router.post('/users/:user_id/hongbao_exchange', Hongbao.exchange);
router.get('/users/:user_id/hongbaos', Hongbao.getHongbao)
router.get('/users/:user_id/expired_hongbaos', Hongbao.getExpiredHongbao)

export default router