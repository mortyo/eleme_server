'use strict';

import express from 'express';
import User from '../controller/user/user';
import Address from '../controller/user/address';
import Hongbao from '../controller/user/hongbao';

const router = express.Router();

router.post('/login', User.login);
router.get('/user', User.getInfo);
router.get('/user/:user_id', User.getInfoById);
router.get('/signout', User.signout);
router.post('/changepassword', User.changePassword);
router.post('/user/:user_id/changeavatar', User.updateAvatar)

router.get('/users/list', User.getUserList);
router.get('/users/count', User.getUserCount);
router.get('/users/city/count', User.getUserCity);

router.get('/user/:user_id/getAddress', Address.getAddress);
router.post('/user/:user_id/addAddress', Address.addAddress);
router.delete('/user/:user_id/address/:address_id', Address.deleteAddress);
router.get('/address/:address_id', Address.getAddAddressById);

router.get('/user/:user_id/hongbaos', Hongbao.getHongbao)
router.get('/user/:user_id/expired_hongbaos', Hongbao.getExpiredHongbao)
router.post('/user/:user_id/hongbao_exchange', Hongbao.exchange);

export default router