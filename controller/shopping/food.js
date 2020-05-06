'use strict';

import formidable from 'formidable';
import { Food as FoodModel, Menu as MenuModel } from '../../models/shopping/food';
import ShopModel from '../../models/shopping/shop';
import BaseComponent from '../../prototype/baseComponent';

class Food extends BaseComponent {
	constructor() {
		super();
		this.defaultData = [{
			name: '热销榜',
			description: '大家喜欢吃，才叫真好吃。',
			icon_url: "5da3872d782f707b4c82ce4607c73d1ajpeg",
			is_selected: true,
			type: 1,
			foods: [],
		}, {
			name: '优惠',
			description: '美味又实惠, 大家快来抢!',
			icon_url: "4735c4342691749b8e1a531149a46117jpeg",
			type: 1,
			foods: [],
		}]
		this.initData = this.initData.bind(this);
		this.addFood = this.addFood.bind(this);
		this.addMenu = this.addMenu.bind(this);
		this.allMenu = this.allMenu.bind(this);
		this.getSpecs = this.getSpecs.bind(this);
		this.updateFood = this.updateFood.bind(this);
	}
	async initData(shop_id) {
		for (let i = 0; i < this.defaultData.length; i++) {
			let category_id;
			try {
				category_id = await this.getId('category_id');
			} catch (err) {
				console.log('获取category_id失败');
				throw new Error(err);
			}
			const defaultData = this.defaultData[i];
			const Category = { ...defaultData, id: category_id, shop_id };
			const newFood = new MenuModel(Category);
			try {
				await newFood.save();
				console.log('初始化食品数据成功');
			} catch (err) {
				console.log('初始化食品数据失败');
				throw new Error(err);
			}
		}
	}
	async addFood(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			try {
				if (!fields.name) {
					throw new Error('必须填写食品名称');
				} else if (!fields.image_path) {
					throw new Error('必须上传食品图片');
				} else if (!fields.specs.length) {
					throw new Error('至少填写一种规格');
				} else if (!fields.category_id) {
					throw new Error('食品类型ID错误');
				} else if (!fields.shop_id) {
					throw new Error('餐馆ID错误');
				}
			} catch (err) {
				console.log('前台参数错误', err.message);
				res.send({
					status: 0,
					type: 'ERROR_PARAMS',
					message: err.message
				})
				return
			}
			let shop
			let category
			try {
				shop = await ShopModel.findOne({ id: fields.shop_id });
				category = await MenuModel.findOne({ id: fields.category_id });
			} catch (err) {
				console.log('获取食品类型和餐馆信息失败');
				res.send({
					status: 0,
					type: 'ERROR_DATA',
					message: '添加食品失败'
				})
				return
			}
			let food_id
			try {
				food_id = await this.getId('food_id');
			} catch (err) {
				console.log('获取food_id失败');
				res.send({
					status: 0,
					type: 'ERROR_DATA',
					message: '添加食品失败'
				})
				return
			}
			const rating_count = Math.ceil(Math.random() * 1000);
			const month_sales = Math.ceil(Math.random() * 1000);
			const tips = rating_count + "评价 月售" + month_sales + "份";
			const newFood = {
				id: food_id,
				name: fields.name,
				description: fields.description,
				image_path: fields.image_path,
				shop_id: fields.shop_id,
				category_id: fields.category_id,
				activity: null,
				attributes: [],
				satisfy_rate: Math.ceil(Math.random() * 100),
				satisfy_count: Math.ceil(Math.random() * 1000),
				rating: (4 + Math.random()).toFixed(1),
				rating_count,
				month_sales,
				tips,
				specs: []
			}
			if (fields.activity) {
				newFood.activity = {
					image_text_color: 'f1884f',
					icon_color: 'f07373',
					image_text: fields.activity,
				}
			}
			if (fields.attributes.length) {
				fields.attributes.forEach(item => {
					let attr;
					switch (item) {
						case '新':
							attr = {
								icon_color: '5ec452',
								icon_name: '新'
							}
							break;
						case '招牌':
							attr = {
								icon_color: 'f07373',
								icon_name: '招牌'
							}
							break;
					}
					newFood.attributes.push(attr);
				})
			}
			try {
				const specs = await this.getSpecs(fields);
				newFood.specs = specs;
			} catch (err) {
				console.log('添加specs失败', err);
				res.send({
					status: 0,
					type: 'ERROR_DATA',
					message: '添加食品失败'
				})
				return
			}
			try {
				const foodEntity = await FoodModel.create(newFood);
				category.foods.push(foodEntity);
				category.markModified('foods');
				await category.save();
				res.send({
					status: 1,
					success: '添加食品成功',
				});
			} catch (err) {
				console.log('保存食品到数据库失败', err);
				res.send({
					status: 0,
					type: 'ERROR_DATA',
					message: '添加食品失败'
				})
			}
		})
	}
	async getFoods(req, res, next) {
		const { shop_id, limit = 20, offset = 0 } = req.query;
		try {
			let filter = {};
			if (shop_id && Number(shop_id)) {
				filter = { shop_id }
			}
			const foods = await FoodModel.find(filter, '-_id').sort({ id: -1 }).limit(Number(limit)).skip(Number(offset));
			res.send(foods);
		} catch (err) {
			console.log('获取食品数据失败', err);
			res.send({
				status: 0,
				type: 'GET_DATA_ERROR',
				message: '获取食品数据失败'
			})
		}
	}
	async getFoodsCount(req, res, next) {
		const shop_id = req.query.shop_id;
		try {
			let filter = {};
			if (shop_id && Number(shop_id)) {
				filter = { shop_id }
			}
			const count = await FoodModel.find(filter).countDocuments();
			res.send({
				status: 1,
				count,
			})
		} catch (err) {
			console.log('获取食品数量失败', err);
			res.send({
				status: 0,
				type: 'ERROR_TO_GET_COUNT',
				message: '获取食品数量失败'
			})
		}
	}
	async updateFood(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			if (err) {
				console.log('获取食品信息form出错', err);
				res.send({
					status: 0,
					type: 'ERROR_FORM',
					message: '表单信息错误',
				})
				return
			}
			const { id,name, description = "", image_path, category_id } = fields;
			try {
				if (!name) {
					throw new Error('食品名称错误');
				} else if (!id || !Number(id)) {
					throw new Error('食品ID错误');
				} else if (!category_id || !Number(category_id)) {
					throw new Error('食品分类ID错误');
				} else if (!image_path) {
					throw new Error('食品图片地址错误');
				}
				const specs = await this.getSpecs(fields);
				let newData = { name, description, image_path,category_id , specs };
				const food = await FoodModel.findOneAndUpdate({ id }, { $set: newData });
				const menu = await MenuModel.findOne({ id: category_id })
				let subFood = menu.foods.id(food._id);
				subFood.set(newData)
				await menu.save()
				res.send({
					status: 1,
					success: '修改食品信息成功',
				})
			} catch (err) {
				console.log(err.message, err);
				res.send({
					status: 0,
					type: 'ERROR_UPDATE_FOOD',
					message: '更新食品信息失败',
				})
			}
		})
	}
	async deleteFood(req, res, next) {
		const food_id = req.params.food_id;
		if (!food_id || !Number(food_id)) {
			console.log('food_id参数错误');
			res.send({
				status: 0,
				type: 'ERROR_PARAMS',
				message: 'food_id参数错误',
			})
			return
		}
		try {
			const food = await FoodModel.findOne({ id: food_id });
			const menu = await MenuModel.findOne({ id: food.category_id })
			let subFood = menu.foods.id(food._id);
			await subFood.remove()
			await menu.save()
			await food.remove()
			res.send({
				status: 1,
				success: '删除食品成功',
			})
		} catch (err) {
			console.log('删除食品失败', err);
			res.send({
				status: 0,
				type: 'DELETE_FOOD_FAILED',
				message: '删除食品失败',
			})
		}
	}
	async addMenu(req, res, next) {
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			try {
				if (!fields.name) {
					throw new Error('必须填写食品类型名称');
				} else if (!fields.shop_id) {
					throw new Error('餐馆ID错误');
				}
			} catch (err) {
				console.log(err.message, err);
				res.send({
					status: 0,
					type: 'ERROR_PARAMS',
					message: err.message
				})
				return
			}
			let category_id;
			try {
				category_id = await this.getId('category_id');
			} catch (err) {
				console.log('获取category_id失败');
				res.send({
					type: 'ERROR_DATA',
					message: '获取数据失败'
				})
				return
			}
			const foodObj = {
				id: category_id,
				name: fields.name,
				shop_id: fields.shop_id,
				description: fields.description,
				foods: [],
			}
			const newFood = new MenuModel(foodObj);
			try {
				await newFood.save();
				res.send({
					status: 1,
					success: '添加食品种类成功',
				})
			} catch (err) {
				console.log('保存数据失败');
				res.send({
					status: 0,
					type: 'ERROR_IN_SAVE_DATA',
					message: '保存数据失败',
				})
			}
		})
	}
	async allMenu(req, res, next) {
		const shop_id = req.params.shop_id;
		try {
			const category_list = await MenuModel.find({ shop_id });
			res.send({
				status: 1,
				category_list,
			})
		} catch (err) {
			console.log('获取餐馆食品种类失败');
			res.send({
				status: 0,
				type: 'ERROR_GET_DATA',
				message: '获取数据失败'
			})
		}
	}
	async getMenuDetail(req, res, next) {
		const menu_id = req.params.menu_id;
		if (!menu_id || !Number(menu_id)) {
			console.log('获取Menu详情参数ID错误');
			res.send({
				status: 0,
				type: 'ERROR_PARAMS',
				message: 'Menu ID参数错误',
			})
			return
		}
		try {
			const menu = await MenuModel.findOne({ id: menu_id }, '-_id');
			res.send(menu)
		} catch (err) {
			console.log('获取Menu详情失败', err);
			res.send({
				status: 0,
				type: 'GET_DATA_ERROR',
				message: '获取Menu详情失败'
			})
		}
	}
	//选择食物规格
	async getSpecs(fields) {
		let specs = []
		console.log(fields)
		if (fields.specs.length < 2) {
			specs.push({
				specs_name: fields.specs[0].specs_name,
				price: fields.specs[0].price,
				packing_fee: fields.specs[0].packing_fee
			})
		} else {
			for (let i = 0; i < fields.specs.length; i++) {
				specs.push({
					specs_name: fields.specs[i].specs_name,
					price: fields.specs[i].price,
					packing_fee: fields.specs[i].packing_fee
				})
			}
		}
		return specs
	}
}

export default new Food()