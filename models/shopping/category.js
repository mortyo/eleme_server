'use strict';

import mongoose from 'mongoose'
import categoryData from '../../InitData/category'

const Schema = mongoose.Schema;

const categorySchema = new Schema({
	id: Number,
	name: String,
	count: Number,
	image_url: String,
	level: Number,
	ids: [],
	sub_categories: [
		{
			id: Number,
			name: String,
			count: Number,
			image_url: String,
			level: Number,
		},
	]
});

categorySchema.statics.addCategory = async function (type){
	const categoryName = type.split('/');
	console.log(type)
	try{
		const allcate = await this.findOne();
		const subcate = await this.findOne({name: categoryName[0]});
		allcate.count ++;
		subcate.count ++ ;
		subcate.sub_categories.map(item => {
			if (item.name == categoryName[1]) {
				return item.count ++ 
			}
		})
		await allcate.save();
		await subcate.save();
		console.log('保存cetegroy成功');
		return
	}catch(err){
		console.log('保存cetegroy失败');
		throw new Error(err)
	}
}

const Category = mongoose.model('Category', categorySchema)

Category.findOne((err, data) => {
	if (!data) {
		for (let i = 0; i < categoryData.length; i++) {
			Category.create(categoryData[i]);
		}
	}
})

export default Category