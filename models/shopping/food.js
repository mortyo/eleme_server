'use strict';

import mongoose from 'mongoose'
const Schema = mongoose.Schema;

const foodSchema = new Schema({
	id: {type: Number, isRequired: true},
	name: {type: String, isRequired: true},
	shop_id: {type: Number, isRequired: true},
	category_id: {type: Number, isRequired: true},
	is_featured: {type: Number, default: 0},
	pinyin_name: {type: String, default: ''},
	display_times: {type: Array, default: []},
	attrs: {type: Array, default: []},
	description: {type: String, default: ""},
	server_utc: {type: Date, default: Date.now()},
	is_essential: {type: Boolean, default: false},
	attributes: {type: Array, default: []},
	rating: {type: Number, default: 0},
	rating_count: {type: Number, default: 0},
	satisfy_rate: {type: Number, default: 0},
	satisfy_count: {type: Number, default: 0},
	month_sales: {type: Number, default: 0},
	tips: String,
	image_path: String,
	limitation: Schema.Types.Mixed,
	activity: Schema.Types.Mixed,
	specfoods: [{
		specs_name: String,
		price: {type: Number, default: 0},
		original_price: {type: Number, default: 0},
		packing_fee: {type:Number,default:0},
		pinyin_name: {type: String, default: ""}
	}]
})

foodSchema.index({id: 1});

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