'use strict';

import express from 'express';
import CityHandle from '../controller/position/cities';
import SearchPlace from '../controller/position/search';

const router = express.Router();

router.get('/cities', CityHandle.getCity); 
router.get('/cities/:id', CityHandle.getCityById);
router.get('/exactaddress', CityHandle.getExactAddress);
router.get('/pois/:geohash', CityHandle.pois);
router.get('/pois', SearchPlace.search);

export default router