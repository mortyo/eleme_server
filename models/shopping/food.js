'use strict';

import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const foodSchema = new Schema({
	item_id: {type: Number, isRequired: true},
	name: {type: String, isRequired: true},
	shop_id: {type: Number, isRequired: true},
	category_id: {type: Number, isRequired: true},
	rating: {type: Number, default: 0},
	is_featured: {type: Number, default: 0},
	pinyin_name: {type: String, default: ''},
	display_times: {type: Array, default: []},
	attrs: {type: Array, default: []},
	description: {type: String, default: ""},
	month_sales: {type: Number, default: 0},
	rating_count: {type: Number, default: 0},
	server_utc: {type: Date, default: Date.now()},
	is_essential: {type: Boolean, default: false},
	attributes: {type: Array, default: []},
	satisfy_count: {type: Number, default: 0},
	satisfy_rate: {type: Number, default: 0},
	tips: String,
	image_path: String,
	limitation: Schema.Types.Mixed,
	activity: Schema.Types.Mixed,
	specifications: [Schema.Types.Mixed],
	specfoods: [{
		item_id: {type: Number, isRequired: true},
		name: {type: String, isRequired: true},
		shop_id: {type: Number, isRequired: true},
		food_id: {type: Number, isRequired: true},
		sku_id: {type: Number, isRequired: true},
		original_price: {type: Number, default: 0},
		pinyin_name: {type: String, default: ""},
		packing_fee: {type: Number, default: 0},
		recent_rating: {type: Number, default: 0},
		promotion_stock: {type: Number, default: -1},
		price: {type: Number, default: 0},
		sold_out: {type: Boolean, default: false},
		recent_popularity: {type: Number, default: 0},
		is_essential: {type: Boolean, default: false},
		checkout_mode: {type: Number, default: 1},
		stock: {type: Number, default: 1000},
		specs_name: String,
		specs: [
			{
				name: String,
				value: String
			}
		]
	}]
})

foodSchema.index({item_id: 1});

const menuSchema = new Schema({
	id:  {type: Number, isRequired: true},
	name: {type: String, isRequired: true},
	shop_id: {type: Number, isRequired: true},
	is_selected: {type: Boolean, default: true},
	icon_url: {type: String, default: ''},
	type: {type: Number, default: 1},
	description: String,
	foods: [foodSchema]
});

menuSchema.index({ id: 1 });

const Food = mongoose.model('Food', foodSchema);

const Menu = mongoose.model('Menu', menuSchema);

export {Food, Menu}