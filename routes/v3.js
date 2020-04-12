'use strict';

import express from 'express';
import CityHandle from '../controller/address/cities';
import SearchPlace from '../controller/address/search';

const router = express.Router();

router.get('/cities', CityHandle.getCity); 
router.get('/cities/:id', CityHandle.getCityById);
router.get('/exactaddress', CityHandle.getExactAddress);
router.get('/pois/:geohash', CityHandle.pois);
router.get('/pois', SearchPlace.search);

export default router