'use strict';

import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const addressSchema = new Schema({
	id: Number,
	address: String,
	address_detail: String,
	user_id: Number,
	name: String,
	sex: {type: Number, default: 1},
	phone: String,
	phone_bk: String,
	tag_type: Number,
	geohash: String,
	is_valid: {type: Number, default: 1},
	created_at: {type: Date, default: Date.now()},
	poi_type: {type: Number, default: 0},
	city_id: {type: Number, default: 1},
	tag: {type: String, default: '家'},
	is_user_default: {type: Boolean, default: true},
	is_deliverable: {type: Boolean, default: true},
	agent_fee: {type: Number, default: 0},
	deliver_amount: {type: Number, default: 0},
	phone_had_bound: {type: Boolean, default: true},
})

addressSchema.index({id: 1});

const Address = mongoose.model('Address', addressSchema);

export default Address