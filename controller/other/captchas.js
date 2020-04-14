'use strict';

import captchapng from 'captchapng';

class Captchas {
	constructor(){

	}
	//验证码
	async getCaptchas(req, res, next){
		const cap = parseInt(Math.random()*9000+1000); //1000~10000
    	const p = new captchapng(80,30, cap); // width,height,numeric captcha
        p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
        const base64 = p.getBase64(); //base64加密
        res.cookie('cap', cap, { maxAge: 300000, httpOnly: true }); //存到cookie
        res.send({
            status: 1,
        	code: 'data:image/png;base64,' + base64
        });
	}
}

export default new Captchas()