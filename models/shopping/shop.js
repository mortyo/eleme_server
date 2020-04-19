'use strict';

import mongoose from 'mongoose'

const shopSchema = new mongoose.Schema({
	id: Number,
	name: {
		type: String,
        required: true 
    },
	phone: {
		type: String,
		required: true 
	},
	category: String,
	description: { type: String, default: "" },
	opening_hours: { type: Array, default: ["08:30/20:30"] },
	latitude: Number,
	longitude: Number,
	address: String,
	order_lead_time: { type: String, default: "" },
	distance: { type: String, default: "" },
	location:{type:[Number],index: '2d'},
	float_delivery_fee: { type: Number, default: 0 },
	float_minimum_order_amount: { type: Number, default: 0 },
	identification: {
		company_name: { type: String, default: "" },
		identificate_agency: { type: String, default: "" },
		identificate_date: { type: Date, default: Date.now },
		legal_person: { type: String, default: "" },
		licenses_date: { type: String, default: "" },
		licenses_number: { type: String, default: "" },
		licenses_scope: { type: String, default: "" },
		operation_period: { type: String, default: "" },
		registered_address: { type: String, default: "" },
		registered_number: { type: String, default: "" },
	},
	image_path: { type: String, default: "" },
	is_premium: { type: Boolean, default: false },
	is_new: { type: Boolean, default: false },
	promotion_info: { type: String, default: "欢迎光临，用餐高峰请提前下单，谢谢" },
	activities: [{
		id: Number,
		name: String,
		description: String,
		icon_name: String,
		icon_color: String
	}],
	delivery_mode: {
		id: Number,
		text: String,
		color: String,
		is_solid: Boolean
	},
	supports: [{
		id: Number,
		name: String,
		description: String,
		icon_name: String,
		icon_color: String
	}],
	license: {
		business_license_image: { type: String, default: "" },
		catering_service_license_image: { type: String, default: "" },
	},
	piecewise_agent_fee: {
		tips: String
	},
	rating: { type: Number, default: 0 },
	rating_count: { type: Number, default: 0 },
	recent_order_num: { type: Number, default: 0 },
	status: { type: Number, default: 0 },
});

shopSchema.index({ id: 1 }); //primary_key 主键

const Shop = mongoose.model('Shop', shopSchema);

export default Shop