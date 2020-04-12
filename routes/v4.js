//other

import express from 'express';
import VipCart from '../controller/other/vipcart';
import Captchas from '../controller/other/captchas';
import Explain from '../controller/other/explain';
import BaseComponent from '../prototype/baseComponent';
const baseHandle = new BaseComponent();
const router = express.Router();

router.post('/users/:user_id/delivery_card/physical_card/bind', VipCart.useCart)
router.post('/captchas', Captchas.getCaptchas);
router.get('/profile/explain', Explain.getExpalin);
router.post('/addimg/:type', baseHandle.uploadImg);
router.get('/payment/queryOrder', (req, res, next) => {
    res.send({
        status: 0,
        type: 'PAY_FAILED',
        message: '暂不开放支付功能',
    });
})

export default router