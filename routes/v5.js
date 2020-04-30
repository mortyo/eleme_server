'use strict';

import express from 'express'
import Admin from '../controller/admin/admin'
const router = express.Router()

router.post('/login', Admin.login);
// router.post('/register', Admin.register);
router.get('/signout', Admin.singout);
router.get('/info', Admin.getAdminInfo);
router.post('/update/avatar/:admin_id', Admin.updateAvatar);

router.get('/all', Admin.getAllAdmin);
router.get('/count', Admin.getAdminCount);

export default router