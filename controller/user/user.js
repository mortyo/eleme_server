'use strict';

import crypto from 'crypto'; //crypto密码模块
import formidable from 'formidable'; //用于解析表单数据，特别是文件上传
import dtime from 'time-formater'; //时间格式
import UserModel from '../../models/user/user';
import UserInfoModel from '../../models/user/userInfo';
import AddressComponent from '../../prototype/addressComponent';

class User extends AddressComponent {
	constructor() {
		super() //super关键字用于访问和调用一个对象的父对象上的函数。
		this.login = this.login.bind(this); 
		this.encryption = this.encryption.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.updateAvatar = this.updateAvatar.bind(this);
	}
	//用Md5封装加密方法
	encryption(password) {
		const newpassword = this.Md5(this.Md5(password).substr(2, 7) + this.Md5(password));
		return newpassword
	}
	Md5(password) {
		const md5 = crypto.createHash('md5');
		return md5.update(password).digest('base64');
	}
	async login(req, res, next) {
		const cap = req.cookies.cap;
		if (!cap) {
			console.log('验证码失效')
			res.send({
				status: 0,
				type: 'ERROR_CAPTCHA',
				message: '验证码失效',
			})
			return
		}
		const form = new formidable.IncomingForm();
		//parse()会转换POST请求中所包含的表单数据并放到fields对象中，callback会包含所有字段域和文件信息
		form.parse(req, async (err, fields, files) => {
			//fields： { username: '****', password: '****', captcha_code: '****' }
			const { username, password, captcha_code } = fields;
			try {
				if (!username) {
					throw new Error('用户名参数错误');
				} else if (!password) {
					throw new Error('密码参数错误');
				} else if (!captcha_code) {
					throw new Error('验证码参数错误');
				}
			} catch (err) {
				console.log('登陆参数错误', err);
				res.send({
					status: 0,
					type: 'ERROR_QUERY',
					message: err.message,
				})
				return
			}
			if (cap.toString() !== captcha_code.toString()) { //cap是cookie里的验证码，captcha_code是请求里的验证码
				res.send({
					status: 0,
					type: 'ERROR_CAPTCHA',
					message: '验证码不正确',
				})
				return
			}
			const newpassword = this.encryption(password);
			try {
				//查找用户，如果，用户为空，创建一个新的用户
				const user = await UserModel.findOne({ username });
				if (!user) {
					const user_id = await this.getId('user_id');
					const cityInfo = await this.guessPosition(req);
					const registe_time = dtime().format('YYYY-MM-DD HH:mm');
					const newUser = { username, password: newpassword, user_id };
					const newUserInfo = { id: user_id,username, user_id, city: cityInfo.city, registe_time };
					UserModel.create(newUser); //用户名，密码，id
					const createUser = new UserInfoModel(newUserInfo); //用户详细信息
					const userinfo = await createUser.save();
					//req.session保存user_id
					req.session.user_id = user_id;
					res.send(userinfo);
				} else if (user.password.toString() !== newpassword.toString()) {
					console.log('用户登录密码错误')
					res.send({
						status: 0,
						type: 'ERROR_PASSWORD',
						message: '密码错误',
					})
					return
				} else {
					//req.session保存user_id
					req.session.user_id = user.user_id;
					const userinfo = await UserInfoModel.findOne({ user_id: user.user_id }, '-_id');
					res.send(userinfo)
				}
			} catch (err) {
				console.log('用户登陆失败', err);
				res.send({
					status: 0,
					type: 'SAVE_USER_FAILED',
					message: '登陆失败',
				})
			}
		})
	}
	async getInfo(req, res, next) {
		const sid = req.session.user_id;
		const qid = req.query.user_id;
		const user_id = sid || qid;
		if (!user_id || !Number(user_id)) {
			console.log('获取用户信息的参数user_id无效', user_id)
			res.send({
				status: 0,
				type: 'GET_USER_INFO_FAIELD',
				message: '通过session获取用户信息失败',
			})
			return
		}
		try {
			const userinfo = await UserInfoModel.findOne({ user_id }, '-_id -__v');
			res.send(userinfo)
		} catch (err) {
			console.log('通过session获取用户信息失败', err);
			res.send({
				status: 0,
				type: 'GET_USER_INFO_FAIELD',
				message: '通过session获取用户信息失败',
			})
		}
	}
	async getInfoById(req, res, next) {
		const user_id = req.params.user_id;
		if (!user_id || !Number(user_id)) {
			console.log('通过ID获取用户信息失败')
			res.send({
				status: 0,
				type: 'GET_USER_INFO_FAIELD',
				message: '通过用户ID获取用户信息失败',
			})
			return
		}
		try {
			const userinfo = await UserInfoModel.findOne({ user_id }, '-_id -__v');
			res.send(userinfo)
		} catch (err) {
			console.log('通过用户ID获取用户信息失败', err);
			res.send({
				status: 0,
				type: 'GET_USER_INFO_FAIELD',
				message: '通过用户ID获取用户信息失败',
			})
		}
	}
	async signout(req, res, next) {
		delete req.session.user_id;
		res.send({
			status: 1,
			message: '退出成功'
		})
	}
	async changePassword(req, res, next) {
		const cap = req.cookies.cap;
		if (!cap) {
			console.log('验证码失效')
			res.send({
				status: 0,
				type: 'ERROR_CAPTCHA',
				message: '验证码失效',
			})
			return
		}
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			const { username, oldpassword, newpassword, confirmpassword, captcha_code } = fields;
			try {
				if (!username) {
					throw new Error('用户名参数错误');
				} else if (!oldpassword) {
					throw new Error('必须添加旧密码');
				} else if (!newpassword) {
					throw new Error('必须填写新密码');
				} else if (!confirmpassword) {
					throw new Error('必须填写确认密码');
				} else if (newpassword !== confirmpassword) {
					throw new Error('两次密码不一致');
				} else if (!captcha_code) {
					throw new Error('请填写验证码');
				}
			} catch (err) {
				console.log('修改密码参数错误', err);
				res.send({
					status: 0,
					type: 'ERROR_QUERY',
					message: err.message,
				})
				return
			}
			if (cap.toString() !== captcha_code.toString()) {
				res.send({
					status: 0,
					type: 'ERROR_CAPTCHA',
					message: '验证码不正确',
				})
				return
			}
			const md5password = this.encryption(oldpassword);
			try {
				const user = await UserModel.findOne({ username });
				if (!user) {
					res.send({
						status: 0,
						type: 'USER_NOT_FOUND',
						message: '未找到当前用户',
					})
				} else if (user.password.toString() !== md5password.toString()) {
					res.send({
						status: 0,
						type: 'ERROR_PASSWORD',
						message: '密码不正确',
					})
				} else {
					user.password = this.encryption(newpassword);
					user.save();
					res.send({
						status: 1,
						success: '密码修改成功',
					})
				}
			} catch (err) {
				console.log('修改密码失败', err);
				res.send({
					status: 0,
					type: 'ERROR_CHANGE_PASSWORD',
					message: '修改密码失败',
				})
			}
		})
	}
	async updateAvatar(req, res, next) {
		const sid = req.session.user_id;
		const pid = req.params.user_id;
		const user_id = sid || pid;
		if (!user_id || !Number(user_id)) {
			console.log('更新头像，user_id错误', user_id)
			res.send({
				status: 0,
				type: 'ERROR_USERID',
				message: 'user_id参数错误',
			})
			return
		}

		try {
			const image_path = await this.getPath(req);
			await UserInfoModel.findOneAndUpdate({ user_id }, { $set: { avatar: image_path } });
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
	
	async getUserList(req, res, next) {
		const { limit = 20, offset = 0 } = req.query;
		try {
			const users = await UserInfoModel.find({}, '-_id').sort({ user_id: -1 }).limit(Number(limit)).skip(Number(offset));
			res.send(users);
		} catch (err) {
			console.log('获取用户列表数据失败', err);
			res.send({
				status: 0,
				type: 'GET_DATA_ERROR',
				message: '获取用户列表数据失败'
			})
		}
	}
	async getUserCount(req, res, next) {
		try {
			const count = await UserInfoModel.count();
			res.send({
				status: 1,
				count,
			})
		} catch (err) {
			console.log('获取用户数量失败', err);
			res.send({
				status: 0,
				type: 'ERROR_TO_GET_USER_COUNT',
				message: '获取用户数量失败'
			})
		}
	}
	async getUserCity(req, res, next) {
		const cityArr = ['北京', '上海', '深圳', '杭州'];
		const filterArr = [];
		cityArr.forEach(item => {
			filterArr.push(UserInfoModel.find({ city: item }).count())
		})
		filterArr.push(UserInfoModel.$where('!"北京上海深圳杭州".includes(this.city)').count())
		//Promise.all可以将多个Promise实例包装成一个新的Promise实例
		Promise.all(filterArr).then(result => {
			res.send({
				status: 1,
				user_city: {
					beijing: result[0],
					shanghai: result[1],
					shenzhen: result[2],
					hangzhou: result[3],
					qita: result[4],
				}
			})
		}).catch(err => {
			console.log('获取用户分布城市数据失败', err);
			res.send({
				status: 0,
				type: 'ERROR_GET_USER_CITY',
				message: '获取用户分布城市数据失败'
			})
		})
	}
}

export default new User()