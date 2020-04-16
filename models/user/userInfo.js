'use strict';

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
	id: Number,
	username: String,
	user_id: Number,
	avatar: { type: String, default: 'default.jpg' },
	current_address_id: { type: Number, default: 0 },
	balance: { type: Number, default: 0 },
	brand_member_new: { type: Number, default: 0 },
	current_invoice_id: { type: Number, default: 0 },
	delivery_card_expire_days: { type: Number, default: 0 },
	gift_amount: { type: Number, default: 3 },
	point: { type: Number, default: 0 },
	is_active: { type: Number, default: 1 },
	is_email_valid: { type: Boolean, default: false },
	email: { type: String, default: '' },
	is_mobile_valid: { type: Boolean, default: true },
	mobile: { type: String, default: '' },
	city: String,
	registe_time: String,
	column_desc: {
		game_desc: { type: String, default: '玩游戏领红包' },
		game_image_hash: { type: String, default: '05f108ca4e0c543488799f0c7c708cb1jpeg' },
		game_is_show: { type: Number, default: 1 },
		game_link: { type: String, default: 'https://gamecenter.faas.ele.me' },
		gift_mall_desc: { type: String, default: '0元好物在这里' },
	},
})

userInfoSchema.index({ id: 1 });


const UserInfo = mongoose.model('UserInfo', userInfoSchema);

export default UserInfo