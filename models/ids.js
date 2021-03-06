'use strict';

import mongoose from 'mongoose'

const idsSchema = new mongoose.Schema({
	user_id: Number,
	address_id: Number,
	order_id: Number,
	shop_id: Number,
	food_id: Number,
	cart_id: Number,
	category_id: Number,
	img_id: Number,
	admin_id: Number,
	statis_id: Number,
});

const Ids = mongoose.model('Ids', idsSchema);

Ids.findOne((err, data) => {
	if (!data) {
		const newIds = new Ids({
			user_id: 0,
			address_id: 0,
			order_id: 0,
			shop_id: 0,
			food_id: 0,
			cart_id: 0,
			category_id: 0,
			img_id: 0,
			admin_id: 0,
			statis_id: 0,
		});
		newIds.save();
	}
})
export default Ids