import formidable from 'formidable';
import fs from 'fs';
// import gm from 'gm';
import fetch from 'node-fetch';
import path from 'path';
import qiniu from 'qiniu';
import Ids from '../models/ids';
qiniu.conf.ACCESS_KEY = '2Fthyndc1KKTBpk02I9CdeGW5-k3Z4BotT6GsmIU';
qiniu.conf.SECRET_KEY = 'qE8vIySSzwWNo_GQN9FLdlDEt-emxPK89dXJJnvK';


export default class BaseComponent {
	constructor() {
		this.idList = ['shop_id', 'food_id', 'order_id', 'user_id', 'address_id', 'cart_id', 'img_id', 'category_id', 'admin_id', 'statis_id'];
		this.imgTypeList = ['shop', 'food', 'avatar', 'default'];
		this.uploadImg = this.uploadImg.bind(this)
		this.qiniu = this.qiniu.bind(this)
	}
	async fetch(url = '', data = {}, type = 'GET', resType = 'JSON') {
		type = type.toUpperCase();
		resType = resType.toUpperCase();
		if (type == 'GET') {
			let dataStr = ''; //数据拼接字符串
			Object.keys(data).forEach(key => {
				dataStr += key + '=' + data[key] + '&';
			})

			if (dataStr !== '') {
				dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
				url = url + '?' + dataStr;
			}
		}

		let requestConfig = {
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
		}

		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
		}
		let responseJson;
		try {
			const response = await fetch(url, requestConfig);
			if (resType === 'TEXT') {
				responseJson = await response.text();
			} else {
				responseJson = await response.json();
			}
		} catch (err) {
			console.log('获取http数据失败', err);
			throw new Error(err)
		}
		return responseJson
	}
	//新增id
	async getId(type) {
		if (!this.idList.includes(type)) { //includes()返回一个布尔值，表示某个数组是否包含给定的值
			console.log('id类型错误');
			throw new Error('id类型错误');
			return
		}
		try {
			const idData = await Ids.findOne();
			idData[type]++;
			await idData.save();
			return idData[type]
		} catch (err) {
			console.log('获取ID数据失败');
			throw new Error(err)
		}
	}
	//上传图片
	async uploadImg(req, res, next) {
		const type = req.params.type;
		try {
			// const image_path = await this.qiniu(req, type); //图片存到七牛
			const image_path = await this.getPath(req, res); //图片存到本地
			res.send({
				status: 1,
				image_path,
			})
		} catch (err) {
			console.log('上传图片失败', err);
			res.send({
				status: 0,
				type: 'ERROR_UPLOAD_IMG',
				message: '上传图片失败'
			})
		}
	}
	//保存图片到本地
	async getPath(req, res) {
		return new Promise((resolve, reject) => {
			const form = formidable.IncomingForm();
			form.uploadDir = './public/img';
			form.parse(req, async (err, fields, files) => {
				let img_id;
				try {
					img_id = await this.getId('img_id');
				} catch (err) {
					console.log('获取图片id失败');
					fs.unlinkSync(files.file.path);
					reject('获取图片id失败');
				}
				const hashName = (new Date().getTime() + Math.ceil(Math.random() * 10000)).toString(16) + img_id;
				const extname = path.extname(files.file.name); //返回path路径文件扩展名
				if (!['.jpg', '.jpeg', '.png'].includes(extname)) {
					fs.unlinkSync(files.file.path);
					res.send({
						status: 0,
						type: 'ERROR_EXTNAME',
						message: '文件格式错误'
					})
					reject('上传失败');
					return
				}
				const fullName = hashName + extname;
				const repath = './public/img/' + fullName;
				try {
					fs.renameSync(files.file.path, repath); //给文件重命名
					resolve(fullName)
					// gm(repath) //剪裁图片,需要安装gm客户端
					// 	.resize(200, 200, "!")
					// 	.write(repath, async (err) => {
					// 		if(err){
					// 			console.log(err)
					// 			console.log('裁切图片失败');
					// 			reject('裁切图片失败');
					// 			return
					// 		}
							
					// 	})
				} catch (err) {
					console.log('保存图片失败', err);
					if (fs.existsSync(repath)) {
						fs.unlinkSync(repath);
					} else {
						fs.unlinkSync(files.file.path);
					}
					reject('保存图片失败')
				}
			});
		})
	}
	//通过 七牛 存储图片
	async qiniu(req, type = 'default') {
		return new Promise((resolve, reject) => {
			const form = formidable.IncomingForm();
			form.uploadDir = './public/img';
			form.parse(req, async (err, fields, files) => {
				let img_id;
				try {
					img_id = await this.getId('img_id');
				} catch (err) {
					console.log('获取图片id失败');
					fs.unlinkSync(files.file.path);
					reject('获取图片id失败')
				}
				const hashName = (new Date().getTime() + Math.ceil(Math.random() * 10000)).toString(16) + img_id;
				const extname = path.extname(files.file.name);
				const repath = './public/img/' + hashName + extname;
				try {
					const key = hashName + extname;
					await fs.rename(files.file.path, repath);
					const token = this.uptoken('node-elm', key);
					const qiniuImg = await this.uploadFile(token.toString(), key, repath);
					fs.unlinkSync(repath);
					resolve(qiniuImg)
				} catch (err) {
					console.log('保存至七牛失败', err);
					fs.unlinkSync(files.file.path) //fs.unlink('要删除文件的路径',回调函数)
					reject('保存至七牛失败')
				}
			});

		})
	}
	uptoken(bucket, key) {
		var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
		return putPolicy.token();
	}
	uploadFile(uptoken, key, localFile) {
		return new Promise((resolve, reject) => {
			var extra = new qiniu.io.PutExtra();
			qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
				if (!err) {
					resolve(ret.key)
				} else {
					console.log('图片上传至七牛失败', err);
					reject(err)
				}
			});

		})
	}
}