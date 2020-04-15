'use strict';

import mongoose from 'mongoose'
import {ratingList, scores, tags} from '../../InitData/rate'
const Schema = mongoose.Schema;

const rateSchema = new Schema({
	shop_id: Number,
	ratings: [
		{
			username: {type: String, default: "匿名用户"},
			avatar: {type: String, default: ''},
			highlights: [],
			item_ratings: [
				{
					food_id: Number,
					food_name: String,
					image_hash: {type: String, default: ''},
					is_valid: {type: Number, default: 1},
				},
			],
			rated_at: String,
			rating_star: Number,
			rating_text: String,
			tags: {type: Array, default: []},
			time_spent_desc: String,
		},
	],
	scores: {
		compare_rating: {type: Number, default: 0},
		deliver_time: {type: Number, default: 0},
		food_score: {type: Number, default: 0},
		order_rating_amount: {type: Number, default: 0},
		overall_score: {type: Number, default: 0},
		service_score: {type: Number, default: 0},
	},
	tags: [{
		name: String,
		count: {type: Number, default: 0},
		unsatisfied: {type: Boolean, default: false},
	}]
})

rateSchema.index({shop_id: 1});

rateSchema.statics.initData = async function (shop_id){
	try{
		const data = await this.findOne({shop_id});
		if (!data) {
			const newRating = {
				shop_id,
				ratings: ratingList,
				scores,
				tags,
			}
			await this.create(newRating);
			return true
		}else{
			return false
		}
	}catch(err){
		console.log('初始化评论数据失败');
		throw new Error(err)
	}
}

rateSchema.statics.getData = async function (shop_id, type){
	try{
		const data = await this.findOne({shop_id}, '-_id');
		if (!data) {
			throw new Error('未找到当前餐馆的评论数据');
		}else{
			return data[type]
		}
	}catch(err){
		console.log('初始化评论数据失败');
		throw new Error(err)
	}
}

const Rating = mongoose.model('Rating', rateSchema);



export default Rating